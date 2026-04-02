import { useEffect } from 'react'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Cursor } from '@/components/Cursor'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { Navbar } from '@/components/Navbar'
import { Services } from '@/components/Services'
import { Work } from '@/components/Work'
import { PageTransition } from '@/components/ui/PageTransition'
import { ScrollTrigger } from '@/lib/gsap'

export default function App() {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      {/* Blue/black panel wipe on first load */}
      <PageTransition />

      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
