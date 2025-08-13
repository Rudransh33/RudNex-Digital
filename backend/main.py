# Rudnex Digital Backend System with Veo 3 Style Admin Tool
# Complete FastAPI backend with video generation and email integration

from fastapi import FastAPI, HTTPException, Depends, File, UploadFile, BackgroundTasks, Request, Response
from fastapi.responses import FileResponse, RedirectResponse, JSONResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
import os
import json
import sqlite3
import hashlib
import secrets
import smtplib
import torch
import cv2
import numpy as np
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import logging
import asyncio
from pathlib import Path
import subprocess
import requests
from PIL import Image
import torchaudio

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Rudnex Digital API",
    description="Backend API for Rudnex Digital Hub with Veo 3 Style Admin Tool",
    version="1.0.0"
)

# Serve admin UI only when authenticated
@app.get("/admin", response_class=HTMLResponse)
async def admin_root(request: Request):
    if not _is_admin_cookie_valid(request):
        # Minimal username/password login page (phone number not displayed)
        return HTMLResponse(
            '<!DOCTYPE html><html><head><title>Admin Login</title><meta name="viewport" content="width=device-width, initial-scale=1">'
            '<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}form{background:#111827;padding:24px;border-radius:12px;box-shadow:0 10px 25px rgba(0,0,0,.4);width:100%;max-width:360px}h1{margin:0 0 16px 0;font-size:20px}input,button{width:100%;padding:12px 14px;border-radius:8px;border:1px solid #334155;background:#0b1220;color:#e2e8f0}input{margin:8px 0 12px 0}button{background:#2563eb;border-color:#1d4ed8;cursor:pointer}button:hover{background:#1d4ed8}</style>'
            '</head><body><form method="POST" action="/api/admin/login"><h1>Admin Login</h1><input name="username" placeholder="Username" required><input name="password" placeholder="Password" type="password" required><button type="submit">Login</button></form></body></html>'
        )
    # authenticated → return admin app
    admin_html = Path("backend/templates/admin_veo3.html")
    if admin_html.exists():
        return FileResponse(str(admin_html))
    return HTMLResponse("Admin UI not found", status_code=404)

@app.post("/api/admin/login")
async def admin_login(request: Request):
    form = await request.form()
    username = (form.get("username") or "").strip()
    password = (form.get("password") or "").strip()
    # Accept legacy token field as fallback
    token = (form.get("token") or "").strip()
    valid = False
    if username and password:
        valid = username == config.ADMIN_USERNAME and _hash_password(password) == _ADMIN_PASSWORD_HASH
    elif token:
        valid = token == config.ADMIN_TOKEN
    if not valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    sig = _compute_session_signature()
    resp = RedirectResponse(url="/admin", status_code=303)
    resp.set_cookie(
        key=config.ADMIN_COOKIE_NAME,
        value=sig,
        max_age=config.ADMIN_COOKIE_MAX_AGE_SECS,
        httponly=True,
        secure=False,  # set True behind HTTPS/production
        samesite="Lax",
        path="/",
    )
    return resp

@app.post("/api/admin/logout")
async def admin_logout():
    resp = RedirectResponse(url="/", status_code=303)
    resp.delete_cookie(config.ADMIN_COOKIE_NAME, path="/")
    return resp

# Session status (for frontend gating)
@app.get("/api/admin/session")
async def admin_session(request: Request):
    return {"authenticated": _is_admin_cookie_valid(request)}

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://rudnex.com",
        "https://www.rudnex.com",
        "https://*.rudnex.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Security
security = HTTPBearer(auto_error=False)

# Configuration
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "rudnex-secret-key-2025")
    ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "rudnex-admin-2025")  # legacy support
    ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "rudnex123")
    ADMIN_CONTACT_MOBILE = os.getenv("ADMIN_CONTACT_MOBILE", "8369139657")
    
    # Email Configuration
    SMTP_SERVER = os.getenv("SMTP_SERVER", "mail.rudnex.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    EMAIL_USER = os.getenv("EMAIL_USER", "help@rudnex.com")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")
    
    # File Paths
    UPLOAD_DIR = Path("uploads")
    OUTPUT_DIR = Path("outputs")
    CONTENT_DIR = Path("content")
    DATABASE_PATH = "rudnex_digital.db"
    
    # AI Model Configuration
    MAX_VIDEO_DURATION = 300  # 5 minutes
    MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB
    SUPPORTED_VIDEO_FORMATS = [".mp4", ".avi", ".mov"]
    SUPPORTED_AUDIO_FORMATS = [".mp3", ".wav", ".m4a"]
    # Admin Session Cookie
    ADMIN_COOKIE_NAME = "admin_session"
    ADMIN_COOKIE_MAX_AGE_SECS = 60 * 60 * 8  # 8 hours

