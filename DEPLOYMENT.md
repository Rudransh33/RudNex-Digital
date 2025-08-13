# Rudnex Digital Hub - Complete Deployment Guide

## 🚀 Project Overview

A comprehensive app showcase platform with hidden AI video generation tool for Audiu content creation.

### 🏗️ Architecture
- **Frontend**: React.js + TailwindCSS (Vercel/Netlify)
- **Backend**: FastAPI + SQLite (Render/Railway)
- **Admin Tool**: Hidden Veo 3-style generator (`/admin/generator`)

- **Email**: SMTP integration for contact forms

## 📁 Project Structure

```
rudnex-digital-hub/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx

│   │   │   └── AdminTool.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AppsPage.jsx
│   │   │   ├── AppDetailPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── tailwind.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── uploads/
├── deployment/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── vercel.json
└── README.md
```

## 🛠️ Setup Instructions

### 1. Environment Variables

Create `.env` file in backend directory:

```env
# API Configuration
SECRET_KEY=rudnex-secret-key-2025-super-secure
ADMIN_TOKEN=rudnex-admin-2025



# Email Configuration (Required for contact forms)
SMTP_SERVER=mail.rudnex.com
SMTP_PORT=587
EMAIL_USER=help@rudnex.com
EMAIL_PASSWORD=your-gmail-app-password

# Production URLs
FRONTEND_URL=https://rudnex.com
BACKEND_URL=https://api.rudnex.com

# Database (SQLite default, can switch to PostgreSQL for production)
DATABASE_URL=sqlite:///./rudnex_digital.db
```

### 2. Backend Setup (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### Backend Requirements (requirements.txt)
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
python-dotenv==1.0.0
pydantic[email]==2.5.0
torch>=2.0.0
torchaudio>=2.0.0
torchvision>=0.15.0
opencv-python==4.8.1.78
numpy>=1.24.0
Pillow>=10.0.0
transformers>=4.35.0
openai==1.3.0
requests>=2.31.0
```

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

#### Frontend Dependencies (package.json)
```json
{
  "name": "rudnex-digital-hub",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "lucide-react": "^0.292.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.1.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.31",
    "tailwindcss": "^3.3.5",
    "vite": "^4.5.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### TailwindCSS Configuration (tailwind.config.js)
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
```

## 🌐 Deployment Options

### Option 1: Vercel + Render (Recommended)

#### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings:
   ```
   Build Command: npm run build
   Output Directory: dist
   ```
3. Add environment variables in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.render.com
   ```

#### Backend (Render)
1. Create new Web Service on Render
2. Connect GitHub repository
3. Configure service:
   ```
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
4. Add environment variables in Render dashboard

### Option 2: Docker Deployment

#### Dockerfile (Backend)
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - ADMIN_TOKEN=${ADMIN_TOKEN}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD}
    volumes:
      - ./uploads:/app/uploads
      - ./outputs:/app/outputs

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:8000
    depends_on:
      - backend
```

### Option 3: Traditional VPS (Hostinger/DigitalOcean)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python, Node.js, Nginx
sudo apt install python3 python3-pip nodejs npm nginx -y

# Clone repository
git clone https://github.com/your-repo/rudnex-digital-hub.git
cd rudnex-digital-hub

# Setup backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Setup frontend
cd ../frontend
npm install
npm run build

# Configure Nginx
sudo nano /etc/nginx/sites-available/rudnexdigital
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name rudnex.com www.rudnex.com;

    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Admin tool (hidden)
    location /admin/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static files
    location /content/ {
        proxy_pass http://127.0.0.1:8000;
    }
}
```

## 📧 Email Setup

### Option 1: Google Workspace
1. Create business email: support@rudnex.com
2. Enable 2FA and create App Password
3. Use App Password in EMAIL_PASSWORD

### Option 2: Hostinger Email
1. Create email account in Hostinger cPanel
2. Configure SMTP settings:
   ```
   SMTP_SERVER=mail.rudnex.com
   SMTP_PORT=587
   ```

### Option 3: SendGrid (Recommended for production)
```env
SMTP_SERVER=smtp.sendgrid.net
SMTP_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```



## 🔐 Admin Tool Security

### Access Control
- Protected route: `/admin/generator`
- Token authentication: `rudnex-admin-2025`
- Can be changed in environment variables

### Features Available in Admin Tool
1. **Text to Video+Audio Generation**
   - Story prompt input
   - Voice selection (5+ voices)
   - Speed and pitch control
   - Video style options
   - Duration settings (10-300 seconds)

2. **Audio Dubbing**
   - Text-to-speech conversion
   - Multiple voice options
   - Speed and pitch adjustment

3. **Scene Generation**
   - Prompt-based video creation
   - Style customization
   - Resolution options

4. **Content Library**
   - View all generated content
   - Download management
   - Export for Audiu app

### Security Best Practices
```python
# Change default tokens in production
ADMIN_TOKEN=your-super-secure-admin-token-here

# Use HTTPS in production
SECURE_SSL_REDIRECT=True

