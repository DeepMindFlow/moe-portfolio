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
    <section
      id="about"
      className="border-cream-10 grid grid-cols-1 gap-10 border-b px-6 py-20 md:grid-cols-2 md:gap-20 md:px-12 md:py-32"
    >
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
      <div ref={rightRef as React.RefObject<HTMLDivElement>} className="pt-0 md:pt-20">

        {/* (1) ASCII + JSON bio card */}
        <div className="mb-10 rounded-xl border border-cream/8 bg-[#080810] p-5 font-mono">
          <div className="flex gap-4 items-start">
            <pre className="text-[6px] leading-[1.1] text-blue flex-shrink-0">{`███╗   ███╗
████╗ ████║
██╔████╔██║
██║╚██╔╝██║
██║ ╚═╝ ██║
╚═╝     ╚═╝`}</pre>
            <div className="flex flex-col gap-[5px]">
              <p className="text-[10.5px]"><span className="text-cream/30">name:   </span><span className="text-blue-pale">"Monne'T Williams"</span></p>
              <p className="text-[10.5px]"><span className="text-cream/30">role:   </span><span className="text-blue-pale">"Machine Learning Engineer"</span></p>
              <p className="text-[10.5px]"><span className="text-cream/30">University: </span><span className="text-blue-pale">"Georgia Institute of Technology"</span></p>
              <p className="text-[10.5px]"><span className="text-cream/30">degree: </span><span className="text-blue-pale">"MS in Computer Science (CS) · Machine Learning (ML) Specialization"</span></p>
              <p className="text-[10.5px]"><span className="text-cream/30">status: </span><span className="text-green-400">"open_to_work": true</span></p>
            </div>
          </div>
        </div>

        {/* (2) Stats — 2+, 9+, 100% */}
        <div className="mb-10 grid grid-cols-3 gap-3 md:gap-6">
          {stats.map(({ num, label }) => (
            <div key={label} className="stat border-cream-10 border-t pt-5">
              <span className="block font-display text-[38px] font-normal leading-none tracking-tight">
                {num}
              </span>
              <span className="text-cream-55 mt-1 block text-[12px] tracking-wide">{label}</span>
            </div>
          ))}
        </div>

        {/* (3) Availability + Core Stack bento cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-cream/8 bg-[#080810] p-4 transition-colors duration-300 hover:border-blue/40 hover:bg-blue/[0.04]">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-cream/40">Availability</p>
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              <span className="text-[12px] font-medium text-cream">Open to work</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Machine Learning Engineer</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Quant</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">NLP / GenAI</span>
            </div>
          </div>
          <div className="rounded-xl border border-cream/8 bg-[#080810] p-4 transition-colors duration-300 hover:border-blue/40 hover:bg-blue/[0.04]">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-cream/40">Core Stack</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">PyTorch</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">XGBoost</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">NLP</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">LSTM</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Transformer</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Decision Trees</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Python</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">K-Means</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Scikit-Learn</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">Logistic Regression</span>
              <span className="rounded-full border border-blue/20 bg-blue/10 px-2 py-0.5 text-[9px] text-blue-pale">K-Nearest Neighbors (KNN)</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