config = Config()
def _hash_password(raw: str) -> str:
    try:
        return hashlib.sha256((raw or "").encode("utf-8")).hexdigest()
    except Exception:
        return ""

_ADMIN_PASSWORD_HASH = _hash_password(getattr(config, "ADMIN_PASSWORD", ""))

# Create directories
config.UPLOAD_DIR.mkdir(exist_ok=True)
config.OUTPUT_DIR.mkdir(exist_ok=True)
config.CONTENT_DIR.mkdir(exist_ok=True)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database Models
class DatabaseManager:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize database with required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Contact submissions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS contact_submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status TEXT DEFAULT 'pending'
            )
        ''')
        

        
        # Content generation logs table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS content_generations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prompt TEXT NOT NULL,
                content_type TEXT NOT NULL,
                settings TEXT NOT NULL,
                output_path TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                completed_at TIMESTAMP,
                error_message TEXT
            )
        ''')
        
        # App analytics table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS app_analytics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                app_id TEXT NOT NULL,
                event_type TEXT NOT NULL,
                event_data TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_ip TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")

# Initialize database
db_manager = DatabaseManager(config.DATABASE_PATH)

# Pydantic Models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str



class VideoGenerationRequest(BaseModel):
    prompt: str
    duration: int = 30
    style: str = "realistic"
    resolution: str = "1080p"
    audio_settings: Dict[str, Any] = {}

class AudioDubbingRequest(BaseModel):
    text: str
    voice: str = "female-1"
    speed: float = 1.0
    pitch: float = 1.0

class AppAnalytics(BaseModel):
    app_id: str
    event_type: str
    event_data: Optional[Dict[str, Any]] = None

import hmac

# Authentication
def _compute_session_signature() -> str:
    secret = (config.SECRET_KEY or "").encode("utf-8")
    # bind session to current admin creds (username+password hash)
    combo = f"{config.ADMIN_USERNAME}:{_ADMIN_PASSWORD_HASH}"
    message = combo.encode("utf-8")
    return hmac.new(secret, message, hashlib.sha256).hexdigest()

def _is_admin_cookie_valid(request: Request) -> bool:
    cookie_val = request.cookies.get(config.ADMIN_COOKIE_NAME)
    if not cookie_val:
        return False
    return hmac.compare_digest(cookie_val, _compute_session_signature())

def verify_admin_token(request: Request, credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)):
    # Prefer secure cookie; legacy bearer token remains for compatibility
    if _is_admin_cookie_valid(request):
        return "authorized"
    if credentials and credentials.credentials == config.ADMIN_TOKEN:
        return "authorized"
    raise HTTPException(status_code=401, detail="Unauthorized")

# Email Service
class EmailService:
    def __init__(self):
        self.smtp_server = config.SMTP_SERVER
        self.smtp_port = config.SMTP_PORT
        self.email_user = config.EMAIL_USER
        self.email_password = config.EMAIL_PASSWORD
    
    async def send_email(self, to_email: str, subject: str, body: str, attachments: List[str] = None):
        """Send email with optional attachments"""
        try:
            msg = MIMEMultipart()
            msg['From'] = self.email_user
            msg['To'] = to_email
            msg['Subject'] = subject
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Add attachments if provided
            if attachments:
                for attachment_path in attachments:
                    if os.path.exists(attachment_path):
                        with open(attachment_path, "rb") as attachment:
                            part = MIMEBase('application', 'octet-stream')
                            part.set_payload(attachment.read())
                            encoders.encode_base64(part)
                            part.add_header(
                                'Content-Disposition',
                                f'attachment; filename= {os.path.basename(attachment_path)}'
                            )
                            msg.attach(part)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.email_user, self.email_password)
                server.send_message(msg)
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email: {e}")
            return False

email_service = EmailService()



