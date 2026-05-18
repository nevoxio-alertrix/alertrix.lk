import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animate, stagger } from 'animejs'
import { useTextReveal, useStaggerOnScroll } from '../hooks/useAnime.js'
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
  const containerRef = useRef(null)
  const heroBgRef = useRef(null)
  const howHeadingRef = useTextReveal({ delay: 100, duration: 1200, staggerDelay: 30, easing: 'easeOutExpo' })
  const featGridRef = useStaggerOnScroll('[data-feat-card]', {
    opacity: [0, 1],
    translateY: [50, 0],
    scale: [0.95, 1],
    delay: stagger(120, { start: 150 }),
    duration: 1100,
    ease: 'outCubic'
  })

  // Anime.js hover for feature card images
  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.featCard}`)
    cards.forEach(card => {
      const imgWrap = card.querySelector(`.${styles.featImgWrap}`)
      const img = imgWrap?.querySelector('img')
      const num = card.querySelector(`.${styles.featNum}`)
      if (!img) return

      card.addEventListener('mouseenter', () => {
        animate(img, {
          scale: 1.06,
          filter: 'brightness(1.1)',
          duration: 600,
          ease: 'outExpo'
        })
        if (num) {
          animate(num, {
            opacity: [0.5, 1],
            scale: [1, 1.2],
            duration: 400,
            ease: 'outExpo'
          })
        }
      })

      card.addEventListener('mouseleave', () => {
        animate(img, {
          scale: 1,
          filter: 'brightness(0.9)',
          duration: 800,
          ease: 'outExpo'
        })
        if (num) {
          animate(num, {
            opacity: 0.5,
            scale: 1,
            duration: 500,
            ease: 'outExpo'
          })
        }
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
    tl.from(`.${styles.heroContent} > *:not(.${styles.heroTitle})`, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=1')

    // Fade up sections on scroll
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

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img ref={heroBgRef} src="/how.png" alt="" aria-hidden="true" className={styles.heroBgImg} style={{ height: '120%' }} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className="eyebrow eyebrow--accent">
            AlertRix Capabilities
          </span>
          <h1 className={styles.heroTitle} style={{ overflow: 'hidden' }}>
            <span style={{ display: 'inline-block' }}>KEY</span><br />
            <span className={styles.heroTitleDim} style={{ display: 'inline-block' }}>FEATURES</span>
          </h1>
          <a href="#features" className="btn-ghost"
            style={{ marginTop: '36px', display: 'inline-flex' }}>
            Explore below ↓
          </a>
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
          <div className={`${styles.videoWrap} gsap-fade-up`}>
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
