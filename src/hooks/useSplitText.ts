import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * GSAP word-split headline animation.
 * Wraps each word in a span and staggers them in on scroll.
 * Falls back gracefully if the element doesn't exist.
 */
export function useSplitText(options: { stagger?: number; y?: number; duration?: number } = {}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const { stagger = 0.08, y = 60, duration = 1.0 } = options
    const original = el.innerHTML
    const words = el.innerText.trim().split(/\s+/)

    // Wrap each word in an overflow-hidden container + inner span
    el.innerHTML = words
      .map(
        (w) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span class="word-inner" style="display:inline-block;">${w}</span></span> `
      )
      .join('')

    const inners = el.querySelectorAll('.word-inner')
    gsap.set(inners, { y, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(inners, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: 'power4.out',
        })
      },
    })

    return () => {
      trigger.kill()
      el.innerHTML = original
    }
  }, [])

  return ref
}
