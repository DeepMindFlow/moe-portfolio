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
      className="border-cream-10 flex flex-col items-center gap-4 border-t px-6 py-8 text-center md:flex-row md:justify-between md:px-12"
    >
      <motion.a
        href="#"
        className="font-body text-[13px] font-medium uppercase tracking-widest text-cream"
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.2 }}
      >
        MOE ✦
      </motion.a>
      <span className="text-cream-55 text-[12px]">© 2025 — All rights reserved</span>
      <ul className="flex gap-7">
        {links.map(({ label, href }) => (
          <li key={href}>
            <motion.a
              href={href}
              className="text-cream-55 text-[12px] tracking-wide"
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
