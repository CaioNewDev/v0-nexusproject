'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { CheckCircle2, ChevronDown, Clock, MapPin } from 'lucide-react'
import { Panel } from '@/components/dashboard/panel'
import { GenerateReportButton } from '@/components/dashboard/generate-report-button'

const carbon = [
  { m: 'Jan', v: 250 },
  { m: 'Feb', v: 420 },
  { m: 'Mar', v: 360 },
  { m: 'Apr', v: 520 },
  { m: 'May', v: 700 },
  { m: 'Jun', v: 760 },
  { m: 'Jul', v: 950 },
  { m: 'Aug', v: 1080 },
  { m: 'Sep', v: 1180 },
  { m: 'Oct', v: 1320 },
  { m: 'Nov', v: 1620 },
  { m: 'Dec', v: 1850 },
]

const items = [
  { t: 'Environmental Permit #3411', status: 'VERIFIED', date: null },
  { t: 'Land Use Certification', status: 'PENDING', date: null },
  { t: 'Deforestation Monitoring', status: 'VERIFIED', date: 'Jan 14, 2023' },
  { t: 'Water Usage Reports', status: 'PENDING', date: 'Jan 08, 2023' },
  { t: 'Legal Documentation', status: 'VERIFIED', date: null },
]

export function ComplianceView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <GenerateReportButton accent="cyan" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel className="overflow-hidden p-0">
          <div className="relative h-full min-h-[520px]">
            <img
              src="/amazon-satellite.png"
              alt="Imagem de satélite da Reserva Florestal Amazônica - Área A"
              className="absolute inset-0 size-full object-cover"
            />
            <svg
              viewBox="0 0 400 520"
              className="absolute inset-0 size-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M150 70 L250 90 L270 200 L230 280 L255 360 L200 440 L150 400 L130 300 L100 220 L120 140 Z"
                fill="var(--neon-green)"
                fillOpacity="0.28"
                stroke="var(--neon-green)"
                strokeWidth="2.5"
              />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-lg border border-border bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
                Amazon Forest Reserve - Area A
              </div>
              <MapPin className="mx-auto mt-1 size-6 text-neon-green drop-shadow-[0_0_8px_var(--neon-green)]" />
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-background/85 p-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-lg bg-neon-green/10">
                  <MapPin className="size-6 text-neon-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Amazon Forest Reserve - Area A
                  </p>
                  <p className="text-xs text-muted-foreground">Boundary Map</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    3.46 S, 60.01 W
                  </p>
                </div>
              </div>
              <div className="grid size-14 place-items-center rounded-lg border border-neon-green/40 bg-neon-green/5">
                <div className="size-6 rounded border border-neon-green/60" />
              </div>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Compliance Checklist
            </h3>
            <div className="mb-2 flex items-center justify-between rounded-lg bg-accent px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <ChevronDown className="size-4" /> Regulatory Compliance
              </span>
              <span className="text-xs text-neon-green">75% Complete</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 px-1 pb-2 text-[11px] uppercase tracking-wide text-muted-foreground">
              <span>Item</span>
              <span className="text-right">Status</span>
              <span className="text-right">Icon</span>
            </div>
            <ul>
              {items.map((it) => {
                const verified = it.status === 'VERIFIED'
                return (
                  <li
                    key={it.t}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-t border-border py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="size-4 rounded border border-border" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {it.t}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded bg-neon-cyan/10 px-1.5 py-0.5 text-[10px] font-semibold text-neon-cyan">
                            AI VERIFIED
                          </span>
                          {it.date && (
                            <span className="text-[11px] text-muted-foreground">
                              {it.date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`justify-self-end rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                        verified
                          ? 'border-neon-green/50 text-neon-green'
                          : 'border-neon-amber/50 text-neon-amber'
                      }`}
                    >
                      {it.status}
                    </span>
                    {verified ? (
                      <CheckCircle2 className="size-5 justify-self-end text-neon-green" />
                    ) : (
                      <Clock className="size-5 justify-self-end text-neon-amber" />
                    )}
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel>
            <div className="mb-1 flex items-start justify-between">
              <h3 className="text-base font-semibold text-foreground">
                Carbon Credit Balance
              </h3>
              <p className="text-sm font-semibold text-neon-green">+12.5%</p>
            </div>
            <div className="mb-4 flex items-end justify-between">
              <p className="text-sm text-muted-foreground">
                Current Balance:{' '}
                <span className="font-bold text-foreground">1,450 tCO2e</span>
              </p>
              <p className="text-xs text-muted-foreground">Monthly Growth</p>
            </div>
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={carbon}
                  margin={{ top: 10, right: 6, bottom: 0, left: -10 }}
                >
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="m"
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 2000]}
                    ticks={[0, 500, 1000, 1500, 2000]}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="var(--neon-cyan)"
                    strokeWidth={3}
                    dot={{ r: 3, fill: 'var(--neon-cyan)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
