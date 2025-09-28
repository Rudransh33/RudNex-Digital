import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Apps() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const apps = [
    {
      id: 'todo-app',
      name: 'Checklio Tasks',
      description: 'Stay organized with our powerful offline Checklio Tasks app with multi-language support, reminders, and categories',
      icon: '✅',
      category: 'Productivity',
      status: 'Coming Soon',
      features: ['Offline Sync', 'Multi-language', 'Smart Reminders', 'Task Categories', 'Priority Levels'],
      releaseDate: 'Q2 2024'
    },
    {
      id: 'audiu-audiostories',
      name: 'Audiu - Audiu Stories',
      description: 'Immerse yourself in captivating audio stories and dramas with high-quality narration',
      icon: '🎧',
      category: 'Entertainment',
      status: 'Coming Soon',
      features: ['High-quality Audio', 'Diverse Stories', 'Offline Listening', 'Background Play', 'Bookmarks'],
      releaseDate: 'Q3 2024'
    }
  ]

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Apps - Rudnex Digital</title>
        <meta name="description" content="Explore Checklio Tasks and Audio Story apps for productivity and entertainment" />
      </Head>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-white">
                  <span className="text-purple-400">Rudnex</span> Digital
                </Link>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/checkliotasks#screenshots" className="text-white hover:text-purple-400 transition-colors">
                Screenshots
              </Link>
              <Link href="/apps" className="text-purple-400 font-semibold">
                Apps
              </Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">
                Contact
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
              Our Apps
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Two essential apps designed to enhance your daily productivity and entertainment.
            </p>
          </div>

          {/* Search */}
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
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredApps.map((app) => (
              <div key={app.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-400/50 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-6xl">{app.icon}</div>
                  <div className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500/20 text-yellow-400">
                    {app.status}
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">{app.name}</h3>
                <p className="text-gray-300 mb-6">{app.description}</p>
                
                <div className="mb-6">
                  <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-sm font-medium">
                    {app.category}
                  </span>
                  <span className="inline-block bg-blue-500/20 text-blue-400 px-3 py-1 rounded text-sm font-medium ml-2">
                    {app.releaseDate}
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {app.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300 text-sm">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  {app.id === 'todo-app' ? (
                    <Link href="/checkliotasks" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Learn More
                    </Link>
                  ) : (
                    <Link href={`/apps/${app.id}`} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                      Learn More
                    </Link>
                  )}
                </div>
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

          {/* Coming Soon CTA */}
          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">Excited About Our Apps?</h2>
              <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
                Our apps are currently in development. Join our waitlist to be the first to know when they launch!
              </p>
              <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-300">
            <p>&copy; 2024 Rudnex Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
