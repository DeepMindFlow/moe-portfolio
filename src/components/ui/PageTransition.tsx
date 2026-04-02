import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function PageTransition() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Auto-dismiss after mount animation completes
    const t = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Primary blue panel — sweeps up */}
          <motion.div
            key="panel-blue"
            className="fixed inset-0 z-[9995] origin-bottom bg-blue-bright"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
          />
          {/* Dark panel behind it — sweeps up slightly after */}
          <motion.div
            key="panel-dark"
            className="fixed inset-0 z-[9994] origin-bottom bg-black"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.65 }}
          />
          {/* Logo mark in center while transitioning */}
          <motion.div
            key="logo"
            className="fixed inset-0 z-[9996] flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.45 }}
          >
            <span className="font-display text-5xl font-light italic tracking-tight text-cream">
              MOE ✦
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
