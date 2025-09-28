import Head from 'next/head'
import Link from 'next/link'

export default function AudiuPrivacy() {
  return (
    <div>
      <Head>
        <title>Audiu – Privacy Policy | Rudnex</title>
        <meta name="description" content="Privacy Policy for the Audiu mobile app and website by Rudnex. Learn what we collect, how we use it, and your rights." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --bg: #000;
          --surface: #181818;
          --card: #121212;
          --text: #fff;
          --muted: #cfcfcf;
          --accent: #FF2D55;
          --border: #2a2a2a;
          --radius: 16px;
        }
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          background: var(--bg);
          color: var(--text);
          font-family: Montserrat, system-ui, sans-serif;
          line-height: 1.7;
        }
        header {
          position: sticky;
          top: 0;
          background: rgba(0,0,0,.75);
          border-bottom: 1px solid var(--border);
        }
        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 28px 18px;
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 1.1rem;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 6px rgba(255,45,85,.25);
        }
        h1, h2, h3 {
          margin-top: 0;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }
        h2 {
          font-size: 1.35rem;
          margin: 24px 0 10px;
        }
        h3 {
          font-size: 1.1rem;
          margin: 18px 0 8px;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 22px;
          margin-bottom: 18px;
        }
        .muted {
          color: var(--muted);
        }
        ul {
          padding-left: 20px;
        }
        a {
          color: var(--accent);
        }
        footer {
          border-top: 1px solid var(--border);
          padding: 22px 0;
          text-align: center;
          color: var(--muted);
          font-size: .9rem;
        }
      `}</style>

      <header>
        <div className="container">
          <nav>
            <div className="brand">
              <span className="dot"></span> Audiu Privacy Policy
            </div>
            <div>
              <Link href="/audiu-audiostories">Back to Stories</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h1>Privacy Policy</h1>
          <p className="muted">Last updated: September 28, 2025</p>
          <p>This Privacy Policy describes how <strong>Rudnex</strong> ("we", "us", or "our") collects, uses, and protects your information when you use the <strong>Audiu mobile application</strong> and the <strong>Audiu website</strong> (rudnex.com/audiu-audiostories and related pages).</p>
        </section>

        <section className="card">
          <h2>1) Scope & Data Controller</h2>
          <p>This Policy applies to both:</p>
          <ul>
            <li>The <strong>Audiu mobile app</strong> on Android</li>
            <li>The <strong>Audiu website</strong> on rudnex.com</li>
          </ul>
          <p>Data controller: Rudnex · Contact: <a href="mailto:contact@rudnex.com">contact@rudnex.com</a></p>
        </section>

        <section className="card">
          <h2>2) Information We Collect</h2>
          <h3>Mobile App</h3>
          <ul>
            <li>Email & credentials for account sign-in (email/password or Google Sign-In)</li>
            <li>Profile info (name, email, optional avatar)</li>
            <li>Session tokens for secure login</li>
            <li>Listening history, playlists, favorites</li>
            <li>Optional offline downloads stored on your device</li>
            <li>Crash/error logs (if reporting enabled later)</li>
          </ul>
          <h3>Website</h3>
          <ul>
            <li>Basic analytics (page views, referrers, device/browser type)</li>
            <li>Contact form submissions (name, email, message)</li>
            <li>No sensitive personal data is collected unless you choose to provide it</li>
          </ul>
        </section>

        <section className="card">
          <h2>3) How We Use Information</h2>
          <ul>
            <li>Authenticate and manage user accounts</li>
            <li>Stream audio and enable offline listening</li>
            <li>Sync playlists/favorites across devices</li>
            <li>Provide customer support and respond to inquiries</li>
            <li>Analyze site traffic and improve features</li>
          </ul>
        </section>

        <section className="card">
          <h2>4) App Permissions (Mobile)</h2>
          <ul>
            <li><strong>Internet/Network</strong> – streaming & API access</li>
            <li><strong>Storage</strong> – offline downloads (scoped storage on Android 13+)</li>
            <li><strong>Bluetooth</strong> – audio device connection</li>
            <li><strong>Notifications</strong> – playback & download alerts</li>
            <li><strong>Background services</strong> – audio playback while screen is off</li>
          </ul>
          <p className="muted">We do not request location, contacts, SMS, or call logs.</p>
        </section>

        <section className="card">
          <h2>5) Sharing & Third-Party Services</h2>
          <ul>
            <li><strong>PocketBase</strong>: authentication and content storage</li>
            <li><strong>Google Sign-In</strong>: optional social login</li>
            <li><strong>Analytics</strong>: limited, aggregate website usage metrics</li>
          </ul>
          <p>We never sell personal information. Disclosure occurs only to comply with law or protect rights.</p>
        </section>

        <section className="card">
          <h2>6) Data Security</h2>
          <ul>
            <li>HTTPS-only transport</li>
            <li>Secure token/session management</li>
            <li>Restricted permissions in the app</li>
          </ul>
        </section>

        <section className="card">
          <h2>7) Data Retention</h2>
          <p>We retain account data while active and delete upon request. Offline files remain on your device until removed. Website analytics data is stored only in aggregate form.</p>
        </section>

        <section className="card">
          <h2>8) Your Rights</h2>
          <p>You may request access, correction, or deletion of your data by emailing <a href="mailto:contact@rudnex.com">contact@rudnex.com</a>. You can also revoke Google Sign-In access via your Google account.</p>
        </section>

        <section className="card">
          <h2>9) Children</h2>
          <p>Audiu is intended for ages 13+. We do not knowingly collect data from children under 13.</p>
        </section>

        <section className="card">
          <h2>10) Changes</h2>
          <p>We may update this Policy periodically. Updates will be posted here with a revised date.</p>
        </section>

        <footer>
          © {new Date().getFullYear()} Rudnex. All rights reserved.
        </footer>
      </main>
    </div>
  )
}
