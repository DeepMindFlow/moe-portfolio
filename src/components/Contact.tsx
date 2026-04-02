import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useSplitText } from '@/hooks/useSplitText'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { cn } from '@/lib/utils'
import type { ContactFormData, FormStatus } from '@/types'
import { config } from '@/data/config'

const socials = [
  { label: 'GitHub', href: config.github },
  { label: 'LinkedIn', href: config.linkedin },
  { label: 'Portfolio', href: '#' },
  { label: 'Email', href: `mailto:${config.email}` },
]

const inputBase =
  'w-full rounded-lg border border-cream-10 bg-cream-8 px-4 py-3 text-sm text-cream placeholder:text-cream-55 outline-none transition-colors duration-200 focus:border-blue-bright'

export function Contact() {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')

  const headingRef = useSplitText({ stagger: 0.06, y: 50, duration: 1.1 })
  const rightRef = useGsapReveal('p, .contact-link, form, .socials', { stagger: 0.12, y: 30 })
  const labelRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  return (
    <section
      id="contact"
      className="grid grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-12 md:py-36"
    >
      {/* Left */}
      <div>
        <div ref={labelRef as React.RefObject<HTMLDivElement>} className="mb-8">
          <SectionLabel>Contact</SectionLabel>
        </div>
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="font-display text-[clamp(48px,7vw,100px)] font-normal leading-[0.95] tracking-tighter"
        >
          Let's build together.
        </h2>
      </div>

      {/* Right */}
      <div ref={rightRef as React.RefObject<HTMLDivElement>} className="pt-5">
        <p className="text-cream-55 mb-12 text-[17px] leading-[1.8]">
          Have a challenging ML problem, an idea that needs engineering, or a collaboration in mind?
          Open to freelance, research, and full-time opportunities.
        </p>

        <motion.a
          href={`mailto:${config.email}`}
          className="contact-link mb-4 block font-display text-[clamp(22px,2.5vw,32px)] font-normal tracking-tight text-cream"
          whileHover={{ x: 6, color: '#d0dcff' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {config.email}
        </motion.a>
        {/*<motion.a*/}
        {/*  href="tel:+13050000000"*/}
        {/*  className="contact-link mb-12 block font-display text-[clamp(22px,2.5vw,32px)] font-normal tracking-tight text-cream"*/}
        {/*  whileHover={{ x: 6, color: '#d0dcff' }}*/}
        {/*  transition={{ type: 'spring', stiffness: 300, damping: 25 }}*/}
        {/*>*/}
        {/*  +1 (305) 000-0000*/}
        {/*</motion.a>*/}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputBase}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputBase}
            />
          </div>
          <textarea
            name="message"
            placeholder="Tell me about your project..."
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className={cn(inputBase, 'resize-none')}
          />

          {error && <p className="text-[13px] text-red-400">{error}</p>}

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.p
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-3 text-[13px] text-blue-pale"
              >
                ✓ Message sent — I'll be in touch soon.
              </motion.p>
            ) : (
              <motion.button
                key="btn"
                type="submit"
                disabled={status === 'loading'}
                className="border-cream-10 group inline-flex items-center gap-4 rounded-full border px-7 py-3.5 text-sm tracking-wide text-cream disabled:opacity-50"
                whileHover={{ backgroundColor: 'rgba(244,242,238,0.08)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {status === 'loading' ? 'Sending...' : 'Send message'}
                {status !== 'loading' && (
                  <motion.span
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-bright text-[11px]"
                    whileHover={{ rotate: 45 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    ↗
                  </motion.span>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </form>

        <div className="socials mt-12 flex flex-wrap gap-3">
          {socials.map(({ label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-cream-10 text-cream-55 rounded-full border px-4 py-2 text-[12px] uppercase tracking-wider"
              whileHover={{ backgroundColor: 'rgba(244,242,238,0.08)', color: '#f4f2ee', y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
