import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Rudnex Digital - Checklio Tasks & Audio Story Apps</title>
        <meta name="description" content="Simple and powerful Checklio Tasks app and immersive Audio Story app for your daily productivity and entertainment." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-purple-400">Rudnex</span> Digital
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-white hover:text-purple-400 transition-colors">
                Home
              </Link>
              <Link href="/checkliotasks#screenshots" className="text-white hover:text-purple-400 transition-colors">
                Screenshots
              </Link>
              <Link href="/apps" className="text-white hover:text-purple-400 transition-colors">
                Apps
              </Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">
                Contact
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
                <Link href="/checkliotasks#screenshots" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Screenshots
                </Link>
                <Link href="/apps" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Apps
                </Link>
                <Link href="/contact" className="block px-3 py-2 text-white hover:text-purple-400 transition-colors">
                  Contact
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
                  Rudnex Digital
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Simple, powerful apps for your daily productivity and entertainment. 
                Stay organized with Checklio Tasks and immerse yourself in captivating audio stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/checkliotasks" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  Checklio Tasks
                </Link>
                <Link href="/contact" className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Apps Section */}
        <section id="apps" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Apps
              </h2>
              <p className="text-xl text-gray-300">
                Two essential apps designed to enhance your daily life
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Checklio Tasks */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="text-purple-400 text-6xl mb-6 text-center">✅</div>
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">Checklio Tasks</h3>
                <p className="text-gray-300 mb-6 text-center">
                  Stay organized with our powerful offline Checklio Tasks app. Features multi-language support, 
                  reminders, categories, and seamless offline sync.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Offline functionality
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Multi-language support
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Smart reminders
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Task categories
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/checkliotasks" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    View App Details
                  </Link>
                </div>
              </div>

              {/* Audio Story App */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="text-purple-400 text-6xl mb-6 text-center">🎧</div>
                <h3 className="text-2xl font-semibold text-white mb-4 text-center">Audio Story App</h3>
                <p className="text-gray-300 mb-6 text-center">
                  Immerse yourself in captivating audio stories and dramas. 
                  Listen to professionally narrated content anytime, anywhere.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    High-quality audio
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Diverse story collection
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Offline listening
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-2">✓</span>
                    Background play
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/audiu-audiostories" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    View App Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download our apps and transform your daily routine with better organization and entertainment.
            </p>
            <Link href="/apps" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              Explore Apps
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                <span className="text-purple-400">Rudnex</span> Digital
              </h3>
              <p className="text-gray-300">
                Simple, powerful apps for your daily productivity and entertainment.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Apps</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/checkliotasks" className="hover:text-purple-400 transition-colors">Checklio Tasks</Link></li>
                <li><Link href="/apps/audio-story" className="hover:text-purple-400 transition-colors">Audio Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Rudnex Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
