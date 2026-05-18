import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import styles from './CustomCursor.module.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const isHovering = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const followRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      raf = requestAnimationFrame(followRing)
    }

    const onEnterInteractive = () => {
      if (isHovering.current) return
      isHovering.current = true
      animate(ring, {
        width: ['40px', '64px'],
        height: ['40px', '64px'],
        borderWidth: ['1.5px', '2px'],
        opacity: [0.5, 0.9],
        duration: 400,
        ease: 'outExpo'
      })
      animate(dot, {
        scale: [1, 0.5],
        opacity: [1, 0.6],
        duration: 400,
        ease: 'outExpo'
      })
    }

    const onLeaveInteractive = () => {
      isHovering.current = false
      animate(ring, {
        width: ['64px', '40px'],
        height: ['64px', '40px'],
        borderWidth: ['2px', '1.5px'],
        opacity: [0.9, 0.5],
        duration: 500,
        ease: 'outExpo'
      })
      animate(dot, {
        scale: [0.5, 1],
        opacity: [0.6, 1],
        duration: 500,
        ease: 'outExpo'
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    followRing()

    // Observe interactive elements
    const attachHovers = () => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover]')
      els.forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
      return els
    }

    let els = attachHovers()

    // Re-attach on DOM changes (route changes)
    const observer = new MutationObserver(() => {
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
      els = attachHovers()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
      els.forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  )
}
