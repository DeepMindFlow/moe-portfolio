import { cn } from '@/lib/utils'

interface TagProps {
  label: string
  className?: string
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        'rounded-full border border-cream-10 bg-cream-8 px-3 py-1 text-[11px] tracking-wider text-cream-55',
        className
      )}
    >
      {label}
    </span>
  )
}
