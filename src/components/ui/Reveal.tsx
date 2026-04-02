import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import React from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
}

const delayMap: Record<number, string> = {
  0: 'delay-0',
  1: 'delay-100',
  2: 'delay-200',
  3: 'delay-350',
  4: 'delay-500',
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out',
        delayMap[delay],
        visible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0',
        className
      )}
    >
      {children}
    </div>
  )
}
