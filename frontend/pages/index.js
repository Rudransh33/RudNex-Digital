import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check admin session via backend or local flag
    const localFlag = typeof window !== 'undefined' && localStorage.getItem('rudnex_admin') === '1'
    fetch('/api/admin/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setIsAdmin(Boolean(data?.authenticated) || localFlag))
      .catch(() => setIsAdmin(localFlag))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Rudnex Digital Hub - AI-Powered Digital Solutions</title>
        <meta name="description" content="Transform your digital presence with AI-powered solutions. From video generation to content creation, Rudnex Digital Hub has you covered." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-purple-400">Rudnex</span> Digital Hub
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
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
              <Link href="/docs" className="text-white hover:text-purple-400 transition-colors">
                Docs
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-purple-400 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/50 rounded-lg mt-2">
                <Link href="/" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Home
                </Link>
                <Link href="/apps" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Apps
                </Link>
                <Link href="/contact" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Contact
                </Link>
                <Link href="/docs" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Docs
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Rudnex Digital Hub
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Transform your digital presence with cutting-edge AI-powered solutions. 
                From video generation to content creation, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apps" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  Explore Our Apps
                </Link>
                <Link href="/contact" className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Powerful AI Tools
              </h2>
              <p className="text-xl text-gray-300">
                Discover our suite of AI-powered applications designed to enhance your digital workflow
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Video Generator (admin only) */}
              {isAdmin && (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
                  <div className="text-purple-400 text-4xl mb-4">🎬</div>
                  <h3 className="text-xl font-semibold text-white mb-3">AI Video Generator</h3>
                  <p className="text-gray-300 mb-4">
                    Create stunning videos from text prompts or images with our advanced AI technology.
                  </p>
                  <Link href="/apps/video-generator" className="text-purple-400 hover:text-purple-300 transition-colors">
                    Try it now →
                  </Link>
                </div>
              )}

              {/* Content Creator */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="text-purple-400 text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold text-white mb-3">Content Creator</h3>
                <p className="text-gray-300 mb-4">
                  Generate engaging content, articles, and social media posts with AI assistance.
                </p>
                <Link href="/apps/content-creator" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Try it now →
                </Link>
              </div>

              {/* Image Editor */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="text-purple-400 text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-white mb-3">AI Image Editor</h3>
                <p className="text-gray-300 mb-4">
                  Edit and enhance images with AI-powered tools and filters.
                </p>
                <Link href="/apps/image-editor" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Try it now →
                </Link>
              </div>

              {/* Audiu App (Coming Soon) */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-purple-400 text-4xl mb-4">🎧</div>
                <h3 className="text-xl font-semibold text-white mb-3">Audiu App</h3>
                <p className="text-gray-300 mb-4">
                  Create immersive audio stories and dramas with natural AI voices.
                </p>
                <span className="inline-flex items-center text-gray-400 cursor-not-allowed">Coming Soon</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Digital Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are already leveraging the power of AI to create amazing content.
            </p>
            <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              Start Creating Today
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                <span className="text-purple-400">Rudnex</span> Digital Hub
              </h3>
              <p className="text-gray-300">
                Empowering creators with AI-powered digital solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/apps/video-generator" className="hover:text-purple-400 transition-colors">Video Generator</Link></li>
                <li><Link href="/apps/content-creator" className="hover:text-purple-400 transition-colors">Content Creator</Link></li>
                <li><Link href="/apps/image-editor" className="hover:text-purple-400 transition-colors">Image Editor</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/docs" className="hover:text-purple-400 transition-colors">Documentation</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Support</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Privacy</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Rudnex Digital Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
