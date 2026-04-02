import { motion } from 'framer-motion'
import { useGsapReveal } from '@/hooks/useGsapReveal'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Expertise', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const ref = useGsapReveal(undefined, { y: 15, duration: 0.6 })

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className="flex items-center justify-between border-t border-cream-10 px-12 py-8"
    >
      <motion.a
        href="#"
        className="font-body text-[13px] font-medium uppercase tracking-widest text-cream"
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.2 }}
      >
        MOE ✦
      </motion.a>
      <span className="text-[12px] text-cream-55">© 2025 — All rights reserved</span>
      <ul className="flex gap-7">
        {links.map(({ label, href }) => (
          <li key={href}>
            <motion.a
              href={href}
              className="text-[12px] tracking-wide text-cream-55"
              whileHover={{ color: '#f4f2ee', y: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {label}
            </motion.a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
