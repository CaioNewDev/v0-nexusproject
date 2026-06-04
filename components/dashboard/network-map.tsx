import { cn } from '@/lib/utils'

type Node = { x: number; y: number; color: string }

export function NetworkMap({ className }: { className?: string }) {
  const nodes: Node[] = [
    { x: 240, y: 210, color: 'var(--neon-cyan)' },
    { x: 470, y: 165, color: 'var(--neon-cyan)' },
    { x: 560, y: 150, color: 'var(--neon-magenta)' },
    { x: 700, y: 195, color: 'var(--neon-magenta)' },
  ]
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-[#0b1220]',
        className,
      )}
    >
      <img
        src="/world-dark.png"
        alt="Mapa-múndi da rede logística"
        className="absolute inset-0 size-full object-cover opacity-50"
      />
      <svg
        viewBox="0 0 800 360"
        className="relative size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M240 210 Q360 120 470 165 T700 195"
          fill="none"
          stroke="var(--neon-cyan)"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.8"
          style={{ animation: 'route-dash 3s linear infinite' }}
        />
        <path
          d="M470 165 Q540 120 560 150 T700 195"
          fill="none"
          stroke="var(--neon-magenta)"
          strokeWidth="2"
          opacity="0.7"
        />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="14" fill={n.color} opacity="0.15" />
            <circle cx={n.x} cy={n.y} r="6" fill={n.color} />
            <circle cx={n.x} cy={n.y} r="6" fill="none" stroke={n.color}>
              <animate
                attributeName="r"
                from="6"
                to="18"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="0.8"
                to="0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}
