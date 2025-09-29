import Head from 'next/head'

export default function AudiuPrivacy() {
  return (
    <div>
      <Head>
        <title>Audiu – Privacy Policy | Rudnex</title>
        <meta name="description" content="Privacy Policy for the Audiu mobile application and Audiu Audio Stories by Rudnex. Learn what we collect, how we use it, and your rights." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="canonical" href="https://rudnex.com/audiu-audiostories/privacy" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Audiu – Privacy Policy | Rudnex" />
        <meta property="og:description" content="Privacy Policy for the Audiu mobile application and Audiu Audio Stories by Rudnex." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rudnex.com/audiu-audiostories/privacy" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PrivacyPolicy",
            "name": "Audiu Privacy Policy",
            "publisher": {"@type": "Person", "name": "Rudnex"},
            "inLanguage": "en",
            "url": "https://rudnex.com/audiu-audiostories/privacy",
            "dateModified": "2025-09-28"
          })
        }} />
      </Head>

      <style jsx global>{`
        :root{--bg:#000;--surface:#121212;--card:#181818;--text:#fff;--muted:#cfcfcf;--accent:#FF2D55;--border:#2a2a2a;--radius:16px;}
        *{box-sizing:border-box}
        body{margin:0;padding:0;background:var(--bg);color:var(--text);font-family:Montserrat,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif}
        a{color:var(--accent)}
        header{position:sticky;top:0;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);border-bottom:1px solid var(--border);z-index:10}
        .container{max-width:980px;margin:0 auto;padding:28px 18px}
        nav{display:flex;justify-content:space-between;align-items:center}
        .brand{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.4px}
        .dot{width:10px;height:10px;border-radius:999px;background:var(--accent);box-shadow:0 0 0 6px rgba(255,45,85,.2)}
        h1{font-size:2rem;margin:0 0 6px}
        h2{font-size:1.35rem;margin:26px 0 10px}
        h3{font-size:1.1rem;margin:18px 0 8px}
        p{line-height:1.75;color:#ebebeb}
        .muted{color:var(--muted)}
        .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:20px}
        ul{padding-left:18px}
        .toc{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
        .pill{border:1px solid var(--border);border-radius:999px;padding:6px 10px;color:#ddd;font-size:.9rem;text-decoration:none}
        .pill:hover{background:var(--surface);color:var(--text)}
        footer{border-top:1px solid var(--border);margin-top:32px;padding:18px 0;color:var(--muted);text-align:center;font-size:.9rem}
        code{background:#0f0f0f;padding:2px 6px;border-radius:8px;border:1px solid #242424}
      `}</style>

      <header role="banner" aria-label="Site header">
        <div className="container">
          <nav>
            <div className="brand"><span className="dot"></span> Audiu Privacy Policy</div>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              <a className="pill" href="/audiu-audiostories">Back to Stories</a>
              <a className="pill" href="#permissions">Permissions</a>
              <a className="pill" href="#rights">Your Rights</a>
              <a className="pill" href="#contact">Contact</a>
              <a className="pill" href="/audiu-terms">Terms of Service</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container" role="main">
        <section className="card">
          <h1>Audiu Privacy Policy</h1>
          <p className="muted"><strong>Last updated:</strong> September 28, 2025</p>
          <div className="toc">
            <a className="pill" href="#scope">Scope & Controller</a>
            <a className="pill" href="#collect">Information We Collect</a>
            <a className="pill" href="#use">How We Use Information</a>
            <a className="pill" href="#permissions">App Permissions (Android)</a>
            <a className="pill" href="#sharing">Sharing & Third Parties</a>
            <a className="pill" href="#security">Data Security</a>
            <a className="pill" href="#retention">Data Retention</a>
            <a className="pill" href="#rights">Your Rights</a>
            <a className="pill" href="#children">Children's Privacy</a>
            <a className="pill" href="#intl">International Users</a>
            <a className="pill" href="#changes">Changes</a>
            <a className="pill" href="#contact">Contact</a>
          </div>
        </section>

        <section id="scope" className="card">
          <h2>1. Scope & Data Controller</h2>
          <p>This Privacy Policy describes how <strong>Rudnex</strong> ("we", "us", or "our") collects, uses, and protects your information when you use the <strong>Audiu mobile application</strong>.</p>
          <p><strong>Data controller:</strong> Rudnex<br/>
          <strong>Contact:</strong> <a href="mailto:contact@rudnex.com">contact@rudnex.com</a></p>
        </section>

        <section id="collect" className="card">
          <h2>2. Information We Collect</h2>
          <h3>Mobile App Data</h3>
          <ul>
            <li><strong>Account Information:</strong> Email & credentials for account sign‑in (email/password or Google Sign‑In)</li>
            <li><strong>Profile Information:</strong> Name, email, optional avatar/profile image</li>
            <li><strong>Authentication Data:</strong> Session tokens for secure login</li>
            <li><strong>Usage Data:</strong> Listening history, playlists, favorites, and watch history</li>
            <li><strong>Offline Content:</strong> Optional offline downloads stored locally on your device</li>
            <li><strong>Technical Data:</strong> Crash/error logs (if reporting enabled in future updates)</li>
            <li><strong>Device Information:</strong> Basic device type and operating system for compatibility</li>
          </ul>
        </section>

        <section id="use" className="card">
          <h2>3. How We Use Information</h2>
          <ul>
            <li>Authenticate and manage user accounts</li>
            <li>Stream audio content and enable offline listening</li>
            <li>Sync playlists and favorites across devices</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Improve app features and user experience</li>
            <li>Ensure app security and prevent abuse</li>
          </ul>
        </section>

        <section id="permissions" className="card">
          <h2>4. App Permissions (Android)</h2>
          <p>Our app requests only essential permissions:</p>
          <ul>
            <li><strong>Internet/Network Access</strong> – Required for streaming audio and API access</li>
            <li><strong>Storage Permissions</strong> – For offline downloads (scoped storage on Android 13+)</li>
            <li><strong>Bluetooth</strong> – For seamless audio device connection and control</li>
            <li><strong>Notifications</strong> – For playback controls and download alerts</li>
            <li><strong>Background Services</strong> – For continuous audio playback while screen is off</li>
            <li><strong>Audio Focus</strong> – For smooth playback; ducks/pauses other audio (no special runtime permission)</li>
          </ul>
          <p><strong>We do NOT request:</strong></p>
          <ul>
            <li>Location access</li>
            <li>Contacts or phone numbers</li>
            <li>SMS or call logs</li>
            <li>Camera or microphone (except for optional voice reactions)</li>
            <li>Unnecessary file system access</li>
          </ul>
        </section>

        <section id="sharing" className="card">
          <h2>5. Sharing & Third‑Party Services</h2>
          <h3>Third‑Party Integrations</h3>
          <ul>
            <li><strong>PocketBase</strong>: Used for secure authentication and content storage</li>
            <li><strong>Google Sign‑In</strong>: Optional social login service</li>
            <li><strong>Google Fonts</strong>: For typography (no personal data collected)</li>
          </ul>
          <h3>Data Sharing Policy</h3>
          <ul>
            <li><strong>We never sell your personal information</strong></li>
            <li><strong>We never share your personal data with advertisers</strong></li>
            <li>Data disclosure occurs only to comply with legal requirements, protect our rights and prevent abuse, or provide essential app functionality</li>
          </ul>
        </section>

        <section id="security" className="card">
          <h2>6. Data Security</h2>
          <ul>
            <li><strong>HTTPS‑only transport</strong> for all network communications</li>
            <li><strong>Secure token and session management</strong></li>
            <li><strong>Minimal app permissions</strong> following principle of least privilege</li>
            <li><strong>Production‑grade error handling</strong> without exposing sensitive data</li>
            <li><strong>Encrypted local storage</strong> for sensitive information</li>
            <li><strong>Regular security updates</strong> and monitoring</li>
          </ul>
        </section>

        <section id="retention" className="card">
          <h2>7. Data Retention</h2>
          <ul>
            <li><strong>Account Data:</strong> Retained while your account is active</li>
            <li><strong>Usage Data:</strong> Stored to improve your experience and app functionality</li>
            <li><strong>Offline Downloads:</strong> Remain on your device until you delete them</li>
            <li><strong>Session Data:</strong> Automatically cleared when you log out</li>
            <li><strong>Deleted Accounts:</strong> Data removed within 30 days of account deletion</li>
          </ul>
          <p>You can request immediate deletion of your data by contacting us.</p>
        </section>

        <section id="rights" className="card">
          <h2>8. Your Rights</h2>
          <ul>
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Correct</strong> inaccurate information</li>
            <li><strong>Delete</strong> your account and data</li>
            <li><strong>Export</strong> your data (playlists, favorites, etc.)</li>
            <li><strong>Revoke</strong> Google Sign‑In access via your Google account settings</li>
            <li><strong>Opt‑out</strong> of optional features like crash reporting</li>
          </ul>
          <p><strong>Contact us at:</strong> <a href="mailto:contact@rudnex.com">contact@rudnex.com</a> for any data‑related requests.</p>
        </section>

        <section id="children" className="card">
          <h2>9. Children's Privacy</h2>
          <p>Audiu is intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If we become aware that we have collected data from a child under 13, we will delete it immediately.</p>
        </section>

        <section id="intl" className="card">
          <h2>10. International Users</h2>
          <p>Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.</p>
        </section>

        <section id="changes" className="card">
          <h2>11. Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will:</p>
          <ul>
            <li>Post the updated policy with a revised date</li>
            <li>Notify users of significant changes through the app</li>
            <li>Maintain previous versions for reference</li>
          </ul>
        </section>

        <section id="contact" className="card">
          <h2>12. Contact Information</h2>
          <p><strong>Email:</strong> <a href="mailto:contact@rudnex.com">contact@rudnex.com</a><br/>
          <strong>Operator:</strong> Individual Developer (Rudnex)<br/>
          <strong>App:</strong> Audiu – Audio Story Streaming</p>
        </section>

        <section id="about" className="card">
          <h2>13. About the Developer</h2>
          <p>This app is developed and maintained by an <strong>individual developer</strong> under the name <strong>Rudnex</strong>. While not a registered company, Rudnex operates this project and its website to provide audio story streaming services with care for user privacy and transparency.</p>
          <p>Website: <a href="https://rudnex.com" target="_blank" rel="noopener noreferrer">https://rudnex.com</a></p>
          <p>This application was built using AI-assisted development tools, including AI Cursor Agent, to accelerate and enhance the development process.</p>
        </section>
      </main>

      <footer>
        <div>© {new Date().getFullYear()} Individual Developer Rudnex. All rights reserved.</div>
      </footer>
    </div>
  )
}
