import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animate, stagger } from 'animejs'
import { useTextReveal, useMagneticHover, useStaggerOnScroll } from '../hooks/useAnime.js'
import Footer from '../components/Footer.jsx'
import styles from './Features.module.css'

const features = [
  {
    num: '01',
    title: 'Smart Voice Alerts',
    desc: 'Natural, personalised voice reminders ensure medication is never missed — even for those unfamiliar with smartphones.',
    img: '/voicea.png',
  },
  {
    num: '02',
    title: 'AI Chatbot Companion',
    desc: 'An always-on conversational companion for emotional support, health queries, and gentle daily check-ins.',
    img: '/aichatbot.png',
  },
  {
    num: '03',
    title: 'Guardian Alerts',
    desc: 'Immediate push notifications to family members and caregivers when schedules are missed or emergencies arise.',
    img: '/alert.png',
  },
  {
    num: '04',
    title: 'Smart Scheduling',
    desc: 'Adaptive routines that learn lifestyle patterns and optimise reminder timing for maximum adherence.',
    img: '/sch.png',
  },
  {
    num: '05',
    title: 'Dual Power System',
    desc: 'Built-in backup battery ensures uninterrupted care — even through prolonged power outages.',
    img: '/acdc.png',
  },
  {
    num: '06',
    title: 'Future-Ready Design',
    desc: 'Regular OTA updates keep AlertRix at the forefront of care technology, with no hardware changes required.',
    img: '/updates.png',
  },
]


export default function Features() {
  const [tick, setTick] = useState(0)
  const containerRef = useRef(null)
  const heroBgRef = useRef(null)
  const videoWrapRef = useRef(null)
  const svgLineRef = useRef(null)

  // Anime.js hooks
  const howHeadingRef = useTextReveal({ delay: 200, duration: 1400, staggerDelay: 25, easing: 'easeOutExpo' })
  const ctaBtnRef = useMagneticHover(0.25)
  const featGridRef = useStaggerOnScroll('[data-feat-card]', {
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.95, 1],
    delay: stagger(120, { start: 100 }),
    duration: 1000,
    ease: 'outExpo'
  })
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 530)
    return () => clearInterval(id)
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
          <img ref={heroBgRef} src="/features%20hero.png" alt="" aria-hidden="true" className={styles.heroBgImg} />
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
          <div className={styles.heroTop}>
            <span className="eyebrow eyebrow--accent">
              AI-Powered Care System — Est. 2025
            </span>
          </div>

          <div className={styles.heroCenter}>
            <h1 className={styles.heroTitle}>
              <span>KEY</span><br />
              <span className={styles.heroTitleDim}>FEATURES</span>
            </h1>
            <p className={styles.heroSub}>
              Smart Alerts, &nbsp; Save Doses{tick % 2 === 0 ? '\u258c' : '\u00a0'}
            </p>
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

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className={styles.how}>
        <div className={styles.howInner}>
          <div className={`${styles.howText} gsap-fade-up`}>
            <span className="eyebrow">Process</span>
            <h2 ref={howHeadingRef} className={styles.howTitle}>
              How It Works
            </h2>
            <p className="body-text" style={{ marginTop: '24px', maxWidth: '380px' }}>
              AlertRix simplifies medication management through an intelligent sequence of
              reminders, Guardian alerts, and real-time AI monitoring — working silently
              in the background so families can breathe easier.
            </p>
          </div>
          <div className={`${styles.howImg} gsap-fade-up`}>
            <img src="/how.png" alt="AlertRix in action" />
          </div>
        </div>
      </section>

      {/* ── HOW VIDEO ────────────────────────────────── */}
      <section className={styles.videoSection}>
        <div className={styles.videoInner}>
          <div className={`${styles.videoHeader} gsap-fade-up`}>
            <span className="eyebrow">Walkthrough</span>
            <h2 className={styles.videoTitle}>See it <span className={styles.videoTitleDim}>in Motion</span></h2>
          </div>
          <div className={`${styles.videoWrap} gsap-fade-up`} ref={videoWrapRef}>
            <video controls poster="/poster.png" muted autoPlay loop>
              <source src="/HOW.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── FEATURES LIST ────────────────────────────── */}
      <section className={styles.featList} id="features">
        <div className={`${styles.featListHeader} gsap-fade-up`}>
          <span className="eyebrow">Capabilities</span>
          <h2 className={styles.featListTitle}>Features</h2>
        </div>

        <div className={styles.featGrid} ref={featGridRef}>
          {features.map((f, i) => (
            <article
              key={f.num}
              className={styles.featCard}
              data-feat-card
              style={{ opacity: 0 }}
            >
              <div className={styles.featImgWrap}>
                <img src={f.img} alt={f.title} loading="lazy" />
                <span className={styles.featNum}>{f.num}</span>
              </div>
              <div className={styles.featBody}>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className={styles.cta}>
        <div className={`${styles.ctaInner} gsap-fade-up`}>
          <span className="eyebrow eyebrow--accent"><strong>Ready to Begin</strong></span>
          <h2 className={styles.ctaTitle}>
            Experience AlertRix <span className={styles.ctaTitleDim}>First-Hand</span>
          </h2>
          <div className={styles.ctaBtns}>
            <a href="/product#preorder" className="btn-primary">Pre-Order Now</a>
            <a href="/about" className="btn-ghost">Meet the Team →</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
