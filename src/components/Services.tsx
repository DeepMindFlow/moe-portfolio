import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tag } from '@/components/ui/Tag'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useSplitText } from '@/hooks/useSplitText'
import { services } from '@/data/services'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function Services() {
  const headingRef = useSplitText({ stagger: 0.06, y: 45 })
  const labelRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })
  const subRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    // GSAP ScrollTrigger: stagger each service row in from left
    const rows = list.querySelectorAll('.service-row')
    gsap.set(rows, { opacity: 0, x: -30 })

    const trigger = ScrollTrigger.create({
      trigger: list,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
        })
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <section id="services" className="border-cream-10 border-b px-6 py-20 md:px-12 md:py-32">
      <div className="mb-20 flex items-end justify-between">
        <div>
          <div ref={labelRef as React.RefObject<HTMLDivElement>}>
            <SectionLabel>Expertise</SectionLabel>
          </div>
          <h2
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            className="mt-4 font-display text-[clamp(40px,5vw,72px)] font-normal leading-none tracking-tight"
          >
            What I <em className="text-blue-pale">do.</em>
          </h2>
        </div>
        <div ref={subRef as React.RefObject<HTMLDivElement>}>
          <p className="text-cream-55 max-w-[240px] text-right text-sm leading-relaxed">
            From raw data to deployed models — end to end.
          </p>
        </div>
      </div>

      <div ref={listRef} className="border-cream-10 border-t">
        {services.map((service) => (
          <motion.a
            key={service.num}
            href={service.href}
            data-hover
            //className="service-row border-cream-10 group grid items-center gap-10 border-b py-8"
            style={{ gridTemplateColumns: '40px 1fr 40px' }}
            className="service-row border-cream-10 group grid items-center gap-4 border-b py-6 md:gap-10 md:py-8"
            whileHover={{ paddingLeft: '16px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="text-cream-55 text-[12px] tracking-wider transition-colors duration-300 group-hover:text-blue-bright">
              {service.num}
            </span>
            <span className="font-display text-[clamp(26px,3vw,42px)] font-normal leading-none tracking-tight">
              {service.name}
            </span>
            <div className="hidden flex-wrap gap-2 md:flex">
              {service.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
            <motion.span
              className="text-cream-55 text-right text-xl"
              whileHover={{ rotate: 45, color: '#f4f2ee' }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            >
              ↗
            </motion.span>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