# Rate limiting (add to FastAPI)
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
```

## 📱 App Data Management

### Adding New Apps
```javascript
// In frontend/src/App.jsx - appsData array
const newApp = {
  id: 'new-app-id',
  name: 'New App Name',
  logo: '/api/placeholder/80/80',
  tagline: 'App tagline',
  description: 'Detailed description',
  features: ['Feature 1', 'Feature 2'],
  screenshots: ['/api/placeholder/300/600'],
  downloadLink: 'https://play.google.com/store/apps/details?id=com.rudnex.newapp',
  category: 'Category',
  rating: 4.5,
  downloads: '1K+',
  // ... other properties
};
```

### Dynamic App Loading
```javascript
// For dynamic loading from API
useEffect(() => {
  fetch('/api/apps')
    .then(res => res.json())
    .then(data => setAppsData(data));
}, []);
```

## 🎨 Customization Guide

### Branding Updates
```css
/* Update colors in TailwindCSS config */
:root {
  --primary-color: #your-brand-color;
  --secondary-color: #your-secondary-color;
}

/* Update gradients */
.gradient-primary {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Logo and Assets
```javascript
// Replace logo in Header component
<div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
  <img src="/your-logo.svg" alt="Your Brand" />
</div>
```

## 🔧 Monitoring & Analytics

### Basic Analytics Integration
```javascript
// Google Analytics 4
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Custom Event Tracking
```javascript
// Track app downloads
const trackDownload = (appId) => {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      app_id: appId,
      event_type: 'download_click',
      event_data: { timestamp: new Date().toISOString() }
    })
  });
};
```

### Server Monitoring
```python
# Add health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "uptime": time.time() - start_time,
        "version": "1.0.0"
    }
```

## 🚀 Performance Optimization

### Frontend Optimization
```javascript
// Code splitting with React.lazy
const AdminTool = React.lazy(() => import('./components/AdminTool'));

// Image optimization
<img 
  src="/images/app-logo.webp" 
  alt="App Logo"
  loading="lazy"
  width="80"
  height="80"
/>
```

### Backend Optimization
```python
# Add caching
from fastapi_cache import FastAPICache
from fastapi_cache.decorator import cache

@cache(expire=3600)  # Cache for 1 hour
@app.get("/api/apps")
async def get_apps():
    return apps_data
```

### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_contact_email ON contact_submissions(email);

CREATE INDEX idx_analytics_app ON app_analytics(app_id, event_type);
```

## 🔄 Backup & Recovery

### Database Backup
```bash
#!/bin/bash
# backup-database.sh
DATE=$(date +%Y%m%d_%H%M%S)
sqlite3 rudnex_digital.db ".backup backup_$DATE.db"
aws s3 cp backup_$DATE.db s3://your-backup-bucket/
```

### Content Backup
```bash
#!/bin/bash
# backup-content.sh
tar -czf content_backup_$(date +%Y%m%d).tar.gz outputs/ uploads/
```

## 📈 Scaling Considerations

### Database Migration (SQLite → PostgreSQL)
```python
# Update database URL in .env
DATABASE_URL=postgresql://username:password@localhost:5432/rudnex_digital

# Install additional dependency
pip install psycopg2-binary

# Update database connection
from sqlalchemy import create_engine
engine = create_engine(DATABASE_URL)
```

### Load Balancing
```nginx
upstream backend {
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
}

server {
    location /api/ {
        proxy_pass http://backend;
    }
}
```

### CDN Integration (Cloudflare)
```javascript
// Update asset URLs
const ASSET_URL = process.env.NODE_ENV === 'production' 
  ? 'https://cdn.rudnex.com' 
  : '';
```

## 🛡️ Security Checklist

### Production Security
- [ ] Change default admin token
- [ ] Enable HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Set up security headers
- [ ] Enable database encryption
- [ ] Regular security updates

### Security Headers
```python
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["rudnex.com"])
app.add_middleware(HTTPSRedirectMiddleware)
```

## 🐛 Troubleshooting

### Common Issues

#### Frontend Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update
```

#### Backend Issues
```bash
# Virtual environment issues
python -m venv venv --clear
source venv/bin/activate
pip install -r requirements.txt

# Port conflicts
netstat -tulpn | grep :8000
kill -9 <PID>
```

#### Video Generation Issues
```python
# Check GPU availability
import torch
print(f"CUDA available: {torch.cuda.is_available()}")
print(f"GPU count: {torch.cuda.device_count()}")

# Fallback to CPU if needed
device = torch.device('cpu')
```

### Logs and Debugging
```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Custom error tracking
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    logger.info(f"{request.method} {request.url} - {response.status_code} - {process_time:.4f}s")
    return response
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks
1. **Weekly**: Check logs for errors
2. **Monthly**: Update dependencies
3. **Quarterly**: Security audit
4. **Annually**: Full system backup and restore test

### Support Channels
- **Technical Issues**: tech@rudnex.com
- **General Support**: support@rudnex.com
- **Business Inquiries**: business@rudnex.com

### Documentation Updates
- Update this README when adding new features
- Document API changes in OpenAPI/Swagger
- Maintain changelog for version tracking

---

## 🎯 Quick Start Commands

```bash
# Complete setup in one script
git clone https://github.com/your-repo/rudnex-digital-hub.git
cd rudnex-digital-hub

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Update with your values
uvicorn main:app --reload &

# Frontend setup
cd ../frontend
npm install
cp .env.example .env  # Update with your values
npm run dev &

# Open browser
open http://localhost:3000
```

### Admin Tool Access
1. Navigate to: `http://localhost:3000/admin/generator`
2. Enter token: `rudnex-admin-2025`
3. Start generating content for Audiu!

---

**🎉 Your Rudnex Digital Hub is now ready for deployment!**

For questions or support, contact: tech@rudnex.com
