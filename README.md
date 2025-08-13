# Rudnex Digital Hub

A comprehensive web platform featuring AI-powered mobile apps, content generation, and modern web technologies.

## 🚀 Features

### Frontend
- **React/Next.js** - Modern, responsive web interface
- **Tailwind CSS** - Beautiful, utility-first styling
- **Interactive Components** - Contact forms, app showcases
- **Mobile-First Design** - Optimized for all devices

### Backend (FastAPI)
- **AI Video Generation** - Veo 3 style content creation
- **Text-to-Speech** - Audio generation capabilities
- **Email System** - Automated contact form processing
- **Analytics Dashboard** - Real-time usage statistics
- **Content Library** - Generated media management
- **Admin Panel** - Modern Veo 3 style interface

### Apps Showcased
- **Audiu** - AI-powered audio story creation
- **Smart ToDo** - Intelligent task management

## 🛠️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- FFmpeg (for video processing)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rudnexdigital
   ```

2. **Start the FastAPI Backend**
   ```bash
   # Windows
   start-fastapi.bat
   
   # Or manually:
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   # source venv/bin/activate  # Linux/Mac
   pip install -r requirements.txt
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **Start the React Frontend**
   ```bash
   # Windows
   start-react.bat
   
   # Or manually:
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Applications**
   - **Main Website**: http://localhost:3000
   - **API Documentation**: http://localhost:8000/docs
   - **Admin Panel**: http://localhost:8000/admin
   - **API Health Check**: http://localhost:8000/

### Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Security
SECRET_KEY=your-secret-key-here
ADMIN_TOKEN=rudnex-admin-2025

# Email Configuration (Optional)
SMTP_SERVER=mail.rudnex.com
SMTP_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 📁 Project Structure

```
rudnexdigital/
├── backend/                 # FastAPI Backend
│   ├── main.py             # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── templates/          # HTML templates
│   │   └── admin_veo3.html # Admin interface
│   ├── uploads/            # File uploads
│   ├── outputs/            # Generated content
│   └── content/            # Static content files
├── frontend/               # React/Next.js Frontend
│   ├── pages/              # Next.js pages
│   ├── components/         # React components
│   ├── styles/             # CSS styles
│   └── package.json        # Node.js dependencies
├── index.html              # Legacy HTML frontend
├── start-fastapi.bat       # Backend startup script
├── start-react.bat         # Frontend startup script
└── README.md               # This file
```

## 🔧 API Endpoints

### Public Endpoints
- `GET /` - Health check
- `POST /api/contact` - Submit contact form
- `POST /api/analytics` - Track app analytics

### Admin Endpoints (Protected)
- `POST /api/admin/generate-video` - Generate AI video content
- `POST /api/admin/generate-audio` - Generate audio dubbing
- `GET /api/admin/content-library` - Get generated content
- `GET /api/admin/analytics` - Get admin analytics

### Authentication
Admin endpoints require Bearer token authentication:
```
Authorization: Bearer rudnex-admin-2025
```

## 🎨 Admin Panel Features

### Video Generation
- **Text-to-Video**: Generate videos from text prompts
- **Multiple Styles**: Realistic, cartoon, artistic
- **Resolution Options**: 720p, 1080p, 1440p, 4K
- **Duration Control**: 5-300 seconds
- **Real-time Progress**: Live generation status

### Audio Generation
- **Text-to-Speech**: Convert text to audio
- **Voice Selection**: Multiple voice options
- **Speed Control**: Adjustable playback speed
- **Instant Preview**: Auto-play generated audio

### Analytics Dashboard
- **Contact Submissions**: Track form submissions
- **Content Generation**: Success/failure rates
- **Real-time Updates**: Live data refresh

### Content Library
- **Generated Media**: Browse all created content
- **Download Links**: Direct file access
- **Status Tracking**: Generation progress
- **Metadata**: Creation dates, settings, prompts

## 🔒 Security Features

- **CORS Protection**: Configured for production
- **Input Validation**: Pydantic models
- **Admin Authentication**: Bearer token system
- **File Upload Limits**: Size and type restrictions
- **SQL Injection Protection**: Parameterized queries

## 📊 Database Schema

### Tables
- `contact_submissions` - Contact form data
- `content_generations` - Generated media logs
- `app_analytics` - Usage statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For technical support:
- Email: help@rudnex.com
- Issues: Create a GitHub issue

## 🔄 Updates

### Recent Changes
- ✅ Migrated from Flask to FastAPI
- ✅ Added Veo 3 style admin interface
- ✅ Implemented AI video generation
- ✅ Added comprehensive analytics
- ✅ Enhanced security features
- ✅ Improved error handling

### Planned Features
- 🔄 Advanced AI models integration
- 🔄 Real-time collaboration tools
- 🔄 Mobile app API endpoints
- 🔄 Advanced analytics dashboard
- 🔄 Multi-language support
