import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

/**
 * useAnimeOnScroll — triggers an Anime.js animation when an element enters the viewport.
 * @param {Object} animeProps - Anime.js v4 animation properties (without first `targets` arg).
 * @param {Object} options - IntersectionObserver options.
 * @returns {React.RefObject} - Ref to attach to the target element.
 */
export function useAnimeOnScroll(animeProps, options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasPlayed.current) {
        hasPlayed.current = true
        animate(el, animeProps)
        observer.unobserve(el)
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * useStaggerOnScroll — triggers a staggered animation on child elements.
 * @param {string} childSelector - CSS selector for children within the container.
 * @param {Object} animeProps - Anime.js v4 animation properties (without first `targets` arg).
 * @param {Object} options - IntersectionObserver options.
 * @returns {React.RefObject} - Ref to attach to the container element.
 */
export function useStaggerOnScroll(childSelector, animeProps, options = { threshold: 0.1 }) {
  const ref = useRef(null)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasPlayed.current) {
        hasPlayed.current = true
        const children = container.querySelectorAll(childSelector)
        animate(children, animeProps)
        observer.unobserve(container)
      }
    }, options)

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * useMagneticHover — creates a magnetic pull effect on hover.
 * The element subtly moves toward the mouse position.
 * @param {number} strength - How strongly the element follows (0-1, default 0.3).
 * @returns {React.RefObject} - Ref to attach to the target element.
 */
export function useMagneticHover(strength = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      animate(el, {
        translateX: x * strength,
        translateY: y * strength,
        duration: 500,
        ease: 'outExpo'
      })
    }

    const onLeave = () => {
      animate(el, {
        translateX: 0,
        translateY: 0,
        duration: 800,
        ease: 'outElastic(1, .5)'
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}

/**
 * useTextReveal — splits text into spans and animates them character-by-character.
 * @param {Object} opts - { delay, duration, staggerDelay, easing }
 * @returns {React.RefObject}
 */
export function useTextReveal(opts = {}) {
  const ref = useRef(null)
  const hasPlayed = useRef(false)

  const {
    delay = 0,
    duration = 1200,
    staggerDelay = 30,
    easing = 'outExpo'
  } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split text into individual character spans
    const text = el.textContent
    el.textContent = ''
    el.style.overflow = 'hidden'

    const chars = text.split('').map(char => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00a0' : char
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.style.transform = 'translateY(100%)'
      el.appendChild(span)
      return span
    })

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasPlayed.current) {
        hasPlayed.current = true
        animate(chars, {
          translateY: ['100%', '0%'],
          opacity: [0, 1],
          duration,
          delay: stagger(staggerDelay, { start: delay }),
          ease: easing
        })
        observer.unobserve(el)
      }
    }, { threshold: 0.2 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
