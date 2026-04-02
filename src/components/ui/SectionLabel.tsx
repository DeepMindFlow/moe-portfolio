interface SectionLabelProps {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="block h-px w-6 bg-blue-bright" />
      <span className="text-[11px] uppercase tracking-[0.12em] text-blue-bright">{children}</span>
    </div>
  )
}
