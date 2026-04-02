import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  delay?: number
  scrub?: boolean
}

/**
 * GSAP ScrollTrigger reveal for a container element.
 * Pass a selector string to animate multiple children with stagger.
 */
export function useGsapReveal(selector?: string, options: RevealOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = selector ? el.querySelectorAll(selector) : [el]
    const { y = 40, duration = 0.9, stagger = 0.12, delay = 0 } = options

    gsap.set(targets, { opacity: 0, y })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        })
      },
    })

    return () => trigger.kill()
  }, [selector, options.y, options.duration, options.stagger, options.delay])

  return ref
}
