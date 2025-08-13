from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json
import time
import threading
from datetime import datetime
import sqlite3
import hashlib
import secrets
import logging
from werkzeug.utils import secure_filename
import numpy as np
import cv2
from PIL import Image
import io
import base64

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Database setup
def init_database():
    conn = sqlite3.connect('rudnex_video_generator.db')
        cursor = conn.cursor()
    
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS generations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            generation_type TEXT NOT NULL,
            prompt TEXT,
            settings TEXT,
            input_file TEXT,
            output_file TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            completed_at TIMESTAMP,
            processing_time REAL,
            error_message TEXT
            )
        ''')
    
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP
            )
        ''')
    
        conn.commit()
        conn.close()

# Initialize database
init_database()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class VideoGenerator:
    def __init__(self):
        self.generations = {}
    
    def generate_text_to_video(self, prompt, settings):
        """Generate video from text prompt"""
        try:
            # Simulate video generation process
            duration = settings.get('duration', 3.0)
            fps = settings.get('fps', 30)
            resolution = settings.get('resolution', '512x512')
            format_type = settings.get('format', 'Square')
            platform = settings.get('platform', 'general')
            
            # Parse resolution
            width, height = map(int, resolution.split('x'))
            
            # Create frames (simulated)
            num_frames = int(duration * fps)
            frames = []
            
            for i in range(num_frames):
                # Create a frame with the prompt text
                frame = self._create_text_frame(prompt, width, height, i / num_frames, format_type, platform)
                frames.append(frame)
            
            # Save video
            output_filename = f"text_video_{int(time.time())}.mp4"
            output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
            
            self._save_video(frames, fps, output_path)
            
            return {
                'success': True,
                'output_file': output_filename,
                'frames': len(frames),
                'duration': duration,
                'fps': fps,
                'resolution': resolution
            }
            
        except Exception as e:
            logger.error(f"Error in text to video generation: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def generate_image_to_video(self, image_path, prompt, settings):
        """Generate video from image"""
        try:
            # Load image
            image = Image.open(image_path).convert('RGB')
            
            # Get settings
            duration = settings.get('duration', 3.0)
            fps = settings.get('fps', 30)
            resolution = settings.get('resolution', '512x512')
            motion_type = settings.get('motionType', 'Subtle')
            motion_direction = settings.get('motionDirection', 'Auto')
            
            # Parse resolution
            width, height = map(int, resolution.split('x'))
            
            # Resize image
            image = image.resize((width, height), Image.Resampling.LANCZOS)
            
            # Create frames with motion
            num_frames = int(duration * fps)
            frames = []
            
            for i in range(num_frames):
                frame = self._create_motion_frame(image, i / num_frames, motion_type, motion_direction)
                frames.append(frame)
            
            # Save video
            output_filename = f"image_video_{int(time.time())}.mp4"
            output_path = os.path.join(app.config['OUTPUT_FOLDER'], output_filename)
            
            self._save_video(frames, fps, output_path)
            
        return {
                'success': True,
                'output_file': output_filename,
                'frames': len(frames),
                'duration': duration,
                'fps': fps,
                'resolution': resolution
            }
            
        except Exception as e:
            logger.error(f"Error in image to video generation: {e}")
        return {
                'success': False,
                'error': str(e)
            }
    
    def _create_text_frame(self, prompt, width, height, progress, format_type, platform):
        """Create a frame with text and effects"""
        # Create a colorful background
        frame = np.zeros((height, width, 3), dtype=np.uint8)
        
        # Apply format-specific background
        if format_type == 'Vertical':
            # Vertical gradient for mobile
            for y in range(height):
                ratio = y / height
                color = [
                    int(255 * (0.2 + 0.8 * ratio)),
                    int(255 * (0.1 + 0.9 * (1 - ratio))),
                    int(255 * (0.3 + 0.7 * ratio))
                ]
                frame[y, :] = color
        elif format_type == 'Horizontal':
            # Horizontal gradient for desktop
            for x in range(width):
                ratio = x / width
                color = [
                    int(255 * (0.1 + 0.9 * ratio)),
                    int(255 * (0.2 + 0.8 * (1 - ratio))),
                    int(255 * (0.3 + 0.7 * ratio))
                ]
                frame[:, x] = color
        else:
            # Square format - radial gradient
            center_x, center_y = width // 2, height // 2
            for y in range(height):
                for x in range(width):
                    distance = np.sqrt((x - center_x)**2 + (y - center_y)**2)
                    max_distance = np.sqrt(center_x**2 + center_y**2)
                    ratio = distance / max_distance
                    color = [
                        int(255 * (0.2 + 0.8 * (1 - ratio))),
                        int(255 * (0.1 + 0.9 * ratio)),
                        int(255 * (0.3 + 0.7 * (1 - ratio)))
                    ]
                    frame[y, x] = color
        
        # Add animated elements based on progress
        # Add a moving circle
        circle_x = int(width * progress)
        circle_y = height // 2
        cv2.circle(frame, (circle_x, circle_y), 30, (255, 255, 255), -1)
        
        # Add text (simplified - in production use proper text rendering)
        text_y = height // 3
        # Draw a simple text representation
        cv2.rectangle(frame, (50, text_y - 20), (width - 50, text_y + 20), (255, 255, 255), 2)
        
        # Add platform-specific effects
        if 'Instagram' in platform:
            # Add vignette effect
            frame = self._apply_vignette(frame)
        elif 'TikTok' in platform:
            # Add high contrast
            frame = cv2.convertScaleAbs(frame, alpha=1.2, beta=10)
        
        return frame
    
    def _create_motion_frame(self, image, progress, motion_type, motion_direction):
        """Create a frame with motion effects"""
        # Convert PIL image to numpy array
        frame = np.array(image)
        
        # Apply motion effects
        if motion_type == 'Subtle':
            intensity = 0.1
        elif motion_type == 'Moderate':
            intensity = 0.2
        else:  # Dynamic
            intensity = 0.4
        
        # Apply motion based on direction
        if motion_direction == 'Auto':
            # Ken Burns effect
            scale = 1.0 + intensity * np.sin(progress * 2 * np.pi)
            center_x, center_y = frame.shape[1] // 2, frame.shape[0] // 2
            
            # Create transformation matrix
            M = cv2.getRotationMatrix2D((center_x, center_y), 0, scale)
            frame = cv2.warpAffine(frame, M, (frame.shape[1], frame.shape[0]))
        
        elif motion_direction == 'Zoom In':
            scale = 1.0 + intensity * progress
            center_x, center_y = frame.shape[1] // 2, frame.shape[0] // 2
            M = cv2.getRotationMatrix2D((center_x, center_y), 0, scale)
            frame = cv2.warpAffine(frame, M, (frame.shape[1], frame.shape[0]))
        
        elif motion_direction == 'Zoom Out':
            scale = 1.0 + intensity * (1 - progress)
            center_x, center_y = frame.shape[1] // 2, frame.shape[0] // 2
            M = cv2.getRotationMatrix2D((center_x, center_y), 0, scale)
            frame = cv2.warpAffine(frame, M, (frame.shape[1], frame.shape[0]))
        
        else:
            # Pan effects
            shift_x = int(intensity * 50 * np.sin(progress * 2 * np.pi))
            shift_y = int(intensity * 50 * np.cos(progress * 2 * np.pi))
            
            M = np.float32([[1, 0, shift_x], [0, 1, shift_y]])
            frame = cv2.warpAffine(frame, M, (frame.shape[1], frame.shape[0]), 
                                 borderMode=cv2.BORDER_REFLECT)
        
        return frame
    
    def _apply_vignette(self, frame):
        """Apply vignette effect"""
        h, w = frame.shape[:2]
        center_x, center_y = w // 2, h // 2
        
        for y in range(h):
            for x in range(w):
                distance = np.sqrt((x - center_x)**2 + (y - center_y)**2)
                max_distance = np.sqrt(center_x**2 + center_y**2)
                vignette = 1 - (distance / max_distance) * 0.3
                
                for c in range(3):
                    frame[y, x, c] = int(frame[y, x, c] * vignette)
        
        return frame
    
    def _save_video(self, frames, fps, output_path):
        """Save frames as video file"""
        if not frames:
            raise ValueError("No frames to save")
        
        height, width = frames[0].shape[:2]
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
        
        for frame in frames:
            # Convert RGB to BGR for OpenCV
            frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
            out.write(frame_bgr)
        
        out.release()

# Initialize video generator
video_generator = VideoGenerator()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Rudnex Video Generator API'
    })

