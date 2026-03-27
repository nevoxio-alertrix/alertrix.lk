import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer.jsx'
import styles from './Home.module.css'

const galleryItems = [
  { src: '/assets/1a.png', label: 'Front View' },
  { src: '/assets/1b.png', label: 'Side Profile' },
  { src: '/assets/1c.png', label: 'Detail' },
]

export default function Home() {
  const [tick, setTick] = useState(0)
  const videoRef = useRef(null)
  const video2Ref = useRef(null)

  // Blinking cursor effect
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 500)
    return () => clearInterval(id)
  }, [])

  // IntersectionObserver for video autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const v = entry.target.querySelector('video')
        if (!v) return
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      })
    }, { threshold: 0.4 })

    const sections = document.querySelectorAll('[data-video-section]')
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        {/* Background grid */}
        <div className={styles.heroGrid} />
        {/* Background product image */}
        <div className={styles.heroImg}>
          <img src="/assets/main.jpg" alt="" aria-hidden="true" />
        </div>

        <div className={styles.heroContent}>
          <span className={styles.heroTag}>
            <span className={styles.heroDot} />
            AI-POWERED CARE SYSTEM — 2025
          </span>

          <h1 className={styles.heroTitle}>
            ALERT<span className={styles.heroAccent}>RIX</span>
          </h1>

          <p className={styles.heroSub}>
            SMART ALERTS,&nbsp;&nbsp;SAVE DOSES{tick % 2 === 0 ? '▌' : ' '}
          </p>

          <div className={styles.heroCtas}>
            <Link to="/product" className={styles.ctaPrimary}>
              Discover More
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
            <Link to="/features" className={styles.ctaSecondary}>
              See Features
            </Link>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollText}>SCROLL</span>
        </div>
      </section>

      {/* VIDEO SECTION 1 */}
      <section className={styles.videoSection} data-video-section>
        <div className={styles.videoWrap}>
          <video ref={videoRef} muted loop playsInline poster="/assets/poster.png">
            <source src="/assets/EXPLA.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.videoOverlay}>
          <span className="section-label">OVERVIEW</span>
          <h2 className={styles.videoTitle}>The Future of <br />Medication Care</h2>
        </div>
      </section>

      {/* STATS ROW */}
      <section className={styles.statsRow}>
        {[
          { num: '24/7', label: 'Monitoring' },
          { num: '99%', label: 'Adherence rate' },
          { num: '<1s', label: 'Alert response' },
          { num: '∞', label: 'Peace of mind' },
        ].map(s => (
          <div key={s.num} className={styles.stat}>
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* VIDEO SECTION 2 – App demo */}
      <section className={styles.videoSectionSmall} data-video-section>
        <div className={styles.videoWrap}>
          <video ref={video2Ref} muted loop playsInline poster="/assets/poster2.png">
            <source src="/assets/app.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={styles.videoOverlay}>
          <span className="section-label">APP INTERFACE</span>
          <h2 className={styles.videoTitle}>Control At<br />Your Fingertips</h2>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.gallery}>
        <div className={styles.galleryHeader}>
          <span className="section-label">PRODUCT GALLERY</span>
          <h2 className={styles.galleryTitle}>EXPLORE</h2>
        </div>
        <div className={styles.galleryGrid}>
          {galleryItems.map((item, i) => (
            <div key={i} className={styles.galleryCard}>
              <div className={styles.galleryImgWrap}>
                <img src={item.src} alt={item.label} loading="lazy" />
              </div>
              <div className={styles.galleryInfo}>
                <span className={styles.galleryNum}>0{i + 1}</span>
                <span className={styles.galleryItemLabel}>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
