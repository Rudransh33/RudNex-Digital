import Head from 'next/head'
import { useState } from 'react'

export default function ChecklioTasksLanding() {
  const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION || 'v=1'
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const screenshots = [
    { src: '/checkliotasks/01-tasks.jpg', title: 'Task Management Dashboard', desc: 'View all your tasks with priority indicators, completion status, and smart organization.' },
    { src: '/checkliotasks/02-notes.jpg', title: 'Notes Editor', desc: 'Write and format notes. Bold, italic, underline and list tooling at your fingertips.' },
    { src: '/checkliotasks/03-to-planned.jpg', title: 'Weekly Planning', desc: 'Plan your week with dedicated sections for each day and create task sets.' },
    { src: '/checkliotasks/04-suggestions.jpg', title: 'Smart Suggestions', desc: 'Daily wisdom and personalized ideas like "Lunch & Learn" for productivity.' },
    { src: '/checkliotasks/05-weekend.jpg', title: 'Weekend Planner', desc: 'Organize Saturday and Sunday with separate sections and labels.' },
    { src: '/checkliotasks/06-settings.jpeg', title: 'Customizable Settings', desc: 'Biometric lock, alarm priorities, ringtones, volumes, and themes.' }
  ]
  const handleComingSoon = (e) => {
    e.preventDefault()
    alert('Checklio Tasks is coming soon!')
  }

  return (
    <div>
      <Head>
        <title>Checklio Tasks - Smart Task Management & Productivity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="description" content="Checklio Tasks is the intelligent task management app that transforms chaos into clarity. Organize, prioritize, and accomplish your goals with smart suggestions and intuitive planning." />
        <link rel="icon" type="image/jpeg" href={`/checkliotasks/logo.jpg?${assetVersion}`} />
        <link rel="icon" type="image/jpeg" sizes="32x32" href={`/checkliotasks/logo.jpg?${assetVersion}`} />
        <link rel="icon" type="image/jpeg" sizes="16x16" href={`/checkliotasks/logo.jpg?${assetVersion}`} />
        <link rel="shortcut icon" type="image/jpeg" href={`/checkliotasks/logo.jpg?${assetVersion}`} />
        <link rel="apple-touch-icon" href={`/checkliotasks/logo.jpg?${assetVersion}`} />
      </Head>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); padding: 1rem 0; position: fixed; width: 100%; top: 0; z-index: 1000; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        nav { display: flex; justify-content: space-between; align-items: center; }
        .logo { display: flex; align-items: center; font-size: 1.5rem; font-weight: 700; color: white; }
        .logo-img { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; margin-right: 10px; box-shadow: 0 6px 16px rgba(0,0,0,0.25); }
        .nav-links { display: flex; list-style: none; gap: 2rem; }
        .nav-links a { color: white; text-decoration: none; transition: opacity 0.3s; }
        .nav-links a:hover { opacity: 0.8; }
        .hero { padding: 120px 0 80px; text-align: center; color: white; }
        .hero h1 { font-size: 3.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fff, #f0f0f0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto; }
        .cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn { padding: 12px 30px; border: none; border-radius: 50px; font-weight: 600; text-decoration: none; display: inline-block; transition: all 0.3s; cursor: pointer; }
        .btn-primary { background: linear-gradient(45deg, #ff6b6b, #ffa500); color: white; box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4); }
        .btn-secondary { background: rgba(255, 255, 255, 0.2); color: white; border: 2px solid rgba(255, 255, 255, 0.3); }
        .btn-secondary:hover { background: rgba(255, 255, 255, 0.3); }
        .features { background: white; padding: 80px 0; }
        .section-title { text-align: center; font-size: 2.5rem; font-weight: 700; margin-bottom: 3rem; color: #2c3e50; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .feature-card { background: #f8f9fa; padding: 2rem; border-radius: 20px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; }
        .feature-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
        .feature-icon { width: 60px; height: 60px; margin: 0 auto 1rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem; }
        .feature-card h3 { font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; color: #2c3e50; }
        .screenshots { background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 80px 0; }
        .screenshots-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
        .screenshot { background: white; padding: 1rem; border-radius: 16px; box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08); transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .screenshot:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(0,0,0,0.12); }
        .screenshot img { width: 100%; height: auto; border-radius: 12px; display: block; }
        .screenshot h4 { margin-top: 0.75rem; font-size: 1rem; font-weight: 600; color: #2c3e50; text-align: center; }
        .screenshot p { margin-top: 0.25rem; font-size: 0.9rem; color: #475569; text-align: center; }

        /* Lightbox */
        .lightbox { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); display: flex; align-items: center; justify-content: center; z-index: 9999; }
        .lightbox-content { max-width: 96vw; max-height: 90vh; color: #e2e8f0; }
        .lightbox-img { max-width: 96vw; max-height: 70vh; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.4); display: block; margin: 0 auto; }
        .lightbox-caption { margin-top: 12px; text-align: center; }
        .lightbox-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
        .lb-btn { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); padding: 10px 14px; border-radius: 9999px; cursor: pointer; }
        .app-highlights { background: #2c3e50; color: white; padding: 80px 0; }
        .highlights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
        .highlight { text-align: center; padding: 2rem; }
        .highlight-number { font-size: 3rem; font-weight: 800; color: #ff6b6b; margin-bottom: 1rem; }
        .download { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 0; text-align: center; color: white; }
        .download h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem; }
        footer { background: #1a1a1a; color: white; padding: 40px 0; text-align: center; }
        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem; }
          .hero p { font-size: 1.1rem; }
          .cta-buttons { flex-direction: column; align-items: center; }
          .nav-links { display: none; }
        }
      `}</style>

      <header>
        <nav className="container">
          <div className="logo">
            <img className="logo-img" src="/checkliotasks/logo.jpg" alt="Checklio Tasks Logo" />
            Checklio Tasks
          </div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#screenshots">Screenshots</a></li>
            <li><a href="#download">Download</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <h1>Master Your Tasks, Elevate Your Life</h1>
          <p>Checklio Tasks is the intelligent task management app that transforms chaos into clarity. Organize, prioritize, and accomplish your goals with smart suggestions and intuitive planning.</p>
          <div className="cta-buttons">
            <a href="#" onClick={handleComingSoon} className="btn btn-primary">Download Now</a>
            <a href="#features" className="btn btn-secondary">Explore Features</a>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Powerful Features for Peak Productivity</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #ff6b6b, #ffa500)' }}>🎯</div>
              <h3>Smart Task Prioritization</h3>
              <p>Color-coded priority system (Low, Medium, High) helps you focus on what matters most. Never miss a deadline with intelligent task sorting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #4ecdc4, #44a08d)' }}>💡</div>
              <h3>AI-Powered Suggestions</h3>
              <p>Get daily wisdom and personalized task recommendations. Our "Lunch & Learn" feature combines productivity with personal growth.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>📅</div>
              <h3>Weekly Planning System</h3>
              <p>Organize your entire week with dedicated sections for weekdays and weekends. Plan task sets for maximum efficiency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #ffa726, #fb8c00)' }}>⭐</div>
              <h3>Task Favoriting</h3>
              <p>Mark important tasks with stars for quick access. Create your personal priority system with visual indicators.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #26a69a, #00897b)' }}>📝</div>
              <h3>Integrated Notes</h3>
              <p>Seamlessly switch between tasks and notes. Capture ideas, meeting notes, and important information in one place.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'linear-gradient(45deg, #ab47bc, #8e24aa)' }}>🔐</div>
              <h3>Advanced Security</h3>
              <p>Biometric authentication and app lock features keep your sensitive tasks and information completely secure.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="screenshots" id="screenshots">
        <div className="container">
          <h2 className="section-title">See Checklio Tasks in Action</h2>
          <div className="screenshots-grid">
            {screenshots.map((shot, idx) => (
              <div key={idx} className="screenshot" onClick={() => setLightboxIdx(idx)}>
                <img src={shot.src} alt={shot.title} />
                <h4>{shot.title}</h4>
                <p>{shot.desc}</p>
              </div>
            ))}
          </div>
          {lightboxIdx !== null && (
            <div className="lightbox" onClick={() => setLightboxIdx(null)}>
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img className="lightbox-img" src={screenshots[lightboxIdx].src} alt={screenshots[lightboxIdx].title} />
                <div className="lightbox-caption">
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{screenshots[lightboxIdx].title}</div>
                  <div style={{ opacity: 0.9 }}>{screenshots[lightboxIdx].desc}</div>
                </div>
                <div className="lightbox-controls">
                  <button className="lb-btn" onClick={() => setLightboxIdx((lightboxIdx + screenshots.length - 1) % screenshots.length)}>Prev</button>
                  <button className="lb-btn" onClick={() => setLightboxIdx(null)}>Close</button>
                  <button className="lb-btn" onClick={() => setLightboxIdx((lightboxIdx + 1) % screenshots.length)}>Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="app-highlights">
        <div className="container">
          <h2 className="section-title" style={{ color: 'white' }}>Why Choose Checklio Tasks?</h2>
          <div className="highlights-grid">
            <div className="highlight">
              <div className="highlight-number">🏆</div>
              <h3>Premium Experience</h3>
              <p>Ad-free premium version available for distraction-free productivity</p>
            </div>
            <div className="highlight">
              <div className="highlight-number">🔔</div>
              <h3>Smart Notifications</h3>
              <p>Priority-based alarms and customizable notification system</p>
            </div>
            <div className="highlight">
              <div className="highlight-number">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Clean, intuitive interface with smooth animations and transitions</p>
            </div>
            <div className="highlight">
              <div className="highlight-number">🌙</div>
              <h3>Dark Mode</h3>
              <p>Eye-friendly dark theme for comfortable use in any lighting</p>
            </div>
          </div>
        </div>
      </section>

      <section className="download" id="download">
        <div className="container">
          <h2>Ready to Transform Your Productivity?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Download Checklio Tasks today and experience the perfect blend of simplicity and power in task management.</p>
          <div className="cta-buttons">
            <a href="#" onClick={handleComingSoon} className="btn btn-primary">Download for Android</a>
            <a href="#" onClick={handleComingSoon} className="btn btn-secondary">Download for iOS</a>
          </div>
          <p style={{ marginTop: '2rem', opacity: 0.8 }}>Available on Google Play Store and Apple App Store</p>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2024 Rudnex. All rights reserved. | Checklio Tasks - Smart Task Management</p>
          <p style={{ marginTop: '1rem' }}>Visit us at <a href="https://rudnex.com" style={{ color: '#ff6b6b' }}>rudnex.com</a></p>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          });
        });

        window.addEventListener('scroll', () => {
          const header = document.querySelector('header');
          if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
          } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
          }
        });

        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        }, observerOptions);

        document.querySelectorAll('.feature-card, .screenshot').forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          observer.observe(card);
        });
      ` }} />
    </div>
  )
}


