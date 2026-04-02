import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const items = [
  'Machine Learning', 'Deep Learning', 'NLP', 'Transformers',
  'Neural Architecture', 'Generative AI', 'PyTorch', 'Python',
  'Data Engineering', 'Risk Modeling', 'Attention Mechanisms', 'Seq2Seq',
]

function MarqueeContent() {
  return (
    <div className="flex items-center gap-7 px-8">
      {items.map((item, i) => (
        <span
          key={i}
          className="flex items-center gap-7 whitespace-nowrap text-[13px] uppercase tracking-[0.07em] text-cream-55"
        >
          {item}
          <span className="inline-block h-1 w-1 rounded-full bg-blue" />
        </span>
      ))}
    </div>
  )
}

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure after paint so widths are accurate
    const setup = () => {
      const totalWidth = track.scrollWidth / 2

      const tween = gsap.to(track, {
        x: -totalWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: (x: string) => `${parseFloat(x) % totalWidth}px`,
        },
      })

      const wrap = track.parentElement
      const slowDown = () => gsap.to(tween, { timeScale: 0.25, duration: 0.5, ease: 'power2.out' })
      const speedUp = () => gsap.to(tween, { timeScale: 1, duration: 0.8, ease: 'power2.inOut' })

      wrap?.addEventListener('mouseenter', slowDown)
      wrap?.addEventListener('mouseleave', speedUp)

      return () => {
        tween.kill()
        wrap?.removeEventListener('mouseenter', slowDown)
        wrap?.removeEventListener('mouseleave', speedUp)
      }
    }

    // Small delay to let fonts/layout settle
    const t = setTimeout(setup, 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="overflow-hidden border-b border-t border-cream-10 py-5">
      <div ref={trackRef} className="flex w-max">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}
