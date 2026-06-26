import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { animate, stagger } from 'animejs'
import { useTextReveal, useStaggerOnScroll } from '../hooks/useAnime.js'
import Footer from '../components/Footer.jsx'
import styles from './About.module.css'

const team = [
  { name: 'Shamra M', role: 'Firmware Lead', img: '/P1.png', initials: 'SM' },
  { name: 'Sithuli S', role: 'Design Lead', img: '/s.png', initials: 'SS' },
  { name: 'Humaid R', role: 'Development Lead', img: '/h.png', initials: 'HR' },
  { name: 'Thivina H', role: 'Mechanical Lead', img: '/t.png', initials: 'TH' },
  { name: 'Lakshan T', role: 'Hardware Lead', img: '/l.png', initials: 'LT' },
  { name: 'Bhadrash C', role: 'Frontend Lead', img: '/P1.png', initials: 'BC' },
]

const values = [
  { title: 'Precision', desc: 'Every reminder, every alert — calibrated to the second.' },
  { title: 'Compassion', desc: 'Technology built around people, not parameters.' },
  { title: 'Reliability', desc: 'Uninterrupted care, day and night, rain or shine.' },
  { title: 'Innovation', desc: "Continuously evolving to meet tomorrow's challenges." },
]

export default function About() {
  const containerRef = useRef(null)
  const missionHeadingRef = useTextReveal({ delay: 100, duration: 1000, staggerDelay: 35, easing: 'easeOutExpo' })
  const valuesGridRef = useStaggerOnScroll('[data-value-card]', {
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.96, 1],
    delay: stagger(100, { start: 150 }),
    duration: 1000,
    ease: 'outCubic'
  })
  const teamGridRef = useStaggerOnScroll('[data-member]', {
    opacity: [0, 1],
    translateY: [40, 0],
    delay: stagger(80, { start: 100 }),
    duration: 900,
    ease: 'outExpo'
  })

  // Anime.js hover effect on team member avatars
  useEffect(() => {
    const members = document.querySelectorAll(`.${styles.member}`)
    members.forEach(member => {
      const ava = member.querySelector(`.${styles.memberAva}`)
      if (!ava) return

      member.addEventListener('mouseenter', () => {
        animate(ava, {
          scale: 1.05,
          rotate: '2deg',
          duration: 500,
          ease: 'outExpo'
        })
      })

      member.addEventListener('mouseleave', () => {
        animate(ava, {
          scale: 1,
          rotate: '0deg',
          duration: 700,
          ease: 'outElastic(1, .6)'
        })
      })
    })
  }, [])

  // Logo pulse animation
  useEffect(() => {
    const logo = document.querySelector(`.${styles.logoCircle}`)
    if (!logo) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animate(logo, {
          scale: [0.8, 1],
          opacity: [0, 1],
          rotate: ['15deg', '0deg'],
          duration: 1600,
          ease: 'outElastic(1, .5)'
        })
        observer.disconnect()
      }
    }, { threshold: 0.3 })

    observer.observe(logo)
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
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
    tl.from(`.${styles.heroLeft} > *:not(.${styles.heroTitle}), .${styles.heroRight}`, {
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

    // Mission/Vision stagger
    gsap.from(`.${styles.mvCard}`, {
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: `.${styles.mv}`,
        start: 'top 85%',
      }
    })

  }, { scope: containerRef })

  return (
    <main className={styles.page} ref={containerRef}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <span className="eyebrow eyebrow--accent">AlertRix — Since 2025</span>
            <h1 className={styles.heroTitle}>
              <span>ABOUT</span><br />
              <span className={styles.heroTitleDim}>US</span>
            </h1>
            <p className="body-text" style={{ marginTop: '24px', maxWidth: '420px' }}>
              AlertRix was founded in 2025 by a passionate multidisciplinary team who
              believed that advanced care technology should be available to every family —
              not just those in clinical settings.
            </p>
            <div className={styles.heroCtas}>
              <a href="/product#preorder" className="btn-primary">Get AlertRix</a>
              <a href="#mission" className="btn-ghost">Our Mission</a>
            </div>
            <div className={styles.heroTrust}>
              <span className={styles.stars}>★★★★★</span>
              <span className={styles.trustText}>4.9/5 caregiver rating</span>
              <span className={styles.bullet}>•</span>
              <span className={styles.trustText}>Trusted by 1k+ Families</span>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.logoCircle} style={{ opacity: 0 }}>
              <img src="/LOGO.png" alt="AlertRix" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────── */}
      <section className={styles.mv} id="mission">
        <div className={styles.mvCard}>
          <div className={styles.mvIcon}>🎯</div>
          <div className={styles.mvBody}>
            <span className="eyebrow">Our Purpose</span>
            <h2 ref={missionHeadingRef} className={styles.mvTitle}>Mission</h2>
            <p className="body-text" style={{ marginTop: '18px', maxWidth: '580px' }}>
              To leverage AI and precision engineering to improve the health and independence
              of seniors worldwide. We believe technology should be a quiet companion —
              always present, never intrusive.
            </p>
          </div>
        </div>

        <div className={`${styles.mvDivider} gsap-fade-up`} />

        <div className={styles.mvCard}>
          <div className={styles.mvIcon}>👁️</div>
          <div className={styles.mvBody}>
            <span className="eyebrow">Where We're Going</span>
            <h2 className={styles.mvTitle}>Vision</h2>
            <p className="body-text" style={{ marginTop: '18px', maxWidth: '580px' }}>
              A world where every senior lives with confidence, every caregiver finds peace
              of mind, and every family is protected by an intelligent, compassionate system
              that anticipates needs before they arise.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className={styles.values}>
        <div className={`${styles.valuesHeader} gsap-fade-up`}>
          <span className="eyebrow">What We Stand For</span>
          <h2 className={styles.valuesTitle}>Values</h2>
        </div>
        <div className={styles.valuesGrid} ref={valuesGridRef}>
          {values.map((v, i) => (
            <div key={v.title} className={styles.valueCard} data-value-card style={{ opacity: 0 }}>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────── */}
      <section className={styles.team}>
        <div className={`${styles.teamHeader} gsap-fade-up`}>
          <span className="eyebrow">The People</span>
          <h2 className={styles.valuesTitle}>Team</h2>
        </div>

        <div className={styles.teamGrid} ref={teamGridRef}>
          {team.map((member, i) => (
            <div key={i} className={styles.member} data-member style={{ opacity: 0 }}>
              <div className={styles.memberAva}>
                <img
                  src={member.img}
                  alt={member.name}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className={styles.memberInitials} style={{ display: 'none' }}>
                  {member.initials}
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
              <span className={styles.memberNum}>0{i + 1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT BAND ─────────────────────────────── */}
      <section className={`${styles.contact} gsap-fade-up`}>
        <div className={styles.contactInner}>
          <span className="eyebrow eyebrow--accent"><strong>Get in Touch</strong></span>
          <h2 className={styles.contactTitle}>
            Have Questions? <span className={styles.contactTitleDim}>Let's Talk.</span>
          </h2>
          <div className={styles.contactLinks}>
            <a href="mailto:nevoxioalertrix@gmail.com" className={styles.contactMailBtn}>
              Email →
            </a>
            <a href="https://www.instagram.com/alertrix.lk" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Instagram →
            </a>
            <a href="https://wa.me/+94750254442" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              WhatsApp →
            </a>
            <a href="https://linkedin.com/company/alertrix/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              LinkedIn →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
