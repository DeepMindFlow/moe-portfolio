import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

export function useCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  // Raw mouse position
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 1200, damping: 60 })
  const dotY = useSpring(rawY, { stiffness: 1200, damping: 60 })

  // Ring lags behind with softer spring
  const ringX = useSpring(rawX, { stiffness: 150, damping: 22 })
  const ringY = useSpring(rawY, { stiffness: 150, damping: 22 })

  const hoverRef = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', () => { hoverRef.current = true; setHovering(true) })
        el.addEventListener('mouseleave', () => { hoverRef.current = false; setHovering(false) })
      })
    }

    // Delay to allow DOM to settle
    const t = setTimeout(attachHover, 500)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      clearTimeout(t)
    }
  }, [rawX, rawY, visible])

  return { dotX, dotY, ringX, ringY, hovering, visible }
}
