import { SectionLabel } from '@/components/ui/SectionLabel'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useSplitText } from '@/hooks/useSplitText'
import { motion } from 'framer-motion'

const stats = [
  { num: '2+', label: 'Years building' },
  { num: '9+', label: 'ML projects shipped' },
  { num: '100%', label: 'Scratch-built models' },
]

export function About() {
  const headingRef = useSplitText({ stagger: 0.07, y: 50, duration: 1.1 })
  const rightRef = useGsapReveal('p, .stat', { stagger: 0.1, y: 30, duration: 0.85 })
  const labelRef = useGsapReveal(undefined, { y: 20, duration: 0.6 })
  const avatarRef = useGsapReveal(undefined, { y: 20, duration: 0.7 })

  return (
    <section id="about" className="border-cream-10 grid grid-cols-2 gap-20 border-b px-12 py-32">
      {/* Left */}
      <div>
        <div ref={labelRef as React.RefObject<HTMLDivElement>}>
          <SectionLabel>About</SectionLabel>
        </div>

        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="mt-8 font-display text-[clamp(36px,4.5vw,62px)] font-normal leading-[1.05] tracking-tight"
        >
          Algorithms built with <em className="text-blue-pale">purpose.</em>
        </h2>

        {/* LinkedIn bubble photo */}
        <div ref={avatarRef as React.RefObject<HTMLDivElement>} className="mt-16">
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <img
              src="/image_04.png"
              alt="Moe Williams"
              className="h-[120px] w-[120px] rounded-full border-2 border-blue-bright/40 object-cover shadow-lg"
            />
            {/* Online indicator dot */}
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-black bg-blue-bright" />
          </motion.div>
          <p className="text-cream-55 mt-3 text-[12px] tracking-wide">Monne'T (Moe) Williams</p>
        </div>
      </div>

      {/* Right */}
      <div ref={rightRef as React.RefObject<HTMLDivElement>} className="pt-20">
        <p className="text-cream-55 mb-10 text-[17px] leading-[1.8]">
          I'm a Machine Learning Engineer with a deep focus on NLP and generative AI. I build
          systems from first principles — understanding the math before touching a framework.
          Currently pursuing graduate coursework in ML and Deep Learning at Georgia Tech while
          shipping real-world projects.
        </p>
        <p className="text-cream-55 mb-10 text-[17px] tracking-wide">
          University: Georgia Institute of Technology, Atlanta, GA
        </p>
        <p className="text-cream-55 mb-10 text-[17px] tracking-wide">
          Education: Master of Science in Computer Science, Specialization in Machine Learning
        </p>

        <div className="grid grid-cols-3 gap-6">
          {stats.map(({ num, label }) => (
            <div key={label} className="stat border-cream-10 border-t pt-5">
              <span className="block font-display text-[38px] font-normal leading-none tracking-tight">
                {num}
              </span>
              <span className="text-cream-55 mt-1 block text-[12px] tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
