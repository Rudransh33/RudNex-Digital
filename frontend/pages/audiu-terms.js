import Head from 'next/head'

export default function AudiuTerms() {
  return (
    <div>
      <Head>
        <title>Audiu – Terms of Service | Rudnex</title>
        <meta name="description" content="Terms of Service for the Audiu mobile application and Audiu Audio Stories by Rudnex." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="canonical" href="https://rudnex.com/audiu-terms" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Audiu – Terms of Service | Rudnex" />
        <meta property="og:description" content="Terms of Service for the Audiu mobile application and Audiu Audio Stories by Rudnex." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rudnex.com/audiu-terms" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TermsOfService",
            "name": "Audiu Terms of Service",
            "publisher": {"@type": "Person", "name": "Rudnex"},
            "inLanguage": "en",
            "url": "https://rudnex.com/audiu-terms",
            "dateModified": "2025-09-29"
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
        p{line-height:1.75;color:#ebebeb}
        .muted{color:var(--muted)}
        .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:20px;margin-bottom:20px}
        ul{padding-left:18px}
        .toc{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
        .pill{border:1px solid var(--border);border-radius:999px;padding:6px 10px;color:#ddd;font-size:.9rem;text-decoration:none}
        .pill:hover{background:var(--surface);color:var(--text)}
        footer{border-top:1px solid var(--border);margin-top:32px;padding:18px 0;color:var(--muted);text-align:center;font-size:.9rem}
      `}</style>

      <header role="banner" aria-label="Site header">
        <div className="container">
          <nav>
            <div className="brand"><span className="dot"></span> Audiu Terms of Service</div>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              <a className="pill" href="/audiu-audiostories">Back to Stories</a>
              <a className="pill" href="/audiu-audiostories/privacy">Privacy Policy</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container" role="main">
        <section className="card">
          <h1>Audiu – Terms of Service</h1>
          <p className="muted"><strong>Last updated:</strong> September 29, 2025</p>
          <div className="toc">
            <a className="pill" href="#acceptance">Acceptance of Terms</a>
            <a className="pill" href="#use">Use of the Service</a>
            <a className="pill" href="#accounts">Accounts & Registration</a>
            <a className="pill" href="#age">Age Requirements</a>
            <a className="pill" href="#content">Content & Intellectual Property</a>
            <a className="pill" href="#restrictions">User Responsibilities & Restrictions</a>
            <a className="pill" href="#termination">Termination</a>
            <a className="pill" href="#liability">Disclaimer & Limitation of Liability</a>
            <a className="pill" href="#changes">Changes to Terms</a>
            <a className="pill" href="#contact">Contact</a>
          </div>
        </section>

        <section id="acceptance" className="card">
          <h2>1. Acceptance of Terms</h2>
          <p>By downloading, installing, or using the Audiu mobile application or related services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the Service.</p>
        </section>

        <section id="use" className="card">
          <h2>2. Use of the Service</h2>
          <p>You may use Audiu only for personal, non-commercial purposes. You agree not to misuse the Service in ways that could harm the platform, other users, or violate applicable laws.</p>
        </section>

        <section id="accounts" className="card">
          <h2>3. Accounts & Registration</h2>
          <p>To access certain features, you must create an account with the following requirements:</p>
          <ul>
            <li><strong>Account Creation:</strong> You may register using email/password or Google Sign-In</li>
            <li><strong>Required Information:</strong> Name, surname, email, age, and country are mandatory</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials</li>
            <li><strong>Account Activity:</strong> You are responsible for all activities under your account</li>
            <li><strong>Accurate Information:</strong> You must provide truthful and complete information during registration</li>
          </ul>
        </section>

        <section id="age" className="card">
          <h2>4. Age Requirements & Verification</h2>
          <p>Audiu enforces strict age verification to comply with children's privacy laws:</p>
          <ul>
            <li><strong>Minimum Age:</strong> You must be at least 13 years old to use Audiu</li>
            <li><strong>Mandatory Verification:</strong> All users must verify their age during account creation</li>
            <li><strong>Enhanced Protection:</strong> Google Sign-In users must complete age verification before app access</li>
            <li><strong>No Bypass:</strong> Age verification cannot be skipped; attempting to navigate away will log you out</li>
            <li><strong>Account Termination:</strong> Accounts of users under 13 will be immediately terminated and data deleted</li>
            <li><strong>Parental Notice:</strong> Parents who discover their child under 13 has created an account should contact us immediately</li>
          </ul>
        </section>

        <section id="content" className="card">
          <h2>5. Content & Intellectual Property</h2>
          <ul>
            <li>All audio stories, text, images, and other media available on Audiu are protected by copyright and intellectual property laws.</li>
            <li>You may not copy, distribute, modify, or create derivative works without authorization.</li>
            <li>The Service does not currently support user-submitted content such as reactions or comments.</li>
          </ul>
        </section>

        <section id="restrictions" className="card">
          <h2>6. User Responsibilities & Restrictions</h2>
          <ul>
            <li>Do not attempt to reverse-engineer, hack, or disrupt the Service.</li>
            <li>Do not attempt to circumvent age verification or other security measures.</li>
            <li>Do not use automated systems or bots to access the Service.</li>
            <li>Do not share your account credentials with others.</li>
          </ul>
        </section>

        <section id="termination" className="card">
          <h2>6. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to Audiu if you violate these Terms or engage in harmful conduct.</p>
        </section>

        <section id="liability" className="card">
          <h2>7. Disclaimer & Limitation of Liability</h2>
          <p>Audiu is provided on an "as-is" and "as-available" basis. To the maximum extent permitted by law, Rudnex (the individual developer) disclaims all warranties and is not liable for damages arising from use of the Service.</p>
        </section>

        <section id="changes" className="card">
          <h2>8. Changes to Terms</h2>
          <p>We may update these Terms from time to time. The revised version will be posted with a new "Last updated" date. Continued use of the Service after changes means you accept the new Terms.</p>
        </section>

        <section id="contact" className="card">
          <h2>9. Contact</h2>
          <p><strong>Email:</strong> <a href="mailto:contact@rudnex.com">contact@rudnex.com</a><br/>
          <strong>Operator:</strong> Individual Developer (Rudnex)<br/>
          <strong>Website:</strong> <a href="https://rudnex.com" target="_blank" rel="noopener noreferrer">https://rudnex.com</a></p>
        </section>

        <section id="about" className="card">
          <h2>10. About the Developer</h2>
          <p>This Service is developed and maintained by an <strong>individual developer</strong> under the name <strong>Rudnex</strong>. While not a registered company, Rudnex operates this app and its website to provide audio story streaming services with transparency and respect for user rights.</p>
          <p>Website: <a href="https://rudnex.com" target="_blank" rel="noopener noreferrer">https://rudnex.com</a></p>
        </section>
      </main>

      <footer>
        <div>© {new Date().getFullYear()} Rudnex. All rights reserved.</div>
      </footer>
    </div>
  )
}
