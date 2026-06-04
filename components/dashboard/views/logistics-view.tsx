'use client'

import {
  AlertTriangle,
  Bell,
  CloudRain,
  Layers,
  ListChecks,
  MoreHorizontal,
  Repeat,
  Ship,
} from 'lucide-react'
import { Panel } from '@/components/dashboard/panel'

const conflicts = [
  { x: 540, y: 175, label: 'Suez' },
  { x: 560, y: 215, label: 'Yemen' },
  { x: 790, y: 195, label: 'Taiwan Strait' },
]

const weatherRows = [
  { label: 'Detailed', value: '15-21°', tone: 'text-foreground' },
  { label: 'Cyclone warning', value: '38°', tone: 'text-foreground' },
  { label: 'Deaning', value: '13°', tone: 'text-foreground' },
  { label: 'Storms', value: '15 rm', tone: 'text-foreground' },
  { label: 'India', value: 'Nearstorna', tone: 'text-neon-cyan' },
  { label: 'Storms', value: 'North r/a', tone: 'text-foreground' },
]

const legend = [
  { label: 'Conflict Zones', value: 'Red', color: 'text-neon-red' },
  { label: 'Safe alternative route', value: 'Risk', color: 'text-neon-amber' },
  { label: 'Diplomatic alerts', value: 'Alerts', color: 'text-neon-amber' },
  { label: 'Compliance updates', value: 'Red', color: 'text-neon-red' },
  { label: 'Active ships (alt)', value: 'Orange', color: 'text-neon-amber' },
  { label: 'Active ships', value: 'Blue', color: 'text-neon-cyan' },
]

const ships = [
  { n: 'Polaris (Hkg-Rot)', eta: '12d 6h', status: 'En Route', tone: 'text-neon-cyan' },
  { n: 'Challenger (LA-Sgp)', eta: '19d 1h', status: 'Conflict Zone', tone: 'text-neon-red' },
  { n: 'Rumatun (HK-Sgp)', eta: '12d 19h', status: 'En Route', tone: 'text-neon-cyan' },
  { n: 'Challenger (LA-Sgp)', eta: '19d 19h', status: 'Conflict Zone', tone: 'text-neon-red' },
  { n: 'Paria (Hkg-Rot)', eta: '12d 6h', status: 'En Route', tone: 'text-neon-cyan' },
]

const suggestions = [
  {
    Icon: Repeat,
    t: 'Rerouting needed via Cape of Good Hope',
    d: 'Rerouting needed via Cape of Good Hope.',
    badge: 'Needed',
    tone: 'border-neon-red/40 text-neon-red',
  },
  {
    Icon: Bell,
    t: 'Diplomatic alerts',
    d: 'Rerouting alerts for via Cape of Good Hope.',
    badge: 'Alerts',
    tone: 'border-neon-amber/40 text-neon-amber',
  },
  {
    Icon: AlertTriangle,
    t: 'Compliance updates',
    d: 'Compliance updates with risk levels and recommended actions.',
    badge: 'Medium',
    tone: 'border-neon-amber/40 text-neon-amber',
  },
  {
    Icon: ListChecks,
    t: 'Compliance updates',
    d: 'Risk levels and recommended actions.',
    badge: 'Levels',
    tone: 'border-neon-amber/40 text-neon-amber',
  },
]

export function LogisticsView() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-[#0a1018]">
        <img
          src="/world-dark.png"
          alt="Mapa-múndi de logística global"
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <button className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-neon-green/40 bg-background/70 px-3 py-2 text-sm text-neon-green backdrop-blur transition-colors hover:bg-neon-green/10">
          <Layers className="size-4" /> Layers ▾
        </button>

        <svg
          viewBox="0 0 960 460"
          className="relative h-[460px] w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* active blue shipping routes */}
          {[
            'M180 250 Q320 150 520 175 T860 230',
            'M180 250 Q300 320 520 215 T880 300',
            'M520 175 Q700 120 860 230',
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--neon-cyan)"
              strokeWidth="1.6"
              opacity="0.7"
            />
          ))}
          {/* orange alternative route via Cape of Good Hope */}
          <path
            d="M540 175 Q560 320 540 420 Q520 460 560 440 Q760 360 800 220"
            fill="none"
            stroke="var(--neon-amber)"
            strokeWidth="2"
            strokeDasharray="6 6"
            opacity="0.9"
            style={{ animation: 'route-dash 4s linear infinite' }}
          />

          {/* conflict zones */}
          {conflicts.map((c) => (
            <g key={c.label}>
              <circle cx={c.x} cy={c.y} r="22" fill="var(--neon-red)" opacity="0.18" />
              <circle cx={c.x} cy={c.y} r="6" fill="var(--neon-red)">
                <animate attributeName="opacity" from="1" to="0.4" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <rect
                x={c.x + 12}
                y={c.y - 12}
                width={c.label.length * 7 + 14}
                height="20"
                rx="4"
                fill="var(--background)"
                opacity="0.85"
              />
              <text x={c.x + 19} y={c.y + 2} fill="var(--foreground)" fontSize="11">
                {c.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Weather Alerts overlay */}
        <Panel className="absolute left-4 top-4 z-10 w-72 max-w-[80%] bg-background/85 backdrop-blur">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-base font-semibold text-foreground">
              <CloudRain className="size-5 text-neon-cyan" /> Weather Alerts
            </span>
            <MoreHorizontal className="size-4 text-muted-foreground" />
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Cyclone warning in Pacific, heavy storms near India
          </p>
          <ul className="space-y-2 border-t border-border pt-3 text-xs">
            {weatherRows.map((r, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-muted-foreground">{r.label}</span>
                <span className={r.tone}>{r.value}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-3 space-y-2 border-t border-border pt-3 text-xs">
            {legend.map((l, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-muted-foreground">{l.label}</span>
                <span className={`font-medium ${l.color}`}>{l.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <div className="mb-4 flex items-center gap-2">
            <Ship className="size-5 text-neon-cyan" />
            <h3 className="text-base font-semibold text-foreground">
              ETA &amp; Status
            </h3>
          </div>
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-border pb-2 text-xs text-muted-foreground">
            <span>Ship</span>
            <span>ETA</span>
            <span className="text-right">Status</span>
          </div>
          <ul>
            {ships.map((s, i) => (
              <li
                key={i}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-border py-3 text-sm last:border-b-0"
              >
                <span className="text-foreground">Ship: {s.n}</span>
                <span className="text-muted-foreground">{s.eta}</span>
                <span className={`text-right font-medium ${s.tone}`}>
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <div className="mb-1 flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-md bg-neon-amber/15 text-neon-amber">
              ⚙
            </span>
            <h3 className="text-base font-semibold text-foreground">
              Diplomatic AI Suggestions
            </h3>
          </div>
          <p className="mb-4 text-xs italic text-muted-foreground">
            &quot;AI recommendations based on Geopolitical Risk Assessment&quot;
          </p>
          <ul className="space-y-1">
            {suggestions.map((s, i) => {
              const Icon = s.Icon
              return (
                <li
                  key={i}
                  className="flex items-start gap-3 border-b border-border py-3 last:border-b-0"
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-neon-red" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{s.t}</p>
                    <p className="text-xs text-muted-foreground">{s.d}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${s.tone}`}
                  >
                    {s.badge}
                  </span>
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
