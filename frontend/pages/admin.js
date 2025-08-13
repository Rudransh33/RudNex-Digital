import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('text-to-video')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')

  // Text-to-Video + Audio state
  const [textVideoData, setTextVideoData] = useState({
    prompt: '',
    duration: 10,
    style: 'cinematic',
    voice: 'male',
    music: 'epic'
  })

  // Audio Dubbing state
  const [audioDubbingData, setAudioDubbingData] = useState({
    videoFile: null,
    targetLanguage: 'es',
    voiceStyle: 'natural',
    syncMethod: 'auto'
  })

  // Scene Generation state
  const [sceneData, setSceneData] = useState({
    description: '',
    style: 'realistic',
    cameraAngle: 'medium',
    lighting: 'natural'
  })

  const handleTextVideoSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    setGenerationStatus('Initializing Veo 3 model...')

    // Simulate generation process
    const steps = [
      'Processing text prompt...',
      'Generating video frames...',
      'Creating audio narration...',
      'Synchronizing audio and video...',
      'Applying final enhancements...',
      'Generation completed!'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setGenerationStatus(steps[i])
    }

    setIsGenerating(false)
    setGenerationStatus('')
  }

  const handleAudioDubbingSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    setGenerationStatus('Analyzing video content...')

    const steps = [
      'Extracting audio track...',
      'Transcribing speech...',
      'Translating content...',
      'Generating new audio...',
      'Synchronizing with video...',
      'Dubbing completed!'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200))
      setGenerationStatus(steps[i])
    }

    setIsGenerating(false)
    setGenerationStatus('')
  }

  const handleSceneGenerationSubmit = async (e) => {
    e.preventDefault()
    setIsGenerating(true)
    setGenerationStatus('Analyzing scene description...')

    const steps = [
      'Generating 3D scene layout...',
      'Applying lighting and materials...',
      'Rendering scene...',
      'Adding environmental effects...',
      'Optimizing for video...',
      'Scene generation completed!'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setGenerationStatus(steps[i])
    }

    setIsGenerating(false)
    setGenerationStatus('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>Admin - Veo 3 Content Generator - Rudnex Digital Hub</title>
        <meta name="description" content="Advanced AI content generation tools powered by Veo 3 technology" />
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
              Veo 3 Content Generator
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced AI-powered content creation tools using cutting-edge Veo 3 technology
            </p>
          </div>

          {/* Admin Tool Container */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('text-to-video')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'text-to-video'
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-white/5'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🎬 Text-to-Video + Audio
              </button>
              <button
                onClick={() => setActiveTab('audio-dubbing')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'audio-dubbing'
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-white/5'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🎤 Audio Dubbing
              </button>
              <button
                onClick={() => setActiveTab('scene-generation')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-colors ${
                  activeTab === 'scene-generation'
                    ? 'text-purple-400 border-b-2 border-purple-400 bg-white/5'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                🎭 Scene Generation
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Text-to-Video + Audio Tab */}
              {activeTab === 'text-to-video' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Generate Video with Audio Narration</h2>
                  <p className="text-gray-300 mb-8">
                    Create stunning videos with synchronized audio narration using Veo 3's advanced text-to-video capabilities.
                  </p>

                  <form onSubmit={handleTextVideoSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Video Prompt</label>
                      <textarea
                        value={textVideoData.prompt}
                        onChange={(e) => setTextVideoData({...textVideoData, prompt: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                        placeholder="Describe the video you want to create..."
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Duration (seconds)</label>
                        <input
                          type="number"
                          value={textVideoData.duration}
                          onChange={(e) => setTextVideoData({...textVideoData, duration: parseInt(e.target.value)})}
                          min="5"
                          max="60"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Visual Style</label>
                        <select
                          value={textVideoData.style}
                          onChange={(e) => setTextVideoData({...textVideoData, style: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="cinematic">Cinematic</option>
                          <option value="documentary">Documentary</option>
                          <option value="cartoon">Cartoon</option>
                          <option value="realistic">Realistic</option>
                          <option value="artistic">Artistic</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Voice Type</label>
                        <select
                          value={textVideoData.voice}
                          onChange={(e) => setTextVideoData({...textVideoData, voice: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="child">Child</option>
                          <option value="elderly">Elderly</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Background Music</label>
                      <select
                        value={textVideoData.music}
                        onChange={(e) => setTextVideoData({...textVideoData, music: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                      >
                        <option value="epic">Epic</option>
                        <option value="calm">Calm</option>
                        <option value="upbeat">Upbeat</option>
                        <option value="dramatic">Dramatic</option>
                        <option value="none">No Music</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
                    >
                      {isGenerating ? 'Generating...' : 'Generate Video with Audio'}
                    </button>
                  </form>
                </div>
              )}

              {/* Audio Dubbing Tab */}
              {activeTab === 'audio-dubbing' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Audio Dubbing & Translation</h2>
                  <p className="text-gray-300 mb-8">
                    Automatically dub videos into different languages while maintaining perfect lip sync and natural voice quality.
                  </p>

                  <form onSubmit={handleAudioDubbingSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Upload Video</label>
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                        <div className="text-4xl mb-4">📁</div>
                        <p className="text-gray-300 mb-2">Drag and drop your video file here</p>
                        <p className="text-gray-400 text-sm">or click to browse (MP4, MOV, AVI up to 500MB)</p>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setAudioDubbingData({...audioDubbingData, videoFile: e.target.files[0]})}
                          className="hidden"
                          id="video-upload"
                        />
                        <label htmlFor="video-upload" className="inline-block mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer transition-colors">
                          Choose File
                        </label>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Target Language</label>
                        <select
                          value={audioDubbingData.targetLanguage}
                          onChange={(e) => setAudioDubbingData({...audioDubbingData, targetLanguage: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="it">Italian</option>
                          <option value="pt">Portuguese</option>
                          <option value="ja">Japanese</option>
                          <option value="ko">Korean</option>
                          <option value="zh">Chinese</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Voice Style</label>
                        <select
                          value={audioDubbingData.voiceStyle}
                          onChange={(e) => setAudioDubbingData({...audioDubbingData, voiceStyle: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="natural">Natural</option>
                          <option value="professional">Professional</option>
                          <option value="casual">Casual</option>
                          <option value="dramatic">Dramatic</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Sync Method</label>
                        <select
                          value={audioDubbingData.syncMethod}
                          onChange={(e) => setAudioDubbingData({...audioDubbingData, syncMethod: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="auto">Automatic</option>
                          <option value="manual">Manual Review</option>
                          <option value="ai-enhanced">AI Enhanced</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
                    >
                      {isGenerating ? 'Processing...' : 'Generate Dubbed Video'}
                    </button>
                  </form>
                </div>
              )}

              {/* Scene Generation Tab */}
              {activeTab === 'scene-generation' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">3D Scene Generation</h2>
                  <p className="text-gray-300 mb-8">
                    Create detailed 3D scenes and environments from text descriptions using advanced AI rendering technology.
                  </p>

                  <form onSubmit={handleSceneGenerationSubmit} className="space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2">Scene Description</label>
                      <textarea
                        value={sceneData.description}
                        onChange={(e) => setSceneData({...sceneData, description: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                        placeholder="Describe the 3D scene you want to generate..."
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-white font-medium mb-2">Visual Style</label>
                        <select
                          value={sceneData.style}
                          onChange={(e) => setSceneData({...sceneData, style: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="realistic">Realistic</option>
                          <option value="stylized">Stylized</option>
                          <option value="cartoon">Cartoon</option>
                          <option value="sci-fi">Sci-Fi</option>
                          <option value="fantasy">Fantasy</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Camera Angle</label>
                        <select
                          value={sceneData.cameraAngle}
                          onChange={(e) => setSceneData({...sceneData, cameraAngle: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="wide">Wide Shot</option>
                          <option value="medium">Medium Shot</option>
                          <option value="close">Close-up</option>
                          <option value="bird-eye">Bird's Eye</option>
                          <option value="low-angle">Low Angle</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Lighting</label>
                        <select
                          value={sceneData.lighting}
                          onChange={(e) => setSceneData({...sceneData, lighting: e.target.value})}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400 transition-colors"
                        >
                          <option value="natural">Natural</option>
                          <option value="dramatic">Dramatic</option>
                          <option value="soft">Soft</option>
                          <option value="neon">Neon</option>
                          <option value="sunset">Sunset</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
                    >
                      {isGenerating ? 'Generating...' : 'Generate 3D Scene'}
                    </button>
                  </form>
                </div>
              )}

              {/* Generation Status */}
              {isGenerating && (
                <div className="mt-8 p-6 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                    <div>
                      <h3 className="text-white font-semibold">Processing...</h3>
                      <p className="text-gray-300">{generationStatus}</p>
                    </div>
                  </div>
                </div>
              )}
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
