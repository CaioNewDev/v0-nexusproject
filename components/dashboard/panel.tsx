import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Panel({
  children,
  className,
  glow,
}: {
  children: ReactNode
  className?: string
  glow?: 'green' | 'blue' | 'cyan' | 'none'
}) {
  const glowMap = {
    green: 'shadow-[0_0_24px_-8px_var(--neon-green)] border-neon-green/30',
    blue: 'shadow-[0_0_24px_-8px_var(--neon-blue)] border-neon-blue/30',
    cyan: 'shadow-[0_0_24px_-8px_var(--neon-cyan)] border-neon-cyan/30',
    none: '',
  }
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-sm',
        glow && glowMap[glow],
        className,
      )}
    >
      {children}
    </div>
  )
}

export function PanelTitle({
  children,
  className,
  action,
}: {
  children: ReactNode
  className?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h3 className={cn('text-base font-semibold text-foreground', className)}>
        {children}
      </h3>
      {action}
    </div>
  )
}
