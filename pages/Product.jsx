import Footer from '../components/Footer.jsx'
import styles from './Product.module.css'

const features = [
  '24/7 monitoring and alerts',
  'Voice interaction and support',
  'Customizable care plans',
  'Remote access for family',
]

export default function Product() {
  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroLeft}>
          <span className="section-label">AlertRix — 2025</span>
          <h1 className={styles.heroTitle}>Precision<br />Reminders.</h1>
          <p className={styles.heroDesc}>
            We're solving the critical challenge of medication mismanagement among the elderly. AlertRix combines cutting-edge AI with intuitive voice architecture for seamless care.
          </p>
          <a href="#preorder" className={styles.ctaBtn}>View Pricing</a>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImgWrap}>
            <img src="/assets/product.png" alt="AlertRix Product" />
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className={styles.problem}>
        <div className={styles.problemInner}>
          <div className={styles.problemLeft}>
            <span className="section-label">Context</span>
            <h2 className={styles.sectionTitle}>The Problem</h2>
          </div>
          <div className={styles.problemRight}>
            <p className={styles.problemText}>
              Medication mismanagement is a widespread issue, particularly affecting seniors. It leads to adverse health outcomes, increased healthcare costs, and diminished quality of life for millions of families worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className={styles.videoSection}>
        <div className={styles.videoHeader}>
          <span className="section-label">The Solution</span>
          <h2 className={styles.sectionTitle}>AlertRix in Action</h2>
        </div>
        <div className={styles.videoWrap}>
          <video controls poster="/assets/poster.png" muted autoPlay loop>
            <source src="/assets/vid.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* PRICING */}
      <section className={styles.pricing} id="preorder">
        <span className="section-label">Availability</span>
        <h2 className={styles.sectionTitle}>Choose Your AlertRix</h2>

        <div className={styles.cards}>
          {/* Standard */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Standard</h3>
              <span className={styles.cardTag}>One-time payment</span>
            </div>
            <ul className={styles.cardFeatures}>
              {[...features, 'Limited health report uploads', 'Chatbot — limited'].map(f => (
                <li key={f}><i className="fas fa-plus" /><span>{f}</span></li>
              ))}
            </ul>
            <a href="/order" className={styles.cardCta}>Pre-Order Now</a>
          </div>

          {/* Premium */}
          <div className={`${styles.card} ${styles.cardPremium}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Premium</h3>
              <span className={styles.cardBadge}>RECOMMENDED</span>
            </div>
            <span className={styles.cardTag}>One-time payment</span>
            <ul className={styles.cardFeatures}>
              {[...features, 'Weekly summarizations', 'Health reports — unlimited', 'Chatbot — unlimited'].map(f => (
                <li key={f}><i className="fas fa-plus" /><span>{f}</span></li>
              ))}
            </ul>
            <a href="/order" className={`${styles.cardCta} ${styles.cardCtaWhite}`}>Pre-Order Now</a>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section className={styles.waitlist}>
        <span className="section-label">Queue</span>
        <h2 className={styles.sectionTitle}>Join Waiting List</h2>
        <p className={styles.waitlistSub}>Be the first to know when the next batch is released.</p>
        <div className={styles.waitlistForm}>
          <input type="email" placeholder="your@email.com" className={styles.waitlistInput} />
          <button className={styles.waitlistBtn}>Join</button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
