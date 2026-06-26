import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Brand column */}
        <div className={styles.brand}>
          <img src="/LOGO.png" alt="AlertRix" className={styles.logo} />
          <p className={styles.brandName}>AlertRix</p>
          <p className={styles.tagline}>SMART ALERTS, safe doses</p>
        </div>

        {/* Nav columns */}
        <div className={styles.cols}>
          <div className={styles.col}>
            <span className="eyebrow" style={{ marginBottom: '20px' }}>Navigate</span>
            <nav className={styles.nav}>
              <Link to="/">Home</Link>
              <Link to="/product">Product</Link>
              <Link to="/features">Features</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>
          <div className={styles.col}>
            <span className="eyebrow" style={{ marginBottom: '20px' }}>Connect</span>
            <nav className={styles.nav}>
              <a href="https://www.instagram.com/alertrix.lk" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://wa.me/+94750254442" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a href="https://linkedin.com/company/alertrix/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </nav>
          </div>
          <div className={styles.col}>
            <span className="eyebrow" style={{ marginBottom: '20px' }}>Enquire</span>
            <p className={styles.contact}>alertrix.lk<br />+94 75 025 4442</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>© 2025 AlertRix. All rights reserved.</p>
        <p className={styles.copy}>Crafted with precision.</p>
      </div>
    </footer>
  )
}
