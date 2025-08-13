import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Apps() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const localFlag = typeof window !== 'undefined' && localStorage.getItem('rudnex_admin') === '1'
    fetch('/api/admin/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setIsAdmin(Boolean(data?.authenticated) || localFlag))
      .catch(() => setIsAdmin(localFlag))
  }, [])
  
  const apps = [
    {
      id: 'video-generator',
      name: 'AI Video Generator',
      description: 'Create stunning videos from text prompts or images with advanced AI technology',
      icon: '🎬',
      category: 'AI',
      status: 'Live',
      features: ['Text-to-Video', 'Image-to-Video', 'Multiple Formats', 'Platform Optimization']
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      description: 'Generate engaging content, articles, and social media posts with AI assistance',
      icon: '✍️',
      category: 'AI',
      status: 'Coming Soon',
      features: ['Article Generation', 'Social Media Posts', 'Content Optimization', 'SEO Tools']
    },
    {
      id: 'image-editor',
      name: 'AI Image Editor',
      description: 'Edit and enhance images with AI-powered tools and filters',
      icon: '🎨',
      category: 'AI',
      status: 'Coming Soon',
      features: ['AI Enhancement', 'Background Removal', 'Style Transfer', 'Batch Processing']
    },
    {
      id: 'audio-drama',
      name: 'Audio Drama Generator',
      description: 'Create immersive audio dramas and podcasts with AI voice synthesis',
      icon: '🎭',
      category: 'Audio',
      status: 'Live',
      features: ['Voice Synthesis', 'Script Generation', 'Sound Effects', 'Multi-Character']
    },
    {
      id: 'todo-app',
      name: 'Offline ToDo',
      description: 'Multilingual todo app with reminders and offline functionality',
      icon: '✅',
      category: 'Productivity',
      status: 'Live',
      features: ['Offline Sync', 'Multi-language', 'Reminders', 'Categories']
    }
  ]

  const filteredApps = apps
    .filter(app => (app.id !== 'video-generator') || isAdmin)
    .filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [...new Set(apps.map(app => app.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Apps - Rudnex Digital Hub</title>
        <meta name="description" content="Explore our suite of AI-powered applications and digital tools" />
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
              <Link href="/apps" className="text-purple-400 font-semibold">
                Apps
              </Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">
                Contact
              </Link>
              <Link href="/docs" className="text-white hover:text-purple-400 transition-colors">
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
              Our Applications
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our suite of AI-powered applications designed to enhance your digital workflow and creativity.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search apps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <div key={app.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{app.icon}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    app.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {app.status}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{app.name}</h3>
                <p className="text-gray-300 mb-4 text-sm">{app.description}</p>
                
                <div className="mb-4">
                  <span className="inline-block bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs font-medium">
                    {app.category}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2 text-sm">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {app.features.map((feature, index) => (
                      <span key={index} className="bg-white/10 text-gray-300 px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href={`/apps/${app.id}`} className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium">
                  {app.status === 'Live' ? 'Try it now' : 'Learn more'} →
                </Link>
              </div>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl text-white mb-2">No apps found</h3>
              <p className="text-gray-300">Try adjusting your search terms</p>
            </div>
          )}
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
