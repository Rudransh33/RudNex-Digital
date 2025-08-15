
@echo off
echo 🎬 Rudnex Video Generator
echo ========================
echo.
echo Starting Rudnex Video Generator...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8 or higher from https://python.org
    pause
    exit /b 1
)

REM Check if index.html exists
if not exist "index.html" (
    echo ❌ index.html not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

REM Create necessary directories
if not exist "backend\uploads" mkdir "backend\uploads"
if not exist "backend\outputs" mkdir "backend\outputs"

echo ✅ Starting Rudnex Video Generator...
echo.
echo 🌐 Frontend: http://localhost:8000
echo 🔧 Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop the servers
echo.

REM Start the Python script
python start.py

pause
