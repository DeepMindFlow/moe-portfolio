import { useCursor } from '@/hooks/useCursor'
import { motion, AnimatePresence } from 'framer-motion'

export function Cursor() {
  const { dotX, dotY, ringX, ringY, hovering, visible } = useCursor()

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dot — snappy, instant */}
          <motion.div
            className="pointer-events-none fixed z-[9999] rounded-full bg-blue-bright"
            style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
            animate={{
              width: hovering ? 52 : 10,
              height: hovering ? 52 : 10,
              opacity: hovering ? 0.65 : 1,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          />

          {/* Ring — laggy spring follow */}
          <motion.div
            className="pointer-events-none fixed z-[9998] rounded-full border border-blue-bright/40"
            style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
            animate={{
              width: hovering ? 0 : 36,
              height: hovering ? 0 : 36,
              opacity: hovering ? 0 : 1,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
