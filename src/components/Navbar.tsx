import { motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#services' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/90 to-transparent px-12 py-7"
    >
      <motion.a
        href="#"
        className="font-body text-sm font-medium uppercase tracking-widest text-cream"
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        MOE ✦
      </motion.a>

      <ul className="hidden items-center gap-10 md:flex">
        {links.map(({ label, href }, i) => (
          <motion.li
            key={href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
          >
            <motion.a
              href={href}
              className="text-[13px] tracking-wide text-cream-55 transition-colors duration-200 hover:text-cream"
              whileHover={{ y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {label}
            </motion.a>
          </motion.li>
        ))}
        <motion.li
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + links.length * 0.07, duration: 0.5, ease: 'easeOut' }}
        >
          <motion.a
            href="#contact"
            className="rounded-full border border-cream-10 px-5 py-2 text-[13px] tracking-wide text-cream"
            whileHover={{ backgroundColor: 'rgba(244,242,238,0.08)', scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            Let's talk
          </motion.a>
        </motion.li>
      </ul>
    </motion.nav>
  )
}
