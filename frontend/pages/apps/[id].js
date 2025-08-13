import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function AppDetail() {
  const router = useRouter()
  const { id } = router.query
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const apps = {
    'video-generator': {
      id: 'video-generator',
      name: 'AI Video Generator',
      description: 'Create stunning videos from text prompts or images with advanced AI technology',
      icon: '🎬',
      category: 'AI',
      status: 'Live',
      features: ['Text-to-Video', 'Image-to-Video', 'Multiple Formats', 'Platform Optimization'],
      longDescription: 'Transform your ideas into captivating videos with our state-of-the-art AI video generation technology. Whether you need content for social media, marketing, or creative projects, our tool can create professional-quality videos from simple text prompts or existing images.',
      demoUrl: '/apps/video-generator/demo',
      apiUrl: '/api/video-generator'
    },
    'content-creator': {
      id: 'content-creator',
      name: 'Content Creator',
      description: 'Generate engaging content, articles, and social media posts with AI assistance',
      icon: '✍️',
      category: 'AI',
      status: 'Coming Soon',
      features: ['Article Generation', 'Social Media Posts', 'Content Optimization', 'SEO Tools'],
      longDescription: 'Streamline your content creation process with AI-powered writing assistance. Generate articles, social media posts, and marketing copy that resonates with your audience.',
      demoUrl: null,
      apiUrl: null
    },
    'image-editor': {
      id: 'image-editor',
      name: 'AI Image Editor',
      description: 'Edit and enhance images with AI-powered tools and filters',
      icon: '🎨',
      category: 'AI',
      status: 'Coming Soon',
      features: ['AI Enhancement', 'Background Removal', 'Style Transfer', 'Batch Processing'],
      longDescription: 'Enhance your images with cutting-edge AI technology. Remove backgrounds, apply artistic styles, and improve image quality with just a few clicks.',
      demoUrl: null,
      apiUrl: null
    },
    'audio-drama': {
      id: 'audio-drama',
      name: 'Audio Drama Generator',
      description: 'Create immersive audio dramas and podcasts with AI voice synthesis',
      icon: '🎭',
      category: 'Audio',
      status: 'Live',
      features: ['Voice Synthesis', 'Script Generation', 'Sound Effects', 'Multi-Character'],
      longDescription: 'Bring your stories to life with AI-generated audio dramas. Create immersive podcasts, audiobooks, and narrative content with realistic voice synthesis and sound effects.',
      demoUrl: '/apps/audio-drama/demo',
      apiUrl: '/api/audio-drama'
    },
    'todo-app': {
      id: 'todo-app',
      name: 'Offline ToDo',
      description: 'Multilingual todo app with reminders and offline functionality',
      icon: '✅',
      category: 'Productivity',
      status: 'Live',
      features: ['Offline Sync', 'Multi-language', 'Reminders', 'Categories'],
      longDescription: 'Stay organized with our feature-rich todo application. Work offline, set reminders, and manage tasks in multiple languages with a clean, intuitive interface.',
      demoUrl: '/apps/todo-app/demo',
      apiUrl: '/api/todo'
    }
  }

  useEffect(() => {
    const init = async () => {
      const localFlag = typeof window !== 'undefined' && localStorage.getItem('rudnex_admin') === '1'
      try {
        const res = await fetch('/api/admin/session', { credentials: 'include' })
        const data = await res.json()
        setIsAdmin(Boolean(data?.authenticated) || localFlag)
      } catch {
        setIsAdmin(localFlag)
      }
      if (id && apps[id]) {
        setApp(apps[id])
      }
      setLoading(false)
    }
    init()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!app || (app.id === 'video-generator' && !isAdmin)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl text-white mb-4">App not found</h1>
          <Link href="/apps" className="text-purple-400 hover:text-purple-300">
            ← Back to Apps
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>{app.name} - Rudnex Digital Hub</title>
        <meta name="description" content={app.description} />
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
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-300">
              <li><Link href="/" className="hover:text-purple-400">Home</Link></li>
              <li>/</li>
              <li><Link href="/apps" className="hover:text-purple-400">Apps</Link></li>
              <li>/</li>
              <li className="text-white">{app.name}</li>
            </ol>
          </nav>

          {/* App Header */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="text-6xl">{app.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{app.name}</h1>
                  <p className="text-gray-300 text-lg">{app.description}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                app.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {app.status}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                {app.category}
              </span>
              {app.features.map((feature, index) => (
                <span key={index} className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>

            {app.status === 'Live' && app.demoUrl && (
              <div className="flex space-x-4">
                <Link href={app.demoUrl} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Try Demo
                </Link>
                <Link href="/contact" className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Get Access
                </Link>
              </div>
            )}

            {app.status === 'Coming Soon' && (
              <div className="flex space-x-4">
                <button className="bg-gray-600 text-gray-300 px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
                <Link href="/contact" className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Join Waitlist
                </Link>
              </div>
            )}
          </div>

          {/* App Details */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">About {app.name}</h2>
                <p className="text-gray-300 leading-relaxed">{app.longDescription}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {app.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-purple-400">✓</div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Category:</span>
                    <div className="text-white">{app.category}</div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Status:</span>
                    <div className={`${
                      app.status === 'Live' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {app.status}
                    </div>
                  </div>
                  {app.apiUrl && (
                    <div>
                      <span className="text-gray-400 text-sm">API Available:</span>
                      <div className="text-green-400">Yes</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Related Apps</h3>
                <div className="space-y-3">
                  {Object.values(apps)
                    .filter(otherApp => otherApp.id !== app.id && otherApp.category === app.category)
                    .slice(0, 3)
                    .map(otherApp => (
                      <Link key={otherApp.id} href={`/apps/${otherApp.id}`} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="text-2xl">{otherApp.icon}</div>
                        <div>
                          <div className="text-white font-medium">{otherApp.name}</div>
                          <div className="text-gray-400 text-sm">{otherApp.status}</div>
                        </div>
                      </Link>
                    ))}
                </div>
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
