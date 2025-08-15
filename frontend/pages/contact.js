import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'https://rudnex.com') + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Contact - Rudnex Digital</title>
        <meta name="description" content="Get in touch with us for support or questions about our ToDo and Audio Story apps" />
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
              <Link href="/apps" className="text-white hover:text-purple-400 transition-colors">
                Apps
              </Link>
              <Link href="/contact" className="text-purple-400 font-semibold">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our apps? Need support? We're here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form onSubmit={submit} className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'sent' && (
                  <div className="text-green-400 text-center">Message sent successfully!</div>
                )}
                {status === 'error' && (
                  <div className="text-red-400 text-center">Failed to send message. Please try again.</div>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-3">📧</span>
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div>help@rudnex.com</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-purple-400 mr-3">🌐</span>
                    <div>
                      <div className="font-medium text-white">Website</div>
                      <div>rudnex.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Our Apps</h2>
                <div className="space-y-4">
                  <Link href="/apps/todo-app" className="flex items-center p-4 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="text-2xl mr-4">✅</span>
                    <div>
                      <div className="font-medium text-white">ToDo List App</div>
                      <div className="text-gray-300 text-sm">Stay organized and productive</div>
                    </div>
                  </Link>
                  <Link href="/apps/audio-story" className="flex items-center p-4 rounded-lg hover:bg-white/5 transition-colors">
                    <span className="text-2xl mr-4">🎧</span>
                    <div>
                      <div className="font-medium text-white">Audio Story App</div>
                      <div className="text-gray-300 text-sm">Listen to captivating stories</div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Support</h2>
                <p className="text-gray-300 mb-4">
                  Need help with our apps? We're here to assist you with any questions or issues you might have.
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• App installation and setup</div>
                  <div>• Feature explanations</div>
                  <div>• Bug reports and feedback</div>
                  <div>• General inquiries</div>
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
            <p>&copy; 2024 Rudnex Digital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
