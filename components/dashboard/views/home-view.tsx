'use client'

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Pie,
  PieChart,
} from 'recharts'
import {
  Briefcase,
  CircleDollarSign,
  Flame,
  MoreVertical,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Panel, PanelTitle } from '@/components/dashboard/panel'
import { GenerateReportButton } from '@/components/dashboard/generate-report-button'
import { NetworkMap } from '@/components/dashboard/network-map'

const financial = [
  { m: 'Feb', revenue: 1.8, expenses: 1.1 },
  { m: 'Mar', revenue: 2.1, expenses: 1.2 },
  { m: 'Apr', revenue: 1.9, expenses: 1.3 },
  { m: 'May', revenue: 2.6, expenses: 1.4 },
  { m: 'Jun', revenue: 2.3, expenses: 1.5 },
  { m: 'Aug', revenue: 3.4, expenses: 1.6 },
  { m: 'Sep', revenue: 2.9, expenses: 1.7 },
  { m: 'Oct', revenue: 3.6, expenses: 1.8 },
  { m: 'Nov', revenue: 3.2, expenses: 1.9 },
  { m: 'Dec', revenue: 4.1, expenses: 1.9 },
]

const allocation = [
  { name: 'Agriculture', value: 35, color: 'var(--neon-cyan)' },
  { name: 'Logistics', value: 30, color: 'var(--neon-blue)' },
  { name: 'Strategy', value: 20, color: 'var(--neon-magenta)' },
  { name: 'Compliance', value: 15, color: 'var(--neon-green)' },
]

const kpis = [
  {
    label: 'Total Revenue',
    value: '$4.1M',
    delta: '+9%',
    icon: CircleDollarSign,
    accent: 'text-neon-cyan',
  },
  {
    label: 'Resource Allocation',
    value: '78%',
    icon: Users,
    accent: 'text-neon-blue',
  },
  {
    label: 'Risk Index',
    value: 'Low/Green',
    icon: ShieldCheck,
    accent: 'text-neon-green',
  },
  {
    label: 'Active Projects',
    value: '34',
    icon: Briefcase,
    accent: 'text-neon-cyan',
  },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: ${p.value}M
        </p>
      ))}
    </div>
  )
}

export function HomeView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          STRATEGIC OVERVIEW DASHBOARD{' '}
          <span className="font-normal text-muted-foreground">| Sarah J.</span>
        </h1>
        <GenerateReportButton accent="magenta" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <Panel key={k.label} className="p-4">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent">
                  <Icon className={`size-5 ${k.accent}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{k.label}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span
                      className={`text-2xl font-bold ${k.label === 'Risk Index' ? 'text-neon-green' : 'text-foreground'}`}
                    >
                      {k.value}
                    </span>
                    {k.delta && (
                      <span className="rounded bg-neon-green/15 px-1.5 py-0.5 text-xs font-semibold text-neon-green">
                        {k.delta}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <PanelTitle
            action={
              <span className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
                All Quarters
              </span>
            }
          >
            Financial Impact Analysis (Q3)
          </PanelTitle>
          <div className="mb-3 flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-full bg-neon-cyan" /> Revenue
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-full bg-neon-magenta" /> Expenses
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={financial}
                margin={{ top: 10, right: 6, bottom: 0, left: -18 }}
              >
                <defs>
                  <linearGradient id="barRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="m"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--accent)' }} />
                <Bar dataKey="revenue" name="Revenue" fill="url(#barRev)" radius={[4, 4, 0, 0]} barSize={14} />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  name="Expenses"
                  stroke="var(--neon-magenta)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue Trend"
                  stroke="var(--neon-cyan)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelTitle action={<MoreVertical className="size-4 text-muted-foreground" />}>
            AI-Powered Recommendations | Supply Chain
          </PanelTitle>
          <div className="space-y-3">
            <div className="rounded-xl border border-neon-magenta/40 bg-neon-magenta/5 p-4 shadow-[0_0_20px_-10px_var(--neon-magenta)]">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Flame className="size-4 text-neon-magenta" /> High Priority
                </span>
                <span className="text-xs font-semibold text-neon-green">
                  +14% Efficiency
                </span>
              </div>
              <p className="font-medium text-foreground">Optimize Route 412</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Reroute logistics to increase efficiency across LATAM corridors.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-accent">
                  <div className="h-full w-[72%] rounded-full bg-neon-magenta" />
                </div>
                <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-neon-magenta/50">
                  View Details
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card/40 p-4">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-neon-amber">
                <span className="size-2.5 rounded-sm bg-neon-amber" /> Medium
                Priority
              </span>
              {[
                {
                  t: 'Inventory Adjustment',
                  d: 'Adjust inventory to allow back-orders.',
                },
                { t: 'Grain Storage', d: 'Expand grain storage front capacity.' },
              ].map((r) => (
                <div
                  key={r.t}
                  className="flex items-center justify-between gap-3 border-t border-border py-3 first:border-t-0 first:pt-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.t}</p>
                    <p className="text-xs text-muted-foreground">{r.d}</p>
                  </div>
                  <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-neon-cyan/50">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <PanelTitle action={<MoreVertical className="size-4 text-muted-foreground" />}>
            Resource Allocation by Sector
          </PanelTitle>
          <div className="flex flex-wrap items-center gap-6">
            <div className="h-52 w-52 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocation}
                    dataKey="value"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {allocation.map((a) => (
                      <Cell key={a.name} fill={a.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2.5">
              {allocation.map((a) => (
                <li
                  key={a.name}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: a.color }}
                    />
                    {a.name}
                  </span>
                  <span className="font-semibold text-foreground">
                    {a.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel>
          <PanelTitle action={<MoreVertical className="size-4 text-muted-foreground" />}>
            Logistics Network Status
          </PanelTitle>
          <NetworkMap className="h-52 w-full" />
        </Panel>
      </div>
    </div>
  )
}
