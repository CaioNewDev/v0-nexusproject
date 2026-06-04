'use client'

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { AlertTriangle, ChevronUp, MapPin, TriangleAlert } from 'lucide-react'
import { Panel } from '@/components/dashboard/panel'

const spark = [3, 5, 4, 6, 5, 7, 6, 8].map((v, i) => ({ i, v }))
const wave = [4, 6, 3, 7, 4, 6, 4].map((v, i) => ({ i, v }))

const yield2024 = [
  { m: 'Mar', actual: 2.4, projected: null },
  { m: 'Apr', actual: 4.2, projected: null },
  { m: 'May', actual: 4.8, projected: null },
  { m: 'Jun', actual: 6.4, projected: null },
  { m: 'Jul', actual: 8.6, projected: 8.6 },
  { m: 'Aug', actual: null, projected: 9.6 },
  { m: 'Sep', actual: null, projected: 9.9 },
]

const alerts = [
  {
    t: 'Pest Detection',
    time: '5m ago',
    lines: ['Severity: High', 'Plot 4B'],
    tone: 'amber',
    Icon: TriangleAlert,
  },
  {
    t: 'Irrigation Issue',
    time: '15m ago',
    lines: ['Low Flow', 'Zone 9'],
    tone: 'red',
    Icon: AlertTriangle,
  },
  {
    t: 'Nutrient Deficiency',
    time: '1m ago',
    lines: ['Nitrogen', 'Plot 1A'],
    tone: 'amber',
    Icon: TriangleAlert,
  },
]

const toneMap = {
  amber: 'border-neon-amber/40 bg-neon-amber/5 text-neon-amber',
  red: 'border-neon-red/40 bg-neon-red/5 text-neon-red',
}

export function AgricultureView() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Panel glow="green" className="border-neon-green/40">
            <p className="text-sm text-muted-foreground">Crop Health</p>
            <p className="mt-1 text-4xl font-bold text-neon-green text-glow-green">
              94.2%
            </p>
            <div className="my-2 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={spark}>
                  <Bar dataKey="v" fill="var(--neon-green)" radius={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground">
              Status: <span className="text-neon-green">Healthy</span>
            </p>
          </Panel>

          <Panel className="border-neon-blue/40">
            <p className="text-sm text-muted-foreground">Carbon Emissions</p>
            <p className="mt-1 text-3xl font-bold text-neon-blue">
              312{' '}
              <span className="text-base font-normal text-muted-foreground">
                CO₂e/ha
              </span>
            </p>
            <div className="mt-3 inline-flex items-center gap-1 rounded-md bg-neon-blue/10 px-2 py-1 text-xs font-semibold text-neon-blue">
              ▼ -4.5%
            </div>
          </Panel>

          <Panel className="border-neon-green/40">
            <p className="text-sm text-muted-foreground">Water Stress</p>
            <p className="mt-1 text-3xl font-bold text-neon-green text-glow-green">
              Low
            </p>
            <p className="text-xs text-muted-foreground">2.1 m²/ha</p>
            <div className="mt-2 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wave}>
                  <defs>
                    <linearGradient id="ws" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--neon-green)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--neon-green)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--neon-green)"
                    fill="url(#ws)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <Panel>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-foreground">
              Yield Prediction - Maize (2024)
            </h3>
            <span className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
              Time ▾
            </span>
          </div>
          <div className="mb-3 flex items-center justify-end gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-0.5 w-4 bg-neon-cyan" /> Actual
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-0.5 w-4 border-t border-dashed border-neon-green" />{' '}
              Projected
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={yield2024}
                margin={{ top: 10, right: 10, bottom: 0, left: -18 }}
              >
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis
                  dataKey="m"
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 15]}
                  ticks={[0, 4, 6, 9, 10, 15]}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="var(--neon-cyan)"
                  strokeWidth={3}
                  dot={{ r: 3, fill: 'var(--neon-cyan)' }}
                  connectNulls
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="var(--neon-green)"
                  strokeWidth={3}
                  strokeDasharray="6 6"
                  dot={false}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="space-y-6">
        <Panel className="overflow-hidden p-0">
          <div className="relative h-48">
            <img
              src="/satellite-field.png"
              alt="Vista de satélite do campo agrícola"
              className="size-full object-cover"
            />
            <MapPin className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-full text-neon-green drop-shadow-[0_0_8px_var(--neon-green)]" />
          </div>
        </Panel>

        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-foreground">AI ALERTS</h3>
            <ChevronUp className="size-4 text-muted-foreground" />
          </div>
          <p className="mb-4 text-xs text-muted-foreground">
            Warning notifications
          </p>
          <div className="space-y-3">
            {alerts.map((a) => {
              const Icon = a.Icon
              return (
                <div
                  key={a.t}
                  className={`rounded-xl border p-3 ${toneMap[a.tone as 'amber' | 'red']}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Icon className="size-4" />
                      {a.t}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {a.time}
                    </span>
                  </div>
                  <div className="mt-1 pl-6 text-xs text-muted-foreground">
                    {a.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </Panel>
      </div>
    </div>
  )
}
