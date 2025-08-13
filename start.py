#!/usr/bin/env python3
"""
Rudnex Video Generator - Startup Script
This script starts both the backend API server and serves the frontend
"""

import os
import sys
import subprocess
import threading
import time
import webbrowser
from pathlib import Path

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting Rudnex Video Generator Backend...")
    
    # Change to backend directory
    backend_dir = Path("backend")
    if not backend_dir.exists():
        print("❌ Backend directory not found!")
        return False
    
    os.chdir(backend_dir)
    
    # Install requirements if needed
    print("📦 Checking dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                      check=True, capture_output=True)
        print("✅ Dependencies installed")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False
    
    # Start Flask server
    print("🌐 Starting Flask server on http://localhost:5000")
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start backend: {e}")
        return False
    
    return True

def start_frontend():
    """Start a simple HTTP server for the frontend"""
    print("🎨 Starting Rudnex Video Generator Frontend...")
    
    # Go back to root directory
    os.chdir(Path(__file__).parent)
    
    # Start HTTP server
    print("🌐 Starting frontend server on http://localhost:8000")
    try:
        subprocess.run([sys.executable, "-m", "http.server", "8000"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to start frontend: {e}")
        return False
    
    return True

def main():
    """Main startup function"""
    print("🎬 Rudnex Video Generator")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("index.html").exists():
        print("❌ index.html not found! Please run this script from the project root directory.")
        return
    
    # Create necessary directories
    os.makedirs("backend/uploads", exist_ok=True)
    os.makedirs("backend/outputs", exist_ok=True)
    
    # Start backend in a separate thread
    backend_thread = threading.Thread(target=start_backend, daemon=True)
    backend_thread.start()
    
    # Wait a moment for backend to start
    time.sleep(3)
    
    # Open browser
    print("🌐 Opening browser...")
    try:
        webbrowser.open("http://localhost:8000")
    except:
        print("⚠️  Could not open browser automatically. Please visit http://localhost:8000")
    
    # Start frontend (this will block)
    start_frontend()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n👋 Rudnex Video Generator stopped")
    except Exception as e:
        print(f"❌ Error: {e}")
        sys.exit(1)
