import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Cursor } from '@/components/Cursor'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/ui/PageTransition'
import { Hero } from '@/components/Hero'
import { Marquee } from '@/components/Marquee'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { Contact } from '@/components/Contact'
import { Work } from '@/components/Work'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ScrollTrigger } from '@/lib/gsap'

export default function App() {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <PageTransition />
      <Cursor />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Marquee />
              <About />
              <Services />
              <Work />
              <Contact />
            </main>
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
      <Footer />
    </>
  )
}
