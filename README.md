# Rudnex Digital Hub

A secure, AI-powered content creation and management platform with modern web technologies and admin-only video generation.

## 🚀 Features

### Frontend

* **React/Next.js** – Responsive, modern UI
* **Tailwind CSS** – Utility-first styling
* **Interactive Components** – Contact forms, showcases, analytics
* **Mobile-First Design** – Fully responsive

### Backend (FastAPI)

* **Admin-Only Veo 3 Video Generator** – Hidden video creation tool accessible only with admin authentication
* **Text-to-Speech** – High-quality AI voice generation
* **Email Handling** – Contact form automation
* **Analytics Dashboard** – Real-time usage tracking
* **Content Library** – Manage generated media
* **Secure Admin Panel** – Token-based access control

### Apps Showcased

* **Audiu** – AI-powered audio drama creator
* **Smart ToDo** – Offline intelligent task manager

---

## 🛠 Setup Instructions

### Prerequisites

* Python 3.8+
* Node.js 16+
* FFmpeg (for video/audio processing)

---

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd rudnexdigital
```

---

### 2️⃣ Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Or on Windows:

```bash
start-fastapi.bat
```

---

### 3️⃣ Frontend Setup (React/Next.js)

```bash
cd frontend
npm install
npm run dev
```

Or on Windows:

```bash
start-react.bat
```

---

### 4️⃣ Access Points

* **Main Website** → [http://localhost:3000](http://localhost:3000)
* **API Docs** → [http://localhost:8000/docs](http://localhost:8000/docs)
* **Admin Panel (Veo 3 Video Generator)** → [http://localhost:8000/admin](http://localhost:8000/admin) *(Admin token required)*

---

## 🔒 Security & Authentication

* Admin-only video generator endpoint is **hidden** and not linked from the public UI.
* Protected routes require Bearer token authentication.

Example request:

```http
Authorization: Bearer rudnex-admin-2025
```

---

## 📁 Project Structure

```
rudnexdigital/
├── backend/                 # FastAPI Backend
│   ├── main.py              # Main FastAPI app
│   ├── requirements.txt     # Python dependencies
│   ├── templates/
│   │   └── admin_veo3.html  # Admin-only video generator
│   ├── uploads/             # File uploads
│   ├── outputs/             # Generated files
│   └── content/             # Static content
├── frontend/                # React/Next.js Frontend
│   ├── pages/               # Next.js pages
│   ├── components/          # React components
│   ├── styles/              # CSS/Tailwind
│   └── package.json         # Node dependencies
├── index.html               # Legacy HTML frontend
├── start-fastapi.bat        # Backend startup script
├── start-react.bat          # Frontend startup script
└── README.md
```

---

## 🔧 API Endpoints

### Public

* `GET /` – Health check
* `POST /api/contact` – Contact form
* `POST /api/analytics` – Track analytics

### Admin (Protected)

* `POST /api/admin/generate-video` – **Admin-only Veo 3 video generator**
* `POST /api/admin/generate-audio` – Generate audio
* `GET /api/admin/content-library` – View generated files
* `GET /api/admin/analytics` – Admin analytics

---

## 📊 Database Schema

* `contact_submissions` – Stores contact form data
* `content_generations` – Logs generated files
* `app_analytics` – Usage statistics

---

## 🆕 Recent Changes

* ✅ Moved to FastAPI backend
* ✅ React/Next.js frontend
* ✅ **Admin-only Veo 3 video generator** with token security
* ✅ Analytics system upgraded
* ✅ File structure updated for modularity

---
