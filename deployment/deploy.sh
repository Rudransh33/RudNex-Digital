#!/bin/bash

# Rudnex Digital Hub - Deployment Script
# This script helps you deploy the entire system

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Starting Rudnex Digital Hub deployment..."

# Create deployment directory if it doesn't exist
if [ ! -d "deployment" ]; then
    print_error "Deployment directory not found. Please run this script from the project root."
    exit 1
fi

cd deployment

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        print_warning "Please edit .env file with your configuration before continuing."
        print_warning "Press Enter when you're ready to continue..."
        read
    else
        print_error "env.example file not found. Please create .env file manually."
        exit 1
    fi
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p ../backend/uploads
mkdir -p ../backend/outputs
mkdir -p ../backend/content
mkdir -p ssl

# Set proper permissions
chmod 755 ../backend/uploads
chmod 755 ../backend/outputs
chmod 755 ../backend/content

# Check if SSL certificates exist
if [ ! -f "ssl/rudnex.com.crt" ] || [ ! -f "ssl/rudnex.com.key" ]; then
    print_warning "SSL certificates not found. Creating self-signed certificates for development..."
    
    # Create self-signed certificate
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout ssl/rudnex.com.key \
        -out ssl/rudnex.com.crt \
        -subj "/C=IN/ST=State/L=City/O=Organization/CN=rudnex.com"
    
    print_warning "Self-signed certificates created. For production, replace with real certificates."
fi

# Build and start services
print_status "Building and starting services..."
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check if services are running
print_status "Checking service status..."

# Check backend
if curl -f http://localhost:8000/health > /dev/null 2>&1; then
    print_success "Backend is running on http://localhost:8000"
else
    print_error "Backend is not responding. Check logs with: docker-compose logs backend"
fi

# Check frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Frontend is running on http://localhost:3000"
else
    print_error "Frontend is not responding. Check logs with: docker-compose logs frontend"
fi

# Check nginx
if curl -f http://localhost > /dev/null 2>&1; then
    print_success "Nginx is running on http://localhost"
else
    print_error "Nginx is not responding. Check logs with: docker-compose logs nginx"
fi

# Display useful information
echo ""
print_success "Deployment completed!"
echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/docs"
echo "   Admin Panel: http://localhost:8000/admin"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update services: docker-compose pull && docker-compose up -d"
echo ""
echo "🔐 Admin Access:"
echo "   Token: $ADMIN_TOKEN"
echo "   URL: http://localhost:8000/admin"
echo ""
echo "📧 Email Configuration:"
echo "   Make sure to configure your email settings in .env file"
echo ""

# Check if this is a production deployment
if [[ "$FRONTEND_URL" == *"rudnex.com"* ]]; then
    print_warning "This appears to be a production deployment."
    print_warning "Please ensure:"
    print_warning "1. SSL certificates are properly configured"
    print_warning "2. Environment variables are secure"
    print_warning "3. Database backups are set up"
    print_warning "4. Monitoring is configured"
fi

print_success "Rudnex Digital Hub is now running!"
