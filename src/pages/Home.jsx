import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import styles from './Home.module.css'

const gallery = [
  { src: '/1a.png', label: 'Front Elevation', num: '01' },
  { src: '/1b.png', label: 'Side Profile', num: '02' },
  { src: '/product.png', label: 'Detail View', num: '03' },
]

const stats = [
  { value: '24/7', label: 'Active Monitoring' },
  { value: '99%', label: 'Adherence Rate' },
  { value: '<1s', label: 'Alert Response' },
  { value: '2025', label: 'Year Founded' },
]

export default function Home() {
  const [tick, setTick] = useState(0)
  const heroVidRef = useRef(null)
  const appVidRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 530)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const v = e.target
        if (e.isIntersecting) v.play().catch(() => { })
        else v.pause()
      })
    }, { threshold: 0.3 })
    if (heroVidRef.current) io.observe(heroVidRef.current)
    if (appVidRef.current) io.observe(appVidRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <main className={styles.page}>

      {/* ── HERO ──────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/main.jpg" alt="" aria-hidden="true" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span className="eyebrow eyebrow--accent">
              AI-Powered Care System — Est. 2025
            </span>
          </div>

          <div className={styles.heroCenter}>
            <h1 className={styles.heroTitle}>
              ALERT<span className={styles.heroTitleDim}>RIX</span>
            </h1>
            <p className={styles.heroSub}>
              Smart Alerts, &nbsp; Save Doses{tick % 2 === 0 ? '\u258c' : '\u00a0'}
            </p>
          </div>

          <div className={styles.heroBottom}>
            <Link to="/product" className="btn-primary">
              Discover the Device
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/features" className="btn-ghost">
              Explore Capabilities
            </Link>
          </div>

          <div className={styles.scrollCue}>
            <span className={styles.scrollLine} />
            <span className="eyebrow" style={{ marginTop: '8px' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────── */}
      <section className={styles.intro}>
        <div className={styles.introInner}>
          <div data-reveal="left">
            <span className="eyebrow">The Vision</span>
            <h2 className={styles.sectionHeading} style={{ marginTop: '14px' }}>
              Intelligence for<br /><span className={styles.headingDim}>the ones you love.</span>
            </h2>
          </div>
          <div data-reveal="right" data-delay="2" className={styles.introText}>
            <p className="body-text">
              AlertRix is an AI-powered medication management companion that ensures
              elderly loved ones never miss a dose. Combining precision IoT hardware
              with a natural voice interface, it brings proactive care to every home.
            </p>
            <div className={styles.introRule} />
            <Link to="/about" className="btn-ghost" style={{ marginTop: '28px', display: 'inline-flex' }}>
              Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── VIDEO ────────────────────────────────── */}
      <section className={styles.videoFull}>
        <video
          ref={heroVidRef}
          className={styles.videoEl}
          muted playsInline loop
          poster="/poster.png"
        >
          <source src="/EXPLA.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoCaption}>
          <span className="eyebrow">Overview</span>
          <h2 className={styles.videoTitle} data-reveal data-delay="1">
            The Future of<br /><span className={styles.videoTitleDim}>Medication Care</span>
          </h2>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className={styles.stats}>
        {stats.map((s, i) => (
          <div key={s.value} className={styles.stat} data-reveal data-delay={i + 1}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── GALLERY ───────────────────────────────── */}
      <section className={styles.gallery}>
        <div className={styles.galleryHeader} data-reveal>
          <span className="eyebrow">Product Gallery</span>
          <h2 className={styles.galleryTitle}>Explore</h2>
        </div>
        <div className={styles.galleryGrid}>
          {gallery.map((item, i) => (
            <div key={item.num} className={styles.galleryItem} data-reveal data-delay={i + 1}>
              <div className={styles.galleryImgWrap}>
                <img src={item.src} alt={item.label} loading="lazy" />
              </div>
              <div className={styles.galleryMeta}>
                <span className={styles.galleryNum}>{item.num}</span>
                <span className="eyebrow" style={{ fontSize: '9px', marginBottom: 0 }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── APP VIDEO ─────────────────────────────── */}
      <section className={styles.appSection}>
        <div className={styles.appText} data-reveal>
          <span className="eyebrow">App Interface</span>
          <h2 className={styles.sectionHeading} style={{ marginTop: '16px' }}>
            Control at Your<br /><span className={styles.headingDim}>Fingertips</span>
          </h2>
          <p className="body-text" style={{ marginTop: '20px', maxWidth: '380px' }}>
            Manage schedules, review adherence reports, and receive guardian alerts
            — all from a beautiful mobile companion.
          </p>
          <Link to="/features" className="btn-ghost" style={{ marginTop: '36px', display: 'inline-flex' }}>
            See All Features →
          </Link>
        </div>
        <div className={styles.appVideoWrap} data-reveal="right" data-delay="2">
          <video ref={appVidRef} muted playsInline loop poster="/poster2.png" className={styles.appVideo}>
            <source src="/app.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────── */}
      <section className={styles.ctaBand}>
        <div className={styles.ctaBandInner} data-reveal>
          <span className="eyebrow eyebrow--accent"><strong>Reserve Yours Today</strong></span>
          <h2 className={styles.ctaBandTitle}>
            <span className={styles.ctaBandTitleDim}>AlertRix</span> 
          </h2>
          <Link to="/product#preorder" className={`btn-primary ${styles.ctaBandBtn}`}>
            Pre-Order Now →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