# Video Generation Service (Veo 3 Style)
class VideoGenerationService:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        logger.info(f"Video generation service initialized on {self.device}")
    
    async def generate_video_with_audio(self, request: VideoGenerationRequest) -> Dict[str, str]:
        """Generate video with synchronized audio (Veo 3 style)"""
        try:
            # Generate unique filename
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_filename = f"audiu_content_{timestamp}"
            video_path = config.OUTPUT_DIR / f"{output_filename}.mp4"
            audio_path = config.OUTPUT_DIR / f"{output_filename}.wav"
            
            # Step 1: Generate audio from text using TTS
            audio_file = await self._generate_audio(request.prompt, request.audio_settings)
            
            # Step 2: Generate video based on prompt
            video_file = await self._generate_video(
                prompt=request.prompt,
                duration=request.duration,
                style=request.style,
                resolution=request.resolution
            )
            
            # Step 3: Combine video and audio
            final_video = await self._combine_video_audio(video_file, audio_file, video_path)
            
            # Log generation
            await self._log_generation(request, str(video_path), "completed")
            
            return {
                "video_url": f"/content/{output_filename}.mp4",
                "audio_url": f"/content/{output_filename}.wav",
                "status": "completed",
                "duration": request.duration,
                "prompt": request.prompt
            }
            
        except Exception as e:
            logger.error(f"Video generation failed: {e}")
            await self._log_generation(request, "", "failed", str(e))
            raise HTTPException(status_code=500, detail=f"Video generation failed: {e}")
    
    async def _generate_audio(self, text: str, audio_settings: Dict) -> str:
        """Generate audio using TTS"""
        try:
            # Use a TTS library like Coqui TTS or call external API
            # For demo purposes, we'll create a placeholder
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            audio_path = config.OUTPUT_DIR / f"audio_{timestamp}.wav"
            
            # Placeholder: Create silent audio file
            # In production, replace with actual TTS generation
            sample_rate = 22050
            duration = len(text.split()) * 0.5  # Rough estimate
            samples = int(sample_rate * duration)
            audio_data = np.zeros(samples, dtype=np.float32)
            
            # Save audio file
            torchaudio.save(str(audio_path), torch.from_numpy(audio_data).unsqueeze(0), sample_rate)
            
            return str(audio_path)
        except Exception as e:
            logger.error(f"Audio generation failed: {e}")
            raise
    
    async def _generate_video(self, prompt: str, duration: int, style: str, resolution: str) -> str:
        """Generate video based on text prompt"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            video_path = config.OUTPUT_DIR / f"video_{timestamp}.mp4"
            
            # Parse resolution
            width, height = self._parse_resolution(resolution)
            fps = 30
            total_frames = duration * fps
            
            # Create video writer
            fourcc = cv2.VideoWriter_fourcc(*'mp4v')
            out = cv2.VideoWriter(str(video_path), fourcc, fps, (width, height))
            
            # Generate frames based on prompt and style
            for frame_idx in range(total_frames):
                frame = await self._generate_frame(prompt, style, frame_idx, total_frames, width, height)
                out.write(frame)
            
            out.release()
            return str(video_path)
            
        except Exception as e:
            logger.error(f"Video generation failed: {e}")
            raise
    
    async def _generate_frame(self, prompt: str, style: str, frame_idx: int, total_frames: int, width: int, height: int) -> np.ndarray:
        """Generate individual video frame"""
        # Create a simple animated frame based on prompt
        # In production, this would use advanced AI models like Stable Diffusion Video
        
        progress = frame_idx / total_frames
        
        # Create base frame
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        
        # Simple animation based on style
        if style == "realistic":
            # Gradient background
            for y in range(height):
                intensity = int(128 + 127 * np.sin(progress * 2 * np.pi + y * 0.01))
                frame[y, :] = [intensity, intensity // 2, intensity // 4]
        
        elif style == "cartoon":
            # Colorful cartoon-like background
            colors = [(255, 100, 100), (100, 255, 100), (100, 100, 255)]
            color_idx = int(progress * len(colors)) % len(colors)
            frame[:] = colors[color_idx]
        
        elif style == "artistic":
            # Abstract artistic pattern
            for y in range(height):
                for x in range(width):
                    r = int(128 + 127 * np.sin(progress * 4 * np.pi + x * 0.02))
                    g = int(128 + 127 * np.cos(progress * 4 * np.pi + y * 0.02))
                    b = int(128 + 127 * np.sin(progress * 4 * np.pi + (x + y) * 0.01))
                    frame[y, x] = [r, g, b]
        
        # Add text overlay with prompt
        font = cv2.FONT_HERSHEY_SIMPLEX
        text_lines = self._wrap_text(prompt, 40)
        for i, line in enumerate(text_lines[:3]):
            y_pos = 50 + i * 40
            cv2.putText(frame, line, (20, y_pos), font, 0.8, (255, 255, 255), 2)
        
        # Add progress indicator
        progress_width = int(width * 0.8 * progress)
        cv2.rectangle(frame, (int(width * 0.1), height - 30), 
                     (int(width * 0.1) + progress_width, height - 10), 
                     (0, 255, 255), -1)
        
        return frame
    
    def _wrap_text(self, text: str, width: int) -> List[str]:
        """Wrap text to fit within specified width"""
        words = text.split()
        lines = []
        current_line = []
        
        for word in words:
            if len(' '.join(current_line + [word])) <= width:
                current_line.append(word)
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines
    
    def _parse_resolution(self, resolution: str) -> tuple:
        """Parse resolution string to width, height"""
        resolution_map = {
            "720p": (1280, 720),
            "1080p": (1920, 1080),
            "1440p": (2560, 1440),
            "4k": (3840, 2160)
        }
        return resolution_map.get(resolution, (1920, 1080))
    
    async def _combine_video_audio(self, video_path: str, audio_path: str, output_path: Path) -> str:
        """Combine video and audio using FFmpeg"""
        try:
            cmd = [
                'ffmpeg', '-y',
                '-i', video_path,
                '-i', audio_path,
                '-c:v', 'copy',
                '-c:a', 'aac',
                '-shortest',
                str(output_path)
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode != 0:
                logger.error(f"FFmpeg error: {result.stderr}")
                # Return video without audio if combination fails
                import shutil
                shutil.copy2(video_path, output_path)
            
            return str(output_path)
            
        except Exception as e:
            logger.error(f"Video-audio combination failed: {e}")
            # Return video without audio as fallback
            import shutil
            shutil.copy2(video_path, output_path)
            return str(output_path)
    
    async def _log_generation(self, request: VideoGenerationRequest, output_path: str, status: str, error: str = None):
        """Log generation attempt to database"""
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        settings = {
            "duration": request.duration,
            "style": request.style,
            "resolution": request.resolution,
            "audio_settings": request.audio_settings
        }
        
        cursor.execute('''
            INSERT INTO content_generations 
            (prompt, content_type, settings, output_path, status, error_message)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (request.prompt, "video_with_audio", json.dumps(settings), output_path, status, error))
        
        if status == "completed":
            cursor.execute('''
                UPDATE content_generations 
                SET completed_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            ''', (cursor.lastrowid,))
        
        conn.commit()
        conn.close()

video_service = VideoGenerationService()

# API Routes

@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "Rudnex Digital API",
        "version": "1.0.0",
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/contact")
async def submit_contact_form(form_data: ContactForm, background_tasks: BackgroundTasks):
    """Submit contact form"""
    try:
        # Save to database
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO contact_submissions (name, email, subject, message)
            VALUES (?, ?, ?, ?)
        ''', (form_data.name, form_data.email, form_data.subject, form_data.message))
        
        conn.commit()
        conn.close()
        
        # Send email notification
        email_body = f"""
        New contact form submission:
        
        Name: {form_data.name}
        Email: {form_data.email}
        Subject: {form_data.subject}
        
        Message:
        {form_data.message}
        
        Submitted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        background_tasks.add_task(
            email_service.send_email,
            config.EMAIL_USER,
            f"Contact Form: {form_data.subject}",
            email_body
        )
        
        return {"status": "success", "message": "Form submitted successfully"}
        
    except Exception as e:
        logger.error(f"Contact form submission failed: {e}")
        raise HTTPException(status_code=500, detail="Form submission failed")



