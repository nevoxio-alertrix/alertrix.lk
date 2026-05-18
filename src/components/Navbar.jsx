import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Product', path: '/product' },
  { label: 'Features', path: '/features' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState(null)
  const location = useLocation()
  const timerRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setActive(null)
  }, [location.pathname])

  useGSAP(() => {
    const showAnim = gsap.from(headerRef.current, {
      yPercent: -100,
      paused: true,
      duration: 0.4,
      ease: 'power3.out'
    }).progress(1)

    gsap.to(headerRef.current, {
      scrollTrigger: {
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          if (self.direction === -1) {
            showAnim.play()
          } else {
            showAnim.reverse()
            setMenuOpen(false)
          }
        }
      }
    })
  }, { scope: headerRef })

  const handleMenuEnter = () => {
    clearTimeout(timerRef.current)
    setMenuOpen(true)
  }
  const handleMenuLeave = () => {
    timerRef.current = setTimeout(() => setMenuOpen(false), 180)
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.open : ''}`}
      onMouseLeave={handleMenuLeave}
    >
      <div className={styles.bar}>
        {/* Left — logo mark */}
        <Link to="/" className={styles.logoWrap}>
          <img src="/LOGO.png" alt="AlertRix" style={{ width: '80px', height: '80px' }} className={styles.logoImg} />
        </Link>

        {/* Center — wordmark */}
        <Link to="/" className={styles.wordmark} style={{ fontSize: '28px' }}>AlertRix</Link>

        {/* Right — links + CTA */}
        <div className={styles.right}>
          <nav className={styles.links}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.link} ${location.pathname === link.path ? styles.linkActive : ''}`}
                onMouseEnter={() => setActive(link.label)}
                onMouseLeave={() => setActive(null)}
              >
                {link.label}
                <span className={styles.linkBar} />
              </Link>
            ))}
          </nav>

          <Link to="/product#preorder" className={styles.cta}>
            Pre-Order
          </Link>

          {/* Mobile hamburger */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerActive : ''}`}
            onClick={() => setMenuOpen(p => !p)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={`${styles.drawerLink} ${location.pathname === link.path ? styles.drawerLinkActive : ''}`}
            style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
          >
            <span className={styles.drawerNum}>0{i + 1}</span>
            {link.label}
            <span className={styles.drawerArrow}>→</span>
          </Link>
        ))}
        <div className={styles.drawerFooter}>
          <Link to="/product#preorder" className={styles.cta}>Pre-Order</Link>
        </div>
      </div>
    </header>
  )
}
