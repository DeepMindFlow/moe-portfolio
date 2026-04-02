import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

interface ProjectPreviewProps {
  gradient: string | null
  label: string
}

export function ProjectPreview({ gradient, label }: ProjectPreviewProps) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Smooth spring follow — slightly laggy so it feels physical
  const x = useSpring(rawX, { stiffness: 120, damping: 20 })
  const y = useSpring(rawY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <AnimatePresence>
      {gradient && (
        <motion.div
          className="pointer-events-none fixed z-[9990] overflow-hidden rounded-lg"
          style={{
            x,
            y,
            translateX: '20px',
            translateY: '-50%',
            width: 280,
            height: 180,
          }}
          initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.78, rotate: 4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {/* Gradient "screenshot" */}
          <div
            className="absolute inset-0"
            style={{ background: gradient }}
          />

          {/* Grid overlay — gives it a data/tech feel */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(212,220,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,220,255,0.3) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Scan line shimmer */}
          <motion.div
            className="absolute inset-x-0 h-24 opacity-10"
            style={{
              background: 'linear-gradient(to bottom, transparent, #d0dcff, transparent)',
            }}
            animate={{ top: ['-40%', '130%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Label chip */}
          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
            <span className="font-body text-[11px] uppercase tracking-widest text-cream/80">
              {label}
            </span>
          </div>

          {/* Corner accent */}
          <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-bright opacity-80" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
