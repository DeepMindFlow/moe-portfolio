import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tag } from '@/components/ui/Tag'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useSplitText } from '@/hooks/useSplitText'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

function useTypewriter(text: string, active: boolean, speed = 22) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!active) {
      setDisplayed('')
      return
    }
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [active, text, speed])
  return displayed
}

function MetricBar({
  label,
  value,
  percent,
  animate,
  index,
}: {
  label: string
  value: string
  percent: number
  animate: boolean
  index: number
}) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (!animate) {
      setWidth(0)
      return
    }
    const t = setTimeout(() => setWidth(percent), 120 + index * 160)
    return () => clearTimeout(t)
  }, [animate, percent, index])
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-cream/40">{label}</span>
        <span className="text-[10px] font-medium text-blue-pale">{value}</span>
      </div>
      <div className="bg-cream/8 h-[3px] w-full overflow-hidden rounded-full">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue to-blue-bright"
          style={{ width: `${width}%`, transition: 'width 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </div>
    </div>
  )
}

function FlipCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const typed = useTypewriter(project.terminalText, flipped && !project.metrics)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.set(el, { opacity: 0, y: 40 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.85, delay: index * 0.08, ease: 'power3.out' }),
    })
    return () => trigger.kill()
  }, [index])

  const hasMetrics = !!project.metrics

  return (
    <div ref={cardRef} style={{ perspective: '1000px' }}>
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '260px',
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-cream/10 bg-[#080810] p-8"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1 opacity-60"
            style={{ background: project.previewGradient }}
          />
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="text-[11px] uppercase tracking-widest text-cream/35">
                {project.num} — {project.year}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-[13px] text-cream/40">
                ↺
              </span>
            </div>
            <div
              className="relative h-20 overflow-hidden rounded-lg"
              style={{ background: project.previewGradient }}
            >
              <motion.div
                className="absolute inset-x-0 h-6 opacity-20"
                style={{
                  background: 'linear-gradient(to bottom, transparent, #d0dcff, transparent)',
                }}
                animate={{ top: ['-20%', '120%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              />
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(212,220,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,220,255,0.3) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-bright/90 text-[10px] text-cream">
                  ▶
                </div>
              </div>
            </div>
            <div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              <h3 className="font-display text-[clamp(18px,2vw,24px)] font-light leading-tight tracking-tight text-cream">
                {project.title}
              </h3>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-cream/30">
                click to flip
              </p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-blue/40 bg-[#080e2a] p-8"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div
            className="absolute inset-x-0 top-0 h-1 opacity-60"
            style={{ background: project.previewGradient }}
          />
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="font-display text-[15px] font-light text-cream">
                {project.title}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-[13px] text-cream/40">
                ↺
              </span>
            </div>

            {hasMetrics && project.metrics && (
              <div className="flex flex-col gap-3">
                {project.metrics.map((m, i) => (
                  <MetricBar
                    key={m.label}
                    label={m.label}
                    value={m.value}
                    percent={m.percent}
                    animate={flipped}
                    index={i}
                  />
                ))}
              </div>
            )}

            {!hasMetrics && (
              <div className="border-cream/8 rounded-lg border bg-black/40 p-4">
                <p className="mb-2 text-[10px] uppercase tracking-wider text-blue-bright/60">
                  › project.describe()
                </p>
                <p className="text-[12px] leading-relaxed text-blue-pale/80">
                  {typed}
                  <AnimatePresence>
                    {typed.length < project.terminalText.length && (
                      <motion.span
                        className="ml-0.5 inline-block h-3 w-1.5 bg-blue-bright align-middle"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </AnimatePresence>
                </p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/10 text-[13px] text-cream/40"
                whileHover={{
                  backgroundColor: '#2b5ce6',
                  borderColor: '#2b5ce6',
                  color: '#f4f2ee',
                  rotate: 45,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                ↗
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProjectsPage() {
  const headingRef = useSplitText({ stagger: 0.06, y: 45 })
  const labelRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })

  return (
    <main className="min-h-screen px-6 pb-20 pt-36 md:px-12 md:pt-40">
      <div className="mb-16">
        <div ref={labelRef as React.RefObject<HTMLDivElement>}>
          <SectionLabel>All Work</SectionLabel>
        </div>
        <h1
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mt-4 font-display text-[clamp(48px,7vw,96px)] font-light leading-none tracking-tighter"
        >
          Projects that <em className="text-blue-pale">ship.</em>
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-cream/50">
          Click any card to flip it — back side reveals a terminal description or live model
          metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project, i) => (
          <FlipCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] uppercase tracking-widest text-cream/20">
        click any card to flip
      </p>
    </main>
  )
}