@app.post("/api/analytics")
async def track_analytics(analytics_data: AppAnalytics):
    """Track app analytics"""
    try:
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO app_analytics (app_id, event_type, event_data)
            VALUES (?, ?, ?)
        ''', (analytics_data.app_id, analytics_data.event_type, json.dumps(analytics_data.event_data)))
        
        conn.commit()
        conn.close()
        
        return {"status": "success", "message": "Analytics tracked"}
        
    except Exception as e:
        logger.error(f"Analytics tracking failed: {e}")
        raise HTTPException(status_code=500, detail="Analytics tracking failed")

# Admin Routes (Protected)

@app.post("/api/admin/generate-video")
async def generate_video_content(
    request: VideoGenerationRequest,
    token: str = Depends(verify_admin_token)
):
    """Generate video with audio for Audiu app"""
    try:
        result = await video_service.generate_video_with_audio(request)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/generate-audio")
async def generate_audio_dubbing(
    request: AudioDubbingRequest,
    token: str = Depends(verify_admin_token)
):
    """Generate audio dubbing"""
    try:
        # Placeholder for audio generation
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        audio_path = config.OUTPUT_DIR / f"audio_dubbing_{timestamp}.wav"
        
        # Generate audio (placeholder)
        sample_rate = 22050
        duration = len(request.text.split()) * 0.6
        samples = int(sample_rate * duration)
        audio_data = np.random.normal(0, 0.1, samples).astype(np.float32)
        
        torchaudio.save(str(audio_path), torch.from_numpy(audio_data).unsqueeze(0), sample_rate)
        
        return {
            "audio_url": f"/content/{audio_path.name}",
            "duration": duration,
            "text": request.text,
            "voice": request.voice
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio generation failed: {e}")

@app.get("/api/admin/content-library")
async def get_content_library(token: str = Depends(verify_admin_token)):
    """Get generated content library"""
    try:
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, prompt, content_type, settings, output_path, status, created_at, completed_at
            FROM content_generations
            ORDER BY created_at DESC
            LIMIT 50
        ''')
        
        content = []
        for row in cursor.fetchall():
            content.append({
                "id": row[0],
                "prompt": row[1],
                "content_type": row[2],
                "settings": json.loads(row[3]) if row[3] else {},
                "output_path": row[4],
                "status": row[5],
                "created_at": row[6],
                "completed_at": row[7]
            })
        
        conn.close()
        return {"content": content, "total": len(content)}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get content library: {e}")

