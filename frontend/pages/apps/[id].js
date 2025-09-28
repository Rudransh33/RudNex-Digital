import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function AppDetail() {
  const router = useRouter()
  const { id } = router.query
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)

  const apps = {
    'todo-app': {
      id: 'todo-app',
      name: 'Checklio Tasks',
      description: 'Stay organized with our powerful offline Checklio Tasks app with multi-language support, reminders, and categories',
      icon: '✅',
      category: 'Productivity',
      status: 'Coming Soon',
      features: ['Offline Sync', 'Multi-language', 'Smart Reminders', 'Task Categories', 'Priority Levels'],
      longDescription: 'Stay organized and boost your productivity with Checklio Tasks. Designed for modern life, it works seamlessly offline and syncs when you\'re back online. Available in multiple languages, it helps you manage tasks, set reminders, and organize your life with ease.',
      screenshots: [
        { title: 'Main Dashboard', description: 'Clean interface showing all your tasks' },
        { title: 'Task Creation', description: 'Easy task creation with categories and priorities' },
        { title: 'Reminders', description: 'Smart reminder system to keep you on track' }
      ],
      downloadUrl: '#',
      demoUrl: '#',
      releaseDate: 'Q2 2024'
    },
    'audiu-audiostories': {
      id: 'audiu-audiostories',
      name: 'Audiu Audio Stories',
      description: 'Immerse yourself in captivating audio stories and dramas with high-quality narration',
      icon: '🎧',
      category: 'Entertainment',
      status: 'Coming Soon',
      features: ['High-quality Audio', 'Diverse Stories', 'Offline Listening', 'Background Play', 'Bookmarks'],
      longDescription: 'Escape into a world of captivating stories with Audiu. Featuring professionally narrated content across various genres, from thrilling mysteries to heartwarming tales. Listen anywhere, anytime with offline support and background playback.',
      screenshots: [
        { title: 'Story Library', description: 'Browse through our extensive collection of stories' },
        { title: 'Player Interface', description: 'Beautiful audio player with controls and bookmarks' },
        { title: 'Offline Mode', description: 'Download stories for offline listening' }
      ],
      downloadUrl: '#',
      demoUrl: '#',
      releaseDate: 'Q3 2024'
    }
  }

  useEffect(() => {
    if (id) {
      // Redirect old audio-story route to new Audiu page
      if (id === 'audio-story') {
        router.push('/audiu-audiostories')
        return
      }
      if (apps[id]) {
        setApp(apps[id])
      }
    }
    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">App Not Found</h1>
          <p className="text-gray-300 mb-8">The app you're looking for doesn't exist.</p>
          <Link href="/apps" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to Apps
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>{app.name} - Rudnex Digital</title>
        <meta name="description" content={app.description} />
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
          {/* App Header */}
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">{app.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{app.name}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">{app.description}</p>
            
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center bg-yellow-500/20 text-yellow-400 px-6 py-3 rounded-full text-lg font-semibold mb-6">
              <span className="mr-2">🚀</span>
              Coming Soon - {app.releaseDate}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Join Waitlist
              </Link>
              <Link href="/contact" className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Get Notified
              </Link>
            </div>
          </div>

          {/* App Details */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">About {app.name}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{app.longDescription}</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-1 gap-3">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <span className="text-green-400 mr-3">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">App Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Category:</span>
                    <span className="text-white">{app.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className="px-2 py-1 rounded text-sm font-semibold bg-yellow-500/20 text-yellow-400">
                      {app.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Expected Release:</span>
                    <span className="text-white">{app.releaseDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">App Preview</h2>
              <div className="space-y-6">
                {app.screenshots.map((screenshot, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6">
                    <div className="bg-gray-800 rounded-lg h-48 mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-gray-400 text-lg block mb-2">📱</span>
                        <span className="text-gray-400 text-sm">Preview Coming Soon</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{screenshot.title}</h3>
                    <p className="text-gray-300">{screenshot.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon CTA Section */}
          <div className="text-center bg-white/5 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Be the First to Know!</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {app.name} is currently in development. Join our waitlist to get early access and exclusive updates when it launches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
                Join Waitlist
              </Link>
              <Link href="/apps" className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                View All Apps
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
