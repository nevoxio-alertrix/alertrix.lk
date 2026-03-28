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
  return (
    <main className={styles.page}>

      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft} data-reveal>
            <span className="eyebrow eyebrow--accent">AlertRix — Since 2025</span>
            <h1 className={styles.heroTitle} data-reveal data-delay="1">
              ABOUT<br /><span className={styles.heroTitleDim}>US</span>
            </h1>
            <p className="body-text" style={{ marginTop: '24px', maxWidth: '420px' }} data-reveal data-delay="2">
              AlertRix was founded in 2025 by a passionate multidisciplinary team who
              believed that advanced care technology should be available to every family —
              not just those in clinical settings.
            </p>
          </div>
          <div className={styles.heroRight} data-reveal="right" data-delay="2">
            <div className={styles.logoCircle}>
              <img src="/LOGO.png" alt="AlertRix" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────── */}
      <section className={styles.mv}>
        <div className={styles.mvCard} data-reveal>
          <div className={styles.mvIcon}>🎯</div>
          <div className={styles.mvBody}>
            <span className="eyebrow">Our Purpose</span>
            <h2 className={styles.mvTitle}>Mission</h2>
            <p className="body-text" style={{ marginTop: '18px', maxWidth: '580px' }}>
              To leverage AI and precision engineering to improve the health and independence
              of seniors worldwide. We believe technology should be a quiet companion —
              always present, never intrusive.
            </p>
          </div>
        </div>

        <div className={styles.mvDivider} />

        <div className={styles.mvCard} data-reveal data-delay="1">
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
        <div className={styles.valuesHeader} data-reveal>
          <span className="eyebrow">What We Stand For</span>
          <h2 className={styles.valuesTitle}>Values</h2>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={v.title} className={styles.valueCard} data-reveal data-delay={(i + 1).toString()}>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────── */}
      <section className={styles.team}>
        <div className={styles.teamHeader} data-reveal>
          <span className="eyebrow">The People</span>
          <h2 className={styles.teamTitle}>Team</h2>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div key={i} className={styles.member} data-reveal data-delay={((i % 3) + 1).toString()}>
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
      <section className={styles.contact} data-reveal>
        <div className={styles.contactInner}>
          <span className="eyebrow eyebrow--accent"><strong>Get in Touch</strong></span>
          <h2 className={styles.contactTitle}>
            Have Questions? <span className={styles.contactTitleDim}>Let's Talk.</span>
          </h2>
          <div className={styles.contactLinks}>
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
