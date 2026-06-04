'use client'

import {
  Bell,
  LayoutDashboard,
  Leaf,
  Network,
  Search,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabId =
  | 'dashboard'
  | 'agriculture'
  | 'strategy'
  | 'compliance'
  | 'logistics'

type Accent = 'blue' | 'green' | 'cyan'

export const TABS: {
  id: TabId
  label: string
  icon: typeof LayoutDashboard
  accent: Accent
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, accent: 'blue' },
  { id: 'agriculture', label: 'Agriculture', icon: Leaf, accent: 'green' },
  { id: 'strategy', label: 'Strategy', icon: Network, accent: 'green' },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck, accent: 'green' },
  { id: 'logistics', label: 'Logistics', icon: Truck, accent: 'cyan' },
]

const accentClasses: Record<Accent, { active: string; glow: string }> = {
  blue: {
    active:
      'bg-neon-blue/15 text-neon-blue border-neon-blue/50 text-glow-blue',
    glow: 'shadow-[0_0_18px_-4px_var(--neon-blue)]',
  },
  green: {
    active:
      'bg-neon-green/15 text-neon-green border-neon-green/50 text-glow-green',
    glow: 'shadow-[0_0_18px_-4px_var(--neon-green)]',
  },
  cyan: {
    active:
      'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/50 text-glow-cyan',
    glow: 'shadow-[0_0_18px_-4px_var(--neon-cyan)]',
  },
}

function NexusLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        viewBox="0 0 32 32"
        className="size-7 text-neon-green"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6 24V8l20 16V8"
          stroke="url(#nx)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="nx" x1="6" y1="8" x2="26" y2="24">
            <stop stopColor="var(--neon-green)" />
            <stop offset="1" stopColor="var(--neon-blue)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-none">
        <span className="text-lg font-bold tracking-wide text-foreground">
          NEXUS
        </span>
        <span className="block text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Strategic Ops
        </span>
      </div>
    </div>
  )
}

export function TopNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (id: TabId) => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-3 px-4 py-3 lg:px-6">
        <NexusLogo />

        <nav className="order-3 flex w-full flex-wrap items-center gap-1.5 rounded-xl border border-border bg-card/50 p-1.5 lg:order-2 lg:ml-4 lg:w-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = active === tab.id
            const a = accentClasses[tab.accent]
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-2 rounded-lg border border-transparent px-3.5 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? cn(a.active, a.glow)
                    : 'text-muted-foreground hover:border-border hover:bg-accent hover:text-foreground',
                )}
              >
                <Icon className="size-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-2 lg:order-3">
          <button
            type="button"
            aria-label="Buscar"
            className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Notificações"
            className="relative grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-neon-red" />
          </button>
          <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card/50 py-1 pl-1 pr-3">
            <img
              src="/avatar-director.png"
              alt="Avatar de Sarah Jenkins"
              className="size-8 rounded-md object-cover"
            />
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-semibold text-foreground">
                Sarah Jenkins
              </p>
              <p className="text-[11px] text-muted-foreground">Director</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
