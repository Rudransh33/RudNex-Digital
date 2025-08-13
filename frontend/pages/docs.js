import Link from 'next/link'

export default function Docs(){
  // For readability we will embed key parts and provide download link for full guide.
  return (
    <div className="p-8">
      <Link href="/"><a className="text-gray-400">← Back</a></Link>
      <h1 className="text-3xl font-bold text-rudred mt-4">Rudnex Chatbot API - Deployment Guide</h1>

      <section className="mt-6 bg-gray-900 p-6 rounded">
        <h2 className="text-xl text-white">Overview</h2>
        <p className="text-gray-300 mt-2">This guide contains instructions to deploy the Rudnex Chatbot API with Flask, SQLite, and client integration.</p>

        <details className="mt-4">
          <summary className="cursor-pointer">Installation & Setup (click)</summary>
          <div className="mt-2 text-gray-300">
            <pre className="bg-black p-3 rounded text-sm">
{/* Put a concise copy of the steps, and a "Download full guide" link to a file or GitHub */}
            </pre>
          </div>
        </details>

        <details className="mt-4">
          <summary className="cursor-pointer">Full Deployment Guide (download)</summary>
          <div className="mt-2">
            <a className="text-rudred" href="/full-deployment-guide.txt" download>Download full Chatbot Deployment Guide</a>
          </div>
        </details>
      </section>
    </div>
  )
}
