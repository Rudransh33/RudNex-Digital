import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'api-reference', title: 'API Reference', icon: '🔧' },
    { id: 'apps', title: 'Applications', icon: '📱' },
    { id: 'deployment', title: 'Deployment', icon: '☁️' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔍' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Documentation - Rudnex Digital Hub</title>
        <meta name="description" content="Comprehensive documentation for Rudnex Digital Hub - AI-powered digital solutions platform" />
      </Head>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-white">
                  <span className="text-purple-400">Rudnex</span> Digital Hub
                </Link>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/apps" className="text-white hover:text-purple-400 transition-colors">
                Apps
              </Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">
                Contact
              </Link>
              <Link href="/docs" className="text-purple-400 font-semibold">
                Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about Rudnex Digital Hub and our AI-powered solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">Contents</h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="mr-2">{section.icon}</span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                {/* Getting Started */}
                {activeSection === 'getting-started' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">🚀 Getting Started</h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Welcome to Rudnex Digital Hub</h3>
                        <p className="text-gray-300 mb-4">
                          Rudnex Digital Hub is a comprehensive platform that provides AI-powered digital solutions for content creation, 
                          video generation, and productivity tools. Our platform combines cutting-edge artificial intelligence with 
                          user-friendly interfaces to help you create amazing content.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Quick Start Guide</h3>
                        <div className="space-y-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">1. Choose Your Application</h4>
                            <p className="text-gray-300 text-sm">
                              Browse our collection of AI-powered applications, from video generators to content creators.
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">2. Set Up Your Account</h4>
                            <p className="text-gray-300 text-sm">
                              Contact us to get access credentials and API keys for our services.
                            </p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">3. Start Creating</h4>
                            <p className="text-gray-300 text-sm">
                              Use our intuitive interfaces to generate content, videos, and more with AI assistance.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">System Requirements</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Minimum Requirements</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                              <li>• Stable internet connection</li>
                              <li>• 4GB RAM (for local processing)</li>
                              <li>• 2GB free disk space</li>
                            </ul>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Recommended</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• 8GB+ RAM</li>
                              <li>• High-speed internet (50+ Mbps)</li>
                              <li>• Dedicated GPU (for video processing)</li>
                              <li>• SSD storage</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* API Reference */}
                {activeSection === 'api-reference' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">🔧 API Reference</h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Authentication</h3>
                        <p className="text-gray-300 mb-4">
                          All API requests require authentication using API keys. Include your API key in the request headers.
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                          <code className="text-green-400">
                            Authorization: Bearer YOUR_API_KEY
                          </code>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Video Generation API</h3>
                        <div className="space-y-4">
                          <div className="bg-gray-900 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Text-to-Video Generation</h4>
                            <code className="text-green-400 block mb-2">POST /api/generate/text-to-video</code>
                            <pre className="text-gray-300 text-sm">
{`{
  "prompt": "A beautiful sunset over mountains",
  "settings": {
    "duration": 10,
    "fps": 30,
    "resolution": "1920x1080",
    "format": "Horizontal",
    "platform": "YouTube"
  }
}`}
                            </pre>
                          </div>

                          <div className="bg-gray-900 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Image-to-Video Generation</h4>
                            <code className="text-green-400 block mb-2">POST /api/generate/image-to-video</code>
                            <p className="text-gray-300 text-sm mb-2">Multipart form data with image file and settings</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Response Format</h3>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <pre className="text-gray-300 text-sm">
{`{
  "success": true,
  "message": "Video generated successfully",
  "output_file": "video_1234567890.mp4",
  "details": {
    "frames": 300,
    "duration": 10.0,
    "fps": 30,
    "resolution": "1920x1080"
  }
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Applications */}
                {activeSection === 'apps' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">📱 Applications</h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">AI Video Generator</h3>
                        <p className="text-gray-300 mb-4">
                          Our flagship video generation tool that creates stunning videos from text prompts or images. 
                          Features include multiple format support, platform optimization, and advanced AI processing.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Features</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Text-to-video generation</li>
                              <li>• Image-to-video conversion</li>
                              <li>• Multiple aspect ratios</li>
                              <li>• Platform optimization</li>
                              <li>• Custom duration and FPS</li>
                            </ul>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Supported Formats</h4>
                            <ul className="text-gray-300 text-sm space-y-1">
                              <li>• Square (1:1) - Instagram</li>
                              <li>• Vertical (9:16) - TikTok, Stories</li>
                              <li>• Horizontal (16:9) - YouTube</li>
                              <li>• Custom resolutions</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Content Creator</h3>
                        <p className="text-gray-300 mb-4">
                          AI-powered content creation tool that helps you generate articles, social media posts, 
                          and marketing copy with natural language processing.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Audio Drama Generator</h3>
                        <p className="text-gray-300 mb-4">
                          Create immersive audio dramas and podcasts with AI voice synthesis, 
                          script generation, and sound effects.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Deployment */}
                {activeSection === 'deployment' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">☁️ Deployment</h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Local Development</h3>
                        <p className="text-gray-300 mb-4">
                          Set up Rudnex Digital Hub on your local machine for development and testing.
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">Quick Start</h4>
                          <pre className="text-gray-300 text-sm">
{`# Clone the repository
git clone https://github.com/rudnex/rudnex-digital-hub.git
cd rudnex-digital-hub

# Install dependencies
npm install

# Start the development server
npm run dev

# Start the backend API
cd backend
pip install -r requirements.txt
python app.py`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Production Deployment</h3>
                        <p className="text-gray-300 mb-4">
                          Deploy Rudnex Digital Hub to production environments using Docker and cloud platforms.
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">Docker Deployment</h4>
                          <pre className="text-gray-300 text-sm">
{`# Build and run with Docker Compose
docker-compose up -d

# Or build individually
docker build -t rudnex-frontend ./frontend
docker build -t rudnex-backend ./backend`}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Environment Variables</h3>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <pre className="text-gray-300 text-sm">
{`# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Rudnex Digital Hub

# Backend (.env)
FLASK_ENV=production
SECRET_KEY=your-secret-key
DATABASE_URL=sqlite:///rudnex.db
UPLOAD_FOLDER=uploads
OUTPUT_FOLDER=outputs`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Troubleshooting */}
                {activeSection === 'troubleshooting' && (
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">🔍 Troubleshooting</h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Common Issues</h3>
                        
                        <div className="space-y-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Video Generation Fails</h4>
                            <p className="text-gray-300 text-sm mb-2">
                              <strong>Problem:</strong> Video generation process fails or times out
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                              <strong>Solution:</strong> Check your internet connection, ensure sufficient disk space, 
                              and verify that your prompt is appropriate and not too complex.
                            </p>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">API Connection Issues</h4>
                            <p className="text-gray-300 text-sm mb-2">
                              <strong>Problem:</strong> Cannot connect to the API or receive authentication errors
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                              <strong>Solution:</strong> Verify your API key is correct, check the API endpoint URL, 
                              and ensure the backend service is running.
                            </p>
                          </div>

                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Slow Performance</h4>
                            <p className="text-gray-300 text-sm mb-2">
                              <strong>Problem:</strong> Video generation is very slow or unresponsive
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                              <strong>Solution:</strong> Reduce video duration, lower resolution, or use simpler prompts. 
                              Consider upgrading your hardware for better performance.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Getting Help</h3>
                        <p className="text-gray-300 mb-4">
                          If you're still experiencing issues, here are some ways to get help:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Contact Support</h4>
                            <p className="text-gray-300 text-sm mb-2">
                              Email us at support@rudnex.com with detailed information about your issue.
                            </p>
                            <Link href="/contact" className="text-purple-400 hover:text-purple-300 text-sm">
                              Contact Support →
                            </Link>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Check Logs</h4>
                            <p className="text-gray-300 text-sm mb-2">
                              Review the application logs for detailed error information and debugging.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-300">
            <p>&copy; 2024 Rudnex Digital Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
