'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import {
  CalendarDays,
  CheckCircle2,
  Info,
  Lightbulb,
  Mail,
} from 'lucide-react'
import { Panel, PanelTitle } from '@/components/dashboard/panel'
import { GenerateReportButton } from '@/components/dashboard/generate-report-button'

const financial = [
  { m: 'Jan 1', revenue: 8, cost: 5 },
  { m: 'Mar 2', revenue: 13, cost: 7 },
  { m: 'Mar 3', revenue: 11, cost: 6 },
  { m: 'Apr 4', revenue: 16, cost: 9 },
  { m: 'Sep 5', revenue: 15, cost: 11 },
  { m: 'Jan 8', revenue: 20, cost: 13 },
  { m: 'Oct 2', revenue: 23, cost: 15 },
]

const demand = [
  { y: '2019', demand: 1.4, supply: 0.9 },
  { y: '2020', demand: 1.9, supply: 1.3 },
  { y: '2021', demand: 2.4, supply: 1.8 },
  { y: '2022', demand: 3.0, supply: 2.2 },
  { y: '2023', demand: 3.6, supply: 2.6 },
]

const allocation = [
  { k: 'Capital', v: 82 },
  { k: 'Human', v: 72 },
  { k: 'Equipment', v: 50 },
  { k: 'R&D', v: 32 },
]

const suppliers = [
  { n: 'Agroworld Ltd.', s: 'Contacted', t: '3:06 AM', tone: 'text-neon-green' },
  { n: 'BioSeeds Inc.', s: 'Pending', t: '2:35 AM', tone: 'text-neon-amber' },
  { n: 'EuroCrop', s: 'Follow-up Required', t: '3:45 AM', tone: 'text-neon-cyan' },
  { n: 'GlobalAg', s: 'Completed', t: '12:45 AM', tone: 'text-neon-green' },
]

export function StrategyView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Nexus Strategic Overview{' '}
          <span className="font-normal text-muted-foreground">
            | Sarah Chen | Oct 26, 2023
          </span>
        </h1>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-xl border border-border bg-card/40 px-3 py-2.5 text-sm text-muted-foreground">
            <CalendarDays className="size-4" /> Oct 28, 2023 ▾
          </span>
          <GenerateReportButton accent="green" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="mb-2 flex items-start justify-between">
            <PanelTitle className="mb-0">Financial Impact Analysis</PanelTitle>
            <div className="text-right">
              <p className="text-xs font-semibold text-neon-green">(+8.5%)</p>
              <p className="text-xl font-bold text-foreground">€42.1M</p>
            </div>
          </div>
          <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-neon-blue" /> Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-neon-green" /> Cost
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-neon-cyan" /> Profit
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={financial}
                margin={{ top: 10, right: 10, bottom: 0, left: -18 }}
              >
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="cst" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-green)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--neon-green)" stopOpacity={0} />
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
                  tickFormatter={(v) => `€${v}M`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--neon-blue)"
                  fill="url(#rev)"
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="cost"
                  stroke="var(--neon-green)"
                  fill="url(#cst)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelTitle>Insights &amp; Actions</PanelTitle>
          <div className="rounded-xl border border-neon-green/30 bg-neon-green/5 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="grid size-7 place-items-center rounded-lg bg-neon-blue/15 text-neon-blue">
                  AI
                </span>
                Strategist Recommendations
              </span>
              <Lightbulb className="size-5 text-neon-green text-glow-green" />
            </div>
            <ul className="space-y-3 text-sm">
              {[
                'Optimize supply chain routes in LATAM region by 14% to reduce costs',
                'Invest 22% in R&D for AgriTech sustainability (due 11/1)',
                'Analyze competitor compliance changes in EMEA',
              ].map((r) => (
                <li key={r} className="flex gap-2 text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neon-green" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Market Demand vs Supply
            </h3>
            <span className="text-xs text-muted-foreground">
              Gap: <span className="text-neon-cyan">1.2M Tons</span>
            </span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={demand}
                margin={{ top: 6, right: 6, bottom: 0, left: -22 }}
              >
                <defs>
                  <linearGradient id="dem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-blue)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--neon-blue)" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="sup" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-green)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--neon-green)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="y"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}M`}
                />
                <Area type="monotone" dataKey="demand" stroke="var(--neon-blue)" fill="url(#dem)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="supply" stroke="var(--neon-green)" fill="url(#sup)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">
              Resource Allocation Metrics
            </h3>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">82%</p>
              <p className="text-[10px] text-muted-foreground">Efficiency</p>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={allocation}
                margin={{ top: 16, right: 6, bottom: 0, left: -22 }}
              >
                <defs>
                  <linearGradient id="alloc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--neon-cyan)" />
                    <stop offset="100%" stopColor="var(--neon-green)" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="k"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Bar dataKey="v" fill="url(#alloc)" radius={[6, 6, 0, 0]} barSize={34}>
                  {allocation.map((a) => (
                    <Cell key={a.k} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel>
          <PanelTitle>Automated Supplier Contact Status</PanelTitle>
          <ul className="space-y-1">
            {suppliers.map((s) => (
              <li
                key={s.n}
                className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent text-muted-foreground">
                    <Mail className="size-4" />
                  </span>
                  <span>
                    <p className="text-sm font-medium text-foreground">{s.n}</p>
                    <p className={`text-xs ${s.tone}`}>{s.s}</p>
                  </span>
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  {s.t}
                  <Info className="size-3.5" />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}