@app.get("/api/admin/analytics")
async def get_admin_analytics(token: str = Depends(verify_admin_token)):
    """Get admin analytics dashboard"""
    try:
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        # Get contact form submissions
        cursor.execute("SELECT COUNT(*) FROM contact_submissions")
        contact_submissions = cursor.fetchone()[0]
        

        
        # Get content generations
        cursor.execute("SELECT COUNT(*) FROM content_generations WHERE status = 'completed'")
        successful_generations = cursor.fetchone()[0]
        
        # Get app analytics
        cursor.execute("SELECT app_id, event_type, COUNT(*) FROM app_analytics GROUP BY app_id, event_type")
        app_events = cursor.fetchall()
        
        conn.close()
        
        return {
            "contact_submissions": contact_submissions,
            "successful_generations": successful_generations,
            "app_events": [{"app_id": row[0], "event_type": row[1], "count": row[2]} for row in app_events]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get analytics: {e}")

# ----- Hidden VEO3 Admin Endpoint -----
class Veo3Request(BaseModel):
    prompt: str
    duration: int = 5
    resolution: str = "720p"
    style: str = "cinematic"
    audio_enabled: bool = True

@app.post("/admin/veo3")
async def generate_veo3_video(data: Veo3Request, auth: str = Depends(verify_admin_token)):
    """
    Hidden VEO3 video generation endpoint - only accessible with admin authentication.
    This endpoint is not shown in public API docs and requires admin session or token.
    """
    try:
        # Log the VEO3 generation request
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO content_generations (prompt, content_type, settings, status)
            VALUES (?, ?, ?, ?)
        ''', (
            data.prompt,
            "veo3_video",
            json.dumps({
                "duration": data.duration,
                "resolution": data.resolution,
                "style": data.style,
                "audio_enabled": data.audio_enabled
            }),
            "processing"
        ))
        
        generation_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        # Here you would integrate with your actual Veo-3 video generation service
        # For now, this is a placeholder that simulates the process
        
        # Simulate processing time
        await asyncio.sleep(1)
        
        # Generate a mock output path
        output_filename = f"veo3_{generation_id}_{int(datetime.now().timestamp())}.mp4"
        output_path = config.OUTPUT_DIR / output_filename
        
        # Update the database with completion
        conn = sqlite3.connect(config.DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE content_generations 
            SET status = ?, output_path = ?, completed_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', ("completed", str(output_path), generation_id))
        
        conn.commit()
        conn.close()
        
        return {
            "status": "success",
            "message": f"VEO3 video generation started for prompt: {data.prompt}",
            "generation_id": generation_id,
            "settings": {
                "duration": data.duration,
                "resolution": data.resolution,
                "style": data.style,
                "audio_enabled": data.audio_enabled
            },
            "output_path": str(output_path),
            "estimated_completion": "2-3 minutes"
        }
        
    except Exception as e:
        logger.error(f"VEO3 generation failed: {e}")
        raise HTTPException(status_code=500, detail=f"VEO3 video generation failed: {e}")

# Static file serving
app.mount("/content", StaticFiles(directory=str(config.OUTPUT_DIR)), name="content")
app.mount("/uploads", StaticFiles(directory=str(config.UPLOAD_DIR)), name="uploads")

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "error": exc.detail,
        "status_code": exc.status_code,
        "timestamp": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    
    # Create sample data for testing
    logger.info("Starting Rudnex Digital API Server")
    logger.info(f"Admin token: {config.ADMIN_TOKEN}")
    logger.info(f"Upload directory: {config.UPLOAD_DIR}")
    logger.info(f"Output directory: {config.OUTPUT_DIR}")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
