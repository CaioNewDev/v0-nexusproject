import { FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

export function GenerateReportButton({
  accent = 'cyan',
  className,
}: {
  accent?: 'cyan' | 'green' | 'magenta'
  className?: string
}) {
  const map = {
    cyan: 'border-neon-cyan/60 text-neon-cyan shadow-[0_0_20px_-6px_var(--neon-cyan)] hover:bg-neon-cyan/10',
    green:
      'border-neon-green/60 text-neon-green shadow-[0_0_20px_-6px_var(--neon-green)] hover:bg-neon-green/10',
    magenta:
      'border-neon-magenta/60 text-neon-magenta shadow-[0_0_20px_-6px_var(--neon-magenta)] hover:bg-neon-magenta/10',
  }
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-2 rounded-xl border bg-card/40 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide transition-all',
        map[accent],
        className,
      )}
    >
      <FileText className="size-4" />
      Generate Report
    </button>
  )
}
