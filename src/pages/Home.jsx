import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animate, stagger } from 'animejs'
import { useTextReveal, useMagneticHover, useStaggerOnScroll } from '../hooks/useAnime.js'
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
  const containerRef = useRef(null)
  const heroVidRef = useRef(null)
  const appVidRef = useRef(null)
  const heroBgRef = useRef(null)
  const videoWrapRef = useRef(null)
  const svgLineRef = useRef(null)

  // Anime.js hooks
  const introHeadingRef = useTextReveal({ delay: 200, duration: 1400, staggerDelay: 25, easing: 'easeOutExpo' })
  const ctaBtnRef = useMagneticHover(0.25)
  const statsContainerRef = useStaggerOnScroll('[data-stat]', {
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.95, 1],
    delay: stagger(120, { start: 100 }),
    duration: 1000,
    ease: 'outExpo'
  })
  const galleryContainerRef = useStaggerOnScroll('[data-gallery-item]', {
    opacity: [0, 1],
    translateY: [60, 0],
    scale: [0.92, 1],
    delay: stagger(180, { start: 200 }),
    duration: 1200,
    ease: 'outCubic'
  })

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

  // Hero SVG line draw on load
  useEffect(() => {
    if (svgLineRef.current) {
      const paths = svgLineRef.current.querySelectorAll('path, line, circle')
      paths.forEach(p => {
        const len = p.getTotalLength ? p.getTotalLength() : 100
        p.style.strokeDasharray = len
        p.style.strokeDashoffset = len
      })
      animate(paths, {
        strokeDashoffset: [function(el) { return el.getTotalLength ? el.getTotalLength() : 100 }, 0],
        opacity: [0, 0.6],
        duration: 2800,
        delay: stagger(200, { start: 800 }),
        ease: 'inOutQuart'
      })
    }
  }, [])

  // Anime.js hover effect for gallery images
  useEffect(() => {
    const items = document.querySelectorAll(`.${styles.galleryImgWrap}`)
    items.forEach(item => {
      const img = item.querySelector('img')
      if (!img) return

      item.addEventListener('mouseenter', () => {
        animate(img, {
          scale: 1.08,
          filter: 'brightness(1)',
          duration: 800,
          ease: 'outExpo'
        })
      })

      item.addEventListener('mouseleave', () => {
        animate(img, {
          scale: 1,
          filter: 'brightness(0.85)',
          duration: 1000,
          ease: 'outExpo'
        })
      })
    })
  }, [])

  useGSAP(() => {
    // Parallax on hero background
    gsap.to(heroBgRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: `.${styles.hero}`,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Hero initial reveal
    const tl = gsap.timeline()
    tl.from(`.${styles.heroTitle} span`, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    })
    tl.from(`.${styles.heroTop}, .${styles.heroSub}, .${styles.heroBottom}`, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=1')

    // Video expansion effect
    if (videoWrapRef.current) {
      gsap.fromTo(videoWrapRef.current, 
        { scale: 0.8, borderRadius: '20px' },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: videoWrapRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: true
          }
        }
      )
    }

    // Fade up generic sections
    gsap.utils.toArray('.gsap-fade-up').forEach(el => {
      gsap.from(el, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      })
    })

  }, { scope: containerRef })

  return (
    <main className={styles.page} ref={containerRef}>

      {/* ── HERO ──────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img ref={heroBgRef} src="/main.jpg" alt="" aria-hidden="true" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>

        {/* Decorative SVG line art */}
        <svg ref={svgLineRef} className={styles.heroSvg} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="160" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <path d="M200 40 L360 200 L200 360 L40 200 Z" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
        </svg>

        <div className={styles.heroInner}>
          <div className={styles.heroTopGroup}>
            <div className={styles.heroTop}>
              <span className="eyebrow eyebrow--accent">
                AI-Powered Care System — Est. 2025
              </span>
            </div>

            <div className={styles.heroCenter}>
              <h1 className={styles.heroTitle}>
                <span>ALERT</span>
                <span className={styles.heroTitleDim}>RIX</span>
              </h1>
              <p className={styles.heroSub}>
                Smart Alerts, &nbsp; Save Doses{tick % 2 === 0 ? '\u258c' : '\u00a0'}
              </p>
            </div>
          </div>

          <div className={styles.heroBottom}>
            <Link to="/product" className="btn-primary" ref={ctaBtnRef} data-cursor-hover>
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
          <div className="gsap-fade-up">
            <span className="eyebrow">The Vision</span>
            <h2 ref={introHeadingRef} className={styles.sectionHeading} style={{ marginTop: '14px' }}>
              Intelligence for the ones you love.
            </h2>
          </div>
          <div className={`${styles.introText} gsap-fade-up`}>
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
        <div ref={videoWrapRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
          <video
            ref={heroVidRef}
            className={styles.videoEl}
            muted playsInline loop
            poster="/poster.png"
          >
            <source src="/EXPLA.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`${styles.videoCaption} gsap-fade-up`}>
          <span className="eyebrow">Overview</span>
          <h2 className={styles.videoTitle}>
            The Future of<br /><span className={styles.videoTitleDim}>Medication Care</span>
          </h2>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────── */}
      <section className={styles.stats} ref={statsContainerRef}>
        {stats.map((s, i) => (
          <div key={s.value} className={styles.stat} data-stat style={{ opacity: 0 }}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── GALLERY ───────────────────────────────── */}
      <section className={styles.gallery}>
        <div className={`${styles.galleryHeader} gsap-fade-up`}>
          <span className="eyebrow">Product Gallery</span>
          <h2 className={styles.galleryTitle}>Explore</h2>
        </div>
        <div className={styles.galleryGrid} ref={galleryContainerRef}>
          {gallery.map((item, i) => (
            <div key={item.num} className={styles.galleryItem} data-gallery-item style={{ opacity: 0 }}>
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
        <div className={`${styles.appText} gsap-fade-up`}>
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
        <div className={`${styles.appVideoWrap} gsap-fade-up`}>
          <video ref={appVidRef} muted playsInline loop poster="/poster2.png" className={styles.appVideo}>
            <source src="/app.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────── */}
      <section className={styles.ctaBand}>
        <div className={`${styles.ctaBandInner} gsap-fade-up`}>
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
