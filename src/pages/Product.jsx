import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'
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
  return (
    <main className={styles.page}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className="eyebrow eyebrow--accent" data-reveal>AlertRix — 2025</span>
          <h1 className={styles.heroTitle} data-reveal data-delay="1">
            PRECISION<br /><span className={styles.heroTitleDim}>REMINDERS.</span>
          </h1>
          <p className="body-text" style={{ maxWidth: '400px', marginTop: '24px' }} data-reveal data-delay="2">
            We are solving medication mismanagement among the elderly — combining
            cutting-edge AI with a natural voice interface for seamless, proactive care.
          </p>
          <div className={styles.heroCtas} data-reveal data-delay="3">
            <a href="#preorder" className="btn-primary">View Pricing</a>
            <Link to="/features" className="btn-ghost">Explore Features →</Link>
          </div>
          <div className={styles.heroRule} data-reveal data-delay="4" />
          <p className={styles.heroNote} data-reveal data-delay="4">
            Limited pre-order batch available. Reserve yours now.
          </p>
        </div>
        <div className={styles.heroRight}>
          <img src="/product.png" alt="AlertRix Device" className={styles.heroImg} />
          <div className={styles.heroImgCaption}>AlertRix — Mk I</div>
        </div>
      </section>

      {/* ── CONTEXT ──────────────────────────────────── */}
      <section className={styles.context}>
        <div className={styles.contextInner}>
          <div data-reveal>
            <span className="eyebrow">The Problem</span>
            <h2 className={styles.contextTitle}>
              Medication<br /><span className={styles.contextTitleDim}>Mismanagement</span>
            </h2>
          </div>
          <div data-reveal="right" data-delay="2" className={styles.contextBody}>
            <p className="body-text">
              Across the world, seniors face a silent crisis: missed doses, incorrect timings,
              and unanticipated interactions. AlertRix was born from the need to change this —
              with quiet precision, intelligent awareness, and compassionate design.
            </p>
            <div className={styles.contextStats}>
              <div className={styles.contextStat}>
                <span className={styles.contextStatVal}>50%</span>
                <span className={styles.contextStatLb}>of seniors miss doses regularly</span>
              </div>
              <div className={styles.contextStat}>
                <span className={styles.contextStatVal}>125K</span>
                <span className={styles.contextStatLb}>annual deaths from non-adherence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ──────────────────────────────────────── */}
      <section className={styles.videoSection}>
        <div className={styles.videoHeader} data-reveal>
          <span className="eyebrow">The Solution</span>
          <h2 className={styles.videoTitle}>AlertRix <span className={styles.videoTitleDim}>in Action</span></h2>
        </div>
        <div className={styles.videoWrap}>
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
        <div className={styles.rotatingContent} data-reveal>
          <span className="eyebrow eyebrow--accent">One Device. Total Peace of Mind.</span>
          <h2 className={styles.rotatingTitle}>
            ENGINEERED<br /><span className={styles.rotatingTitleDim}>FOR LIFE.</span>
          </h2>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────── */}
      <section className={styles.pricing} id="preorder">
        <div className={styles.pricingHeader} data-reveal>
          <span className="eyebrow">Availability</span>
          <h2 className={styles.pricingTitle}>
            Choose Your<br /><span className={styles.pricingTitleDim}>AlertRix</span>
          </h2>
        </div>

        <div className={styles.pricingGrid}>
          {/* Standard */}
          <div className={styles.card} data-reveal data-delay="1">
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
          <div className={`${styles.card} ${styles.cardPremium}`} data-reveal data-delay="2">
            <div className={styles.cardBadge}>Recommended</div>
            <div className={styles.cardTop}>
              <h3 className={styles.cardName}>Premium</h3>
              <span className="eyebrow" style={{ marginTop: '8px', color: 'rgba(0,0,0,0.4)' }}>One-time payment</span>
            </div>
            <ul className={styles.cardList}>
              {[...included, ...premiumExtras].map(f => (
                <li key={f}>
                  <span className={styles.cardBullet}>+</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="mailto:alertrix.lk@gmail.com" className={`${styles.cardCta} ${styles.cardCtaDark}`}>
              Enquire Now →
            </a>
          </div>
        </div>
      </section>

      {/* ── WAITLIST ──────────────────────────────────── */}
      <section className={styles.waitlist} data-reveal>
        <div className={styles.waitlistInner}>
          <span className="eyebrow eyebrow--accent">Waitlist</span>
          <h2 className={styles.waitlistTitle}>
            Be First<br /><span className={styles.waitlistTitleDim}>to Know.</span>
          </h2>
          <p className="body-text" style={{ maxWidth: '360px', marginTop: '18px' }}>
            Secure your place for the next production batch.
          </p>
          <form className={styles.waitlistForm} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className={styles.waitlistInput} />
            <button type="submit" className={styles.waitlistBtn}>Join</button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
