import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Product from './pages/Product.jsx'
import Features from './pages/Features.jsx'
import About from './pages/About.jsx'

gsap.registerPlugin(ScrollTrigger)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Refresh ScrollTrigger instances when route changes
    ScrollTrigger.refresh()
  }, [pathname])
  return null
}

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slow, smooth motion
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <SmoothScroll />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
