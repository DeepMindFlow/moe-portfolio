import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tag } from '@/components/ui/Tag'
import { ProjectPreview } from '@/components/ui/ProjectPreview'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useSplitText } from '@/hooks/useSplitText'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { projects } from '@/data/projects'
import { Link } from 'react-router-dom'
import type { Project } from '@/types'

interface CardProps {
  project: Project
  onHover: (p: Project | null) => void
  index: number
}

function ProjectCard({ project, onHover, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    gsap.set(el, { opacity: 0, y: 40 })
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay: index * 0.08,
          ease: 'power3.out',
        })
      },
    })
    return () => trigger.kill()
  }, [index])

  return (
    <div ref={cardRef}>
      <motion.a
        href={project.href}
        data-hover
        className="group relative flex h-full min-h-[420px] w-[360px] flex-shrink-0 flex-col justify-between overflow-hidden bg-[#080810] p-10"
        onMouseEnter={() => onHover(project)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ backgroundColor: 'rgba(24,71,209,0.08)' }}
        transition={{ duration: 0.4 }}
      >
        {/* Top */}
        <div className="flex items-start justify-between">
          <span className="text-[11px] uppercase tracking-widest text-cream/40">
            {project.num} — {project.year}
          </span>
          <motion.span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/10 text-sm text-cream/40"
            whileHover={{
              rotate: 45,
              backgroundColor: '#2b5ce6',
              borderColor: '#2b5ce6',
              color: '#f4f2ee',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            ↗
          </motion.span>
        </div>

        {/* Preview strip — mini version of the gradient */}
        <motion.div
          className="my-6 h-px w-full origin-left opacity-30"
          style={{ background: project.previewGradient }}
          whileHover={{ scaleX: 1.0, opacity: 0.6, height: '2px' }}
          initial={{ scaleX: 0.4 }}
          transition={{ duration: 0.5 }}
        />

        {/* Bottom */}
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <motion.h3
            className="font-display text-[clamp(28px,2.5vw,38px)] font-light leading-[1.05] tracking-tight"
            whileHover={{ color: '#d0dcff' }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="mt-3 text-[13px] leading-relaxed text-cream/50">
            {project.description}
          </p>
        </div>
      </motion.a>
    </div>
  )
}

export function Work() {
  const headingRef = useSplitText({ stagger: 0.06, y: 45 })
  const labelRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })
  const headerRightRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })

  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)

  // GSAP horizontal scroll
  useEffect(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const totalScrollWidth = track.scrollWidth - track.parentElement!.offsetWidth + 96

    const tween = gsap.to(track, {
      x: -totalScrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${totalScrollWidth + 200}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="work" className="overflow-hidden bg-black">
      {/* Sticky header */}
      <div className="px-6 pb-10 pt-20 md:px-12 md:pb-16 md:pt-32">
        <div className="flex items-end justify-between">
          <div>
            <div ref={labelRef as React.RefObject<HTMLDivElement>}>
              <SectionLabel>Selected Work</SectionLabel>
            </div>
            <h2
              ref={headingRef as React.RefObject<HTMLHeadingElement>}
              className="mt-4 font-display text-[clamp(40px,5vw,72px)] font-light leading-none tracking-tight"
            >
              Projects that <em className="text-blue-pale">ship.</em>
            </h2>
          </div>
          <div ref={headerRightRef as React.RefObject<HTMLDivElement>}>
            <Link
              to="/projects"
              className="hover:bg-cream-8 rounded-full border border-cream/10 px-5 py-2.5 text-[13px] tracking-wide text-cream/50 transition-colors duration-200 hover:text-cream"
            >
              All projects →
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-widest text-cream/30">
          <span>Drag to explore</span>
          <span className="inline-block animate-bounce">→</span>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div className="overflow-x-auto pl-6 md:overflow-visible md:pl-12">
        <div ref={trackRef} className="flex gap-0.5 will-change-transform">
          {projects.slice(0, 2).map((project, i) => (
            <div key={project.id} className="project-card-wrap">
              <ProjectCard project={project} onHover={setHoveredProject} index={i} />
            </div>
          ))}
          {/* End spacer */}
          <div className="w-24 flex-shrink-0" />
        </div>
      </div>

      {/* Bottom padding for section */}
      <div className="h-16" />

      {/* Cursor-following preview */}
      <ProjectPreview
        gradient={hoveredProject?.previewGradient ?? null}
        label={hoveredProject?.title ?? ''}
      />
    </section>
  )
}
