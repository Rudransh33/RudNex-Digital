@echo off
echo 🎬 Rudnex Digital Hub - React Frontend
echo =====================================
echo.
echo Starting React development server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js 16 or higher from https://nodejs.org
    pause
    exit /b 1
)

REM Check if we're in the frontend directory
if not exist "package.json" (
    echo ❌ package.json not found!
    echo Please run this script from the frontend directory.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
)

echo.
echo 🌐 Starting React development server...
echo 🌐 Frontend: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the React development server
npm run dev

pause
