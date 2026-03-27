import Footer from '../components/Footer.jsx'
import styles from './About.module.css'

const team = [
  { name: 'Shamra M', role: 'Firmware Lead', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANNxx8wJCdicws1FpWLxA3DjuKYpHYUIRc2zSxxYpPlfDBBS_SRoXsdBy6meR1d8Z0mRR8g7n8RWII2qYjavD7MOFtL2SxlPa1bVLqBWnmQlJQH2oTI5ij8HmCEQmwSQidTjnrGUGFnL7Jkxv8Y9tXZleapxSWLOaiTGPlSgoX71mCoelzfbfTzMvKkIivbOrp-jTmb1kmljnjMb8xy6ctAQYwDLaA5zvX89s2rkxZwWRJwmHVMN9YY3I_RcQjaeI8PluQ_Yju8Uc', initials: 'SM' },
  { name: 'Sithuli S', role: 'Design Lead', img: '/assets/s.png', initials: 'SS' },
  { name: 'Humaid R', role: 'Development Lead', img: '/assets/h.png', initials: 'HR' },
  { name: 'Thivina H', role: 'Mechanical Lead', img: '/assets/t.png', initials: 'TH' },
  { name: 'Lakshan T', role: 'Hardware Lead', img: '/assets/l.png', initials: 'LT' },
  { name: 'Bhadrash C', role: 'Frontend Lead', img: '/assets/P1.png', initials: 'BC' },
]

export default function About() {
  return (
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroLeft}>
          <span className="section-label">AlertRix — Since 2025</span>
          <h1 className={styles.heroTitle}>About<br />Us</h1>
          <p className={styles.heroDesc}>
            AlertRix was launched in 2025 by a dynamic team of compassionate healthcare experts and skilled IoT & development specialists. We recognized the urgent need for elderly care to move beyond traditional methods and adopt a proactive, personalized approach.
          </p>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.logoWrap}>
            <img src="/assets/LOGO.png" alt="AlertRix Logo" />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.mvSection}>
        {/* Mission */}
        <div className={styles.mvCard}>
          <div className={styles.mvIcon}>🎯</div>
          <div className={styles.mvContent}>
            <span className="section-label">Our Purpose</span>
            <h2 className={styles.mvTitle}>Mission</h2>
            <p className={styles.mvText}>
              AlertRix's mission is to leverage technology to improve the health and well-being of seniors. We believe that AI can play a vital role in enhancing medication adherence, promoting independence, and reducing the burden on caregivers. Our commitment is to create solutions that are both effective and user-friendly.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.mvDivider} />

        {/* Vision */}
        <div className={styles.mvCard}>
          <div className={styles.mvIcon}>👁️</div>
          <div className={styles.mvContent}>
            <span className="section-label">Where We're Going</span>
            <h2 className={styles.mvTitle}>Vision</h2>
            <p className={styles.mvText}>
              Our vision is to empower seniors, chronic patients, and busy individuals to live independently and safely through an AI-powered smart medication management system with intelligent pill-dispensing, improving medication adherence and enhancing quality of life for users and their families.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className={styles.teamSection}>
        <div className={styles.teamHeader}>
          <span className="section-label">The People</span>
          <h2 className={styles.teamTitle}>Our Team</h2>
        </div>

        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div key={i} className={styles.member}>
              <div className={styles.memberAvatar}>
                <img
                  src={member.img}
                  alt={member.name}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                />
                <div className={styles.memberInitials} style={{ display: 'none' }}>
                  {member.initials}
                </div>
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
              <div className={styles.memberNum}>0{i + 1}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
