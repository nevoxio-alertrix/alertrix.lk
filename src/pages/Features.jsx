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
  return (
    <main className={styles.page}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/how.png" alt="" aria-hidden="true" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className="eyebrow eyebrow--accent" data-reveal>
            AlertRix Capabilities
          </span>
          <h1 className={styles.heroTitle} data-reveal data-delay="1">
            KEY<br /><span className={styles.heroTitleDim}>FEATURES</span>
          </h1>
          <a href="#features" className="btn-ghost" data-reveal data-delay="2"
            style={{ marginTop: '36px', display: 'inline-flex' }}>
            Explore below ↓
          </a>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className={styles.how}>
        <div className={styles.howInner}>
          <div className={styles.howText} data-reveal>
            <span className="eyebrow">Process</span>
            <h2 className={styles.howTitle}>
              How It<br /><span className={styles.howTitleDim}>Works</span>
            </h2>
            <p className="body-text" style={{ marginTop: '24px', maxWidth: '380px' }}>
              AlertRix simplifies medication management through an intelligent sequence of
              reminders, Guardian alerts, and real-time AI monitoring — working silently
              in the background so families can breathe easier.
            </p>
          </div>
          <div className={styles.howImg} data-reveal="right" data-delay="2">
            <img src="/how.png" alt="AlertRix in action" />
          </div>
        </div>
      </section>

      {/* ── HOW VIDEO ────────────────────────────────── */}
      <section className={styles.videoSection}>
        <div className={styles.videoInner}>
          <div className={styles.videoHeader} data-reveal>
            <span className="eyebrow">Walkthrough</span>
            <h2 className={styles.videoTitle}>See it <span className={styles.videoTitleDim}>in Motion</span></h2>
          </div>
          <div className={styles.videoWrap}>
            <video controls poster="/poster.png" muted autoPlay loop>
              <source src="/HOW.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── FEATURES LIST ────────────────────────────── */}
      <section className={styles.featList} id="features">
        <div className={styles.featListHeader} data-reveal>
          <span className="eyebrow">Capabilities</span>
          <h2 className={styles.featListTitle}>Features</h2>
        </div>

        <div className={styles.featGrid}>
          {features.map((f, i) => (
            <article
              key={f.num}
              className={styles.featCard}
              data-reveal
              data-delay={((i % 3) + 1).toString()}
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
        <div className={styles.ctaInner} data-reveal>
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
