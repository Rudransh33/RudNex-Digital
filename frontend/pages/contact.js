import { useState } from 'react'

export default function Contact(){
  const [status, setStatus] = useState('')
  async function submit(e){
    e.preventDefault()
    const data = { name: e.target.name.value, email: e.target.email.value, message: e.target.message.value }
    setStatus('sending')
    const res = await fetch((process.env.NEXT_PUBLIC_API_URL || 'https://rudnex.com') + '/api/contact', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)
    })
    if(res.ok) setStatus('sent')
    else setStatus('error')
  }
  return (
    <div className="p-8">
      <h1 className="text-2xl text-rudred">Contact Support</h1>
      <form onSubmit={submit} className="mt-4 space-y-3 max-w-xl">
        <input name="name" placeholder="Your name" className="w-full p-2 rounded bg-gray-900" />
        <input name="email" placeholder="Your email" className="w-full p-2 rounded bg-gray-900" />
        <textarea name="message" placeholder="Message" className="w-full p-2 rounded bg-gray-900" />
        <button className="px-4 py-2 bg-rudred rounded">Send</button>
        <p>{status}</p>
      </form>
    </div>
  )
}