@app.route('/api/generate/text-to-video', methods=['POST'])
def generate_text_video():
    """Generate video from text prompt"""
    try:
        data = request.get_json()
        
        if not data or 'prompt' not in data:
            return jsonify({'error': 'Missing prompt parameter'}), 400
        
        prompt = data['prompt']
        settings = data.get('settings', {})
        
        # Validate settings
        if not prompt.strip():
            return jsonify({'error': 'Prompt cannot be empty'}), 400
        
        # Generate video
        result = video_generator.generate_text_to_video(prompt, settings)
        
        if result['success']:
            # Log generation
            log_generation('text', prompt, settings, result['output_file'])
            
            return jsonify({
                'success': True,
                'message': 'Video generated successfully',
                'output_file': result['output_file'],
                'details': result
            })
        else:
            return jsonify({
                'success': False,
                'error': result['error']
            }), 500
            
    except Exception as e:
        logger.error(f"Error in text to video endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/generate/image-to-video', methods=['POST'])
def generate_image_video():
    """Generate video from uploaded image"""
    try:
        # Check if image file is present
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Get form data
        prompt = request.form.get('prompt', '')
        settings = json.loads(request.form.get('settings', '{}'))
        
        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = int(time.time())
        saved_filename = f"input_{timestamp}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], saved_filename)
        file.save(file_path)
        
        # Generate video
        result = video_generator.generate_image_to_video(file_path, prompt, settings)
        
        if result['success']:
            # Log generation
            log_generation('image', prompt, settings, result['output_file'], saved_filename)
            
        return jsonify({
                'success': True,
                'message': 'Video generated successfully',
                'output_file': result['output_file'],
                'details': result
            })
        else:
            return jsonify({
                'success': False,
                'error': result['error']
            }), 500
            
    except Exception as e:
        logger.error(f"Error in image to video endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/download/<filename>', methods=['GET'])
def download_video(filename):
    """Download generated video file"""
    try:
        file_path = os.path.join(app.config['OUTPUT_FOLDER'], filename)
        
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        
        return send_file(file_path, as_attachment=True)
        
    except Exception as e:
        logger.error(f"Error downloading file: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/history', methods=['GET'])
def get_generation_history():
    """Get generation history"""
    try:
        conn = sqlite3.connect('rudnex_video_generator.db')
    cursor = conn.cursor()
        
    cursor.execute('''
            SELECT id, generation_type, prompt, settings, output_file, status, 
                   created_at, completed_at, processing_time
            FROM generations
            ORDER BY created_at DESC
            LIMIT 50
        ''')
        
        rows = cursor.fetchall()
    conn.close()
        
        history = []
        for row in rows:
            history.append({
                'id': row[0],
                'type': row[1],
                'prompt': row[2],
                'settings': json.loads(row[3]) if row[3] else {},
                'output_file': row[4],
                'status': row[5],
                'created_at': row[6],
                'completed_at': row[7],
                'processing_time': row[8]
            })
        
        return jsonify({'history': history})
        
    except Exception as e:
        logger.error(f"Error getting history: {e}")
        return jsonify({'error': 'Internal server error'}), 500

def log_generation(gen_type, prompt, settings, output_file, input_file=None):
    """Log generation to database"""
    try:
        conn = sqlite3.connect('rudnex_video_generator.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO generations 
            (generation_type, prompt, settings, input_file, output_file, status, completed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            gen_type,
            prompt,
            json.dumps(settings),
            input_file,
            output_file,
            'completed',
            datetime.now().isoformat()
        ))
        
        conn.commit()
        conn.close()
        
    except Exception as e:
        logger.error(f"Error logging generation: {e}")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
