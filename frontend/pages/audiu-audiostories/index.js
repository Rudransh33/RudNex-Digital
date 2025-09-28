import Head from 'next/head'

export default function AudiuAudioStories() {
  return (
    <div>
      <Head>
        <title>Audiu - Audiu Stories | Rudnex</title>
        <meta name="description" content="Audiu by Rudnex – a modern audio story streaming app. Explore trending, romance, horror, and NKU universe stories." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Audiu - Audiu Stories",
            "url": "https://rudnex.com/audiu-audiostories",
            "publisher": {"@type": "Organization", "name": "Rudnex"},
            "inLanguage": "en"
          })
        }} />
      </Head>

      <style jsx global>{`
        :root {
          --bg: #000;
          --surface: #121212;
          --card: #181818;
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
          font-family: Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
        }
        a {
          color: var(--accent);
          text-decoration: none;
        }
        header {
          position: sticky;
          top: 0;
          background: rgba(0,0,0,.7);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border);
          z-index: 10;
        }
        .container {
          max-width: 1000px;
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
          letter-spacing: .4px;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 6px rgba(255,45,85,.2);
        }
        h1 {
          font-size: 2.2rem;
          margin: 0 0 6px;
        }
        h2 {
          font-size: 1.35rem;
          margin: 26px 0 10px;
        }
        p {
          line-height: 1.75;
          color: #e8e8e8;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          margin-bottom: 20px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 18px;
        }
        .story-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 16px;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .story-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(255,45,85,.2);
        }
        .story-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0 0 6px;
        }
        .story-meta {
          font-size: .9rem;
          color: var(--muted);
        }
        footer {
          border-top: 1px solid var(--border);
          margin-top: 32px;
          padding: 16px 0;
          color: var(--muted);
          font-size: .9rem;
          text-align: center;
        }
        .story-card a {
          padding: 0;
          overflow: hidden;
          display: block;
        }
        .story-card img {
          width: 100%;
          height: 340px;
          object-fit: cover;
          display: block;
        }
        .story-card > div {
          padding: 14px;
        }
      `}</style>

      <header>
        <div className="container">
          <nav>
            <div className="brand">
              <span className="dot"></span> Audiu - Audiu Stories
            </div>
            <div style={{display: 'flex', gap: '14px'}}>
              <a href="/audiu-privacy">Privacy Policy</a>
              <a href="#categories">Categories</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <h1>Welcome to Audiu Stories</h1>
          <p>
            Audiu is Rudnex's audio‑story streaming platform, built with Flutter and powered by a secure PocketBase backend. We bring you immersive short audio dramas, serialized fiction, and original storytelling in a sleek, dark‑themed player.
          </p>
        </section>

        <section id="featured" className="card">
          <h2>Featured Stories</h2>
          <div className="grid">
            <div className="story-card">
              <a href="audiu://story/adheera-the-born-king">
                <img src="/audiu-audiostories/Adheera.jpg" alt="Adheera: The Born King" />
                <div>
                  <div className="story-title">Adheera: The Born King</div>
                  <div className="story-meta">Mythological • NKU Universe</div>
                </div>
              </a>
            </div>
            <div className="story-card">
              <a href="audiu://story/adhuri-kahaani-humari">
                <img src="/audiu-audiostories/AKH%20Thumbnail.jpg" alt="Adhuri Kahaani Humaari" />
                <div>
                  <div className="story-title">Adhuri Kahaani Humaari</div>
                  <div className="story-meta">Horror • Supernatural</div>
                </div>
              </a>
            </div>
            <div className="story-card">
              <a href="audiu://story/alvida-ishq">
                <img src="/audiu-audiostories/Alvida%20ishq.jpg" alt="Alvida Ishq" />
                <div>
                  <div className="story-title">Alvida Ishq</div>
                  <div className="story-meta">Romance • Drama</div>
                </div>
              </a>
            </div>
            <div className="story-card">
              <a href="audiu://story/chandangarh-ki-daayan">
                <img src="/audiu-audiostories/CKD.jpg" alt="Chandangarh Ki Daayan" />
                <div>
                  <div className="story-title">Chandangarh Ki Daayan</div>
                  <div className="story-meta">Horror • Mystery</div>
                </div>
              </a>
            </div>
            <div className="story-card">
              <a href="audiu://story/hum-11-anuvardhara">
                <img src="/audiu-audiostories/Hum%2011%20Anuvardhara.jpg" alt="Hum 11: The Mystery of Anuvardhara" />
                <div>
                  <div className="story-title">Hum 11: The Mystery of Anuvardhara</div>
                  <div className="story-meta">Sci‑Fi • Adventure</div>
                </div>
              </a>
            </div>
            <div className="story-card">
              <a href="audiu://story/miley-na-miley-hum">
                <img src="/audiu-audiostories/MNMH.jpg" alt="Miley Na Miley Hum" />
                <div>
                  <div className="story-title">Miley Na Miley Hum</div>
                  <div className="story-meta">Romance • Reborn Love Story</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section id="categories" className="card">
          <h2>Popular Categories</h2>
          <div className="grid">
            <div className="story-card">
              <div className="story-title">🔥 Trending Now</div>
              <div className="story-meta">The most popular stories this week</div>
            </div>
            <div className="story-card">
              <div className="story-title">💖 Romance</div>
              <div className="story-meta">Love stories & heartfelt audio dramas</div>
            </div>
            <div className="story-card">
              <div className="story-title">👻 Horror</div>
              <div className="story-meta">Spine‑chilling tales & dark thrillers</div>
            </div>
            <div className="story-card">
              <div className="story-title">🌌 NKU Universe</div>
              <div className="story-meta">Epic sagas from the Navedh Kingdom Universe</div>
            </div>
            <div className="story-card">
              <div className="story-title">⭐ New Releases</div>
              <div className="story-meta">Freshly uploaded stories from creators</div>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Why Audiu?</h2>
          <ul>
            <li>Stream or download stories for offline listening</li>
            <li>Background playback with mini‑player and queue</li>
            <li>Secure dual authentication (email/password + Google)</li>
            <li>Favorites, playlists, and personal history sync</li>
            <li>Optimized for Android with minimal permissions</li>
          </ul>
        </section>

        <section id="contact" className="card">
          <h2>Contact</h2>
          <p>Have questions or story submissions? Email us at <a href="mailto:contact@rudnex.com">contact@rudnex.com</a></p>
        </section>
      </main>

      <footer>
        <div>© {new Date().getFullYear()} Rudnex. All rights reserved.</div>
      </footer>
    </div>
  )
}
