import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '@/hooks/useParallax'
import { gsap } from '@/lib/gsap'

export function Hero() {
  const ghostRef = useParallax(0.35) as React.RefObject<HTMLSpanElement>
  const badgeDotRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const dot = badgeDotRef.current
    if (!dot) return
    gsap.to(dot, {
      scale: 1.6,
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-10 md:px-12 md:pb-16">
      {/* Ghost bg text — GSAP parallax */}
      <span
        ref={ghostRef}
        aria-hidden
        className="text-stroke-blue pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(180px,28vw,420px)] font-bold leading-none tracking-tighter"
      >
        ML
      </span>

      {/* Top-right descriptor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute right-6 top-28 hidden max-w-[260px] text-right md:block"
      >
        <p className="text-cream-55 text-[13px] leading-relaxed">
          Machine Learning Engineer & NLP researcher crafting systems that think — not just compute.
        </p>
      </motion.div>

      {/* Staggered main content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.13, delayChildren: 0.3 } } }}
      >
        {/* Badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
          }}
          className="border-cream-10 bg-cream-8 mb-10 inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5"
        >
          <span
            ref={badgeDotRef}
            className="inline-block h-1.5 w-1.5 rounded-full bg-blue-bright"
          />
          <span className="text-cream-55 text-[12px] tracking-wider">
            Available for projects — 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: 'easeOut' } },
          }}
          className="font-display text-[clamp(52px,9vw,132px)] font-normal leading-[0.92] tracking-tighter"
        >
          Building
          <br />
          <em className="text-blue-pale">intelligent</em>
          <br />
          systems.
        </motion.h1>

        {/* Bottom row */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
          }}
          className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="text-cream-55 flex items-center gap-3 text-[12px] uppercase tracking-widest">
            <span className="bg-cream-55 block h-px w-10" />
            Scroll to explore
          </div>

          <motion.a
            href="#work"
            className="border-cream-10 group inline-flex items-center gap-4 rounded-full border px-7 py-3.5 text-sm tracking-wide text-cream"
            whileHover={{ backgroundColor: 'rgba(244,242,238,0.08)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            View selected work
            <motion.span
              className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-bright text-[11px]"
              whileHover={{ rotate: 45 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              ↗
            </motion.span>
          </motion.a>

          <span className="text-cream-55 hidden text-[12px] tracking-wider md:block">Est. 2020
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
