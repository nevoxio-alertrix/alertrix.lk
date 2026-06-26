import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animate, stagger } from 'animejs'
import { useTextReveal, useMagneticHover, useStaggerOnScroll } from '../hooks/useAnime.js'
import Footer from '../components/Footer.jsx'
import styles from './Product.module.css'

const included = [
  '24/7 AI-powered monitoring',
  'Natural voice interaction',
  'Customisable medication plans',
  'Guardian remote access',
  'Emergency alert dispatch',
]

const premiumExtras = [
  'Weekly health summary reports',
  'Unlimited cloud health uploads',
  'Priority guardian alerts',
  'Unlimited AI chatbot sessions',
]

export default function Product() {
  const containerRef = useRef(null)
  const heroBgRef = useRef(null)
  const svgLineRef = useRef(null)
  const contextHeadingRef = useTextReveal({ delay: 100, duration: 1200, staggerDelay: 28, easing: 'easeOutExpo' })
  const pricingBtnRef = useMagneticHover(0.2)
  const pricingContainerRef = useStaggerOnScroll('[data-price-card]', {
    opacity: [0, 1],
    translateY: [60, 0],
    scale: [0.94, 1],
    delay: stagger(200, { start: 200 }),
    duration: 1200,
    ease: 'outCubic'
  })

  // Animate context stat values on scroll
  useEffect(() => {
    const statEls = document.querySelectorAll(`.${styles.contextStatVal}`)
    if (!statEls.length) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(statEls, {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: stagger(150),
          duration: 1000,
          ease: 'outExpo'
        })
        observer.disconnect()
      }
    }, { threshold: 0.3 })

    const parent = statEls[0]?.closest('section')
    if (parent) observer.observe(parent)
    return () => observer.disconnect()
  }, [])

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

    // Hero entry animation
    const tl = gsap.timeline()
    tl.from(`.${styles.heroTitle} span`, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    })
    tl.from(`.${styles.heroTop}, .${styles.heroSub}, .${styles.heroBottom}, .${styles.heroTrust}`, {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.8')

    // Fade up sections
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
          <img ref={heroBgRef} src="/Product%20hero.png" alt="" aria-hidden="true" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>

        <svg ref={svgLineRef} className={styles.heroSvg} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="160" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="100" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <path d="M200 40 L360 200 L200 360 L40 200 Z" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
        </svg>

        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <span className="eyebrow eyebrow--accent"><strong>AlertRix — 2025</strong></span>
          </div>

          <div className={styles.heroCenter}>
            <h1 className={styles.heroTitle}>
              <span>PRECISION</span><br />
              <span className={styles.heroTitleDim}>REMINDERS</span>
            </h1>
            <p className={styles.heroSub}>
              AI-powered medication care for safer daily routines.
            </p>
          </div>

          <div className={styles.heroBottom}>
            <a href="#preorder" className="btn-primary" ref={pricingBtnRef} data-cursor-hover>View Pricing</a>
            <Link to="/features" className="btn-ghost">Explore Features →</Link>
          </div>

          <div className={styles.heroTrust}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.trustText}>4.9/5 Caregiver Rating</span>
            <span className={styles.bullet}>•</span>
            <span className={styles.trustText}>10k+ Doses Managed</span>
          </div>

          <div className={styles.scrollCue}>
            <span className={styles.scrollLine} />
            <span className="eyebrow" style={{ marginTop: '8px' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── CONTEXT ──────────────────────────────────── */}
      <section className={styles.context}>
        <div className={styles.contextInner}>
          <div className="gsap-fade-up">
            <span className="eyebrow">The Problem</span>
            <h2 ref={contextHeadingRef} className={styles.contextTitle}>
              Medication Mismanagement
            </h2>
          </div>
          <div className={`${styles.contextBody} gsap-fade-up`}>
            <p className="body-text">
              Across the world, seniors face a silent crisis: missed doses, incorrect timings,
              and unanticipated interactions. AlertRix was born from the need to change this —
              with quiet precision, intelligent awareness, and compassionate design.
            </p>
            <div className={styles.contextStats}>
              <div className={styles.contextStat}>
                <span className={styles.contextStatVal} style={{ opacity: 0 }}>50%</span>
                <span className={styles.contextStatLb}>of seniors miss doses regularly</span>
              </div>
              <div className={styles.contextStat}>
                <span className={styles.contextStatVal} style={{ opacity: 0 }}>125K</span>
                <span className={styles.contextStatLb}>annual deaths from non-adherence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ──────────────────────────────────────── */}
      <section className={styles.videoSection}>
        <div className={`${styles.videoHeader} gsap-fade-up`}>
          <span className="eyebrow">The Solution</span>
          <h2 className={styles.videoTitle}>AlertRix <span className={styles.videoTitleDim}>in Action</span></h2>
        </div>
        <div className={`${styles.videoWrap} gsap-fade-up`}>
          <video controls poster="/poster.png" muted loop autoPlay>
            <source src="/vid.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ── ROTATING VIDEO ──────────────────────────────── */}
      <section className={styles.rotatingSection}>
        <div className={styles.rotatingBg}>
          <video muted loop autoPlay playsInline className={styles.rotatingVideo}>
            <source src="/D_Rotating_Transition_Video_Generated.mp4" type="video/mp4" />
          </video>
          <div className={styles.rotatingOverlay} />
        </div>
        <div className={`${styles.rotatingContent} gsap-fade-up`}>
          <span className="eyebrow eyebrow--accent">One Device. Total Peace of Mind.</span>
          <h2 className={styles.rotatingTitle}>
            ENGINEERED<br /><span className={styles.rotatingTitleDim}>FOR LIFE.</span>
          </h2>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────── */}
      <section className={styles.pricing} id="preorder">
        <div className={`${styles.pricingHeader} gsap-fade-up`}>
          <span className="eyebrow"><strong>Availability</strong></span>
          <h2 className={styles.pricingTitle}>
            Choose Your<br /><span className={styles.pricingTitleDim}>AlertRix</span>
          </h2>
        </div>

        <div className={styles.pricingGrid} ref={pricingContainerRef}>
          {/* Standard */}
          <div className={styles.card} data-price-card style={{ opacity: 0 }}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardName}>Standard</h3>
              <span className="eyebrow" style={{ marginTop: '8px' }}>One-time payment</span>
            </div>
            <ul className={styles.cardList}>
              {[...included, 'Limited health uploads', 'Chatbot — limited access'].map(f => (
                <li key={f}>
                  <span className={styles.cardBullet}>+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="mailto:alertrix.lk@gmail.com" className={`btn-ghost ${styles.cardCta}`}>
              Enquire Now →
            </a>
          </div>

          {/* Premium */}
          <div className={`${styles.card} ${styles.cardPremium}`} data-price-card style={{ opacity: 0 }}>
            <div className={styles.cardBadge}>Recommended</div>
            <div className={styles.cardTop}>
              <h3 className={styles.cardName}>Premium</h3>
              <span className="eyebrow" style={{ marginTop: '8px', color: 'rgba(0,0,0,0.4)' }}>Device and Subscription</span>
            </div>
            <ul className={styles.cardList}>
              {[...included, ...premiumExtras].map(f => (
                <li key={f}>
                  <span className={styles.cardBullet}>+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="mailto:nevoxioalertrix@gmail.com" className={`${styles.cardCta} ${styles.cardCtaDark}`}>
              Enquire Now →
            </a>
          </div>
        </div>
      </section>

      {/* ── WAITLIST ──────────────────────────────────── */}
      <section className={`${styles.waitlist} gsap-fade-up`}>
        <div className={styles.waitlistInner}>
          <span className={styles.waitlistEyebrow}><strong>Waitlist</strong></span>
          <h2 className={styles.waitlistTitle}>
            Be First
            <br />
            <span className={styles.waitlistTitleDim}>to Know.</span>
          </h2>
          <p className={styles.waitlistBody}>
            Secure your place for the next production batch and get launch updates first.
          </p>
          <form className={styles.waitlistForm} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className={styles.waitlistInput} aria-label="Email address" />
            <button type="submit" className={styles.waitlistBtn}>Join Waitlist</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
