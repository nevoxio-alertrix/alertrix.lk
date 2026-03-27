import { useEffect, useRef } from 'react'
import Footer from '../components/Footer.jsx'
import styles from './Features.module.css'

const features = [
  {
    title: 'Smart Voice Alerts',
    desc: 'Clear, personalized voice reminders for medication and appointments, ensuring timely adherence with natural-sounding alerts.',
    icon: '◎',
    img: '/assets/voicea.png',
  },
  {
    title: 'AI Chatbot Companion',
    desc: 'An interactive AI companion that provides companionship, answers questions, and offers support throughout the day.',
    icon: '◈',
    img: '/assets/aichatbot.png',
  },
  {
    title: 'Guardian Alerts',
    desc: 'Immediate notifications to guardians in case of missed medication or emergencies, ensuring prompt response and peace of mind.',
    icon: '◉',
    img: '/assets/alert.png',
  },
  {
    title: 'Smart Scheduling',
    desc: 'Flexible scheduling that adapts to individual routines and medication plans, optimizing adherence with intelligent reminders.',
    icon: '◫',
    img: '/assets/sch.png',
  },
  {
    title: 'Dual Power System',
    desc: 'Reliable power system with backup battery, ensuring continuous operation even during power outages for uninterrupted care.',
    icon: '◬',
    img: '/assets/acdc.png',
  },
  {
    title: 'Future-Ready Upgrades',
    desc: 'Regular software updates and feature enhancements, keeping the device at the forefront of care technology.',
    icon: '◭',
    img: '/assets/updates.png',
  },
]

export default function Features() {
  const trackRef = useRef(null)

  // Duplicate cards for seamless scroll loop
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Clone all cards
    const clone = track.innerHTML
    track.innerHTML += clone
  }, [])

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <span className="section-label">AlertRix Functionalities</span>
          <h1 className={styles.heroTitle}>Key<br />Features</h1>
          <a href="#features" className={styles.heroCta}>
            Explore features ↓
          </a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <div className={styles.howText}>
            <span className="section-label">Process</span>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.howDesc}>
              AlertRix simplifies medication management for seniors and their caregivers. Our AI companion ensures timely reminders and tracks adherence, providing peace of mind and improved health outcomes.
            </p>
          </div>
          <div className={styles.howImg}>
            <img src="/assets/how.png" alt="AlertRix in action" />
          </div>
        </div>
      </section>

      {/* HOW VIDEO */}
      <section className={styles.videoSection}>
        <div className={styles.videoWrap}>
          <video controls poster="/assets/poster.png" muted autoPlay loop>
            <source src="/assets/HOW.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.featuresLayout}>
          {/* Sticky left label */}
          <div className={styles.featuresLeft}>
            <span className="section-label">Capabilities</span>
            <h2 className={styles.featuresTitle}>
              OUR KEY<br />
              <span className={styles.featuresTitleItalic}>FEATURES</span>
            </h2>
          </div>

          {/* Scrolling carousel */}
          <div className={styles.scroller}>
            <div className={styles.scrollTrack} ref={trackRef}>
              {features.map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <div className={styles.featureImgWrap}>
                    <img src={f.img} alt={f.title} loading="lazy" />
                    <div className={styles.featureIcon}>{f.icon}</div>
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
