'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  AlertTriangle,
  Bug,
  CheckCircle2,
  Cloud,
  CloudRain,
  Crosshair,
  Droplets,
  Layers,
  Leaf,
  Maximize2,
  Minus,
  Plus,
  Satellite,
  Sun,
  TrendingUp,
  Wind,
} from 'lucide-react'
import { Panel } from '@/components/dashboard/panel'

type Tone = 'blue' | 'green' | 'red' | 'amber'

const toneStyles: Record<
  Tone,
  { dot: string; ring: string; text: string; chip: string; shadow: string }
> = {
  blue: {
    dot: 'bg-neon-blue',
    ring: 'bg-neon-blue/60',
    text: 'text-neon-blue',
    chip: 'border-neon-blue/40 bg-neon-blue/10',
    shadow: 'drop-shadow-[0_0_10px_var(--neon-blue)]',
  },
  green: {
    dot: 'bg-neon-green',
    ring: 'bg-neon-green/60',
    text: 'text-neon-green',
    chip: 'border-neon-green/40 bg-neon-green/10',
    shadow: 'drop-shadow-[0_0_10px_var(--neon-green)]',
  },
  red: {
    dot: 'bg-neon-red',
    ring: 'bg-neon-red/60',
    text: 'text-neon-red',
    chip: 'border-neon-red/40 bg-neon-red/10',
    shadow: 'drop-shadow-[0_0_10px_var(--neon-red)]',
  },
  amber: {
    dot: 'bg-neon-amber',
    ring: 'bg-neon-amber/60',
    text: 'text-neon-amber',
    chip: 'border-neon-amber/40 bg-neon-amber/10',
    shadow: 'drop-shadow-[0_0_10px_var(--neon-amber)]',
  },
}

/* ---------------- KPIs ---------------- */

type Kpi = {
  label: string
  value: string
  unit?: string
  delta: string
  deltaUp: boolean
  tone: Tone
  Icon: typeof Droplets
  spark: number[]
}

const kpis: Kpi[] = [
  {
    label: 'Soil Moisture',
    value: '42',
    unit: '%',
    delta: '+2.4%',
    deltaUp: true,
    tone: 'blue',
    Icon: Droplets,
    spark: [38, 41, 39, 44, 42, 46, 43, 45],
  },
  {
    label: 'Crop Health Index',
    value: '94.2',
    unit: '%',
    delta: '+1.8%',
    deltaUp: true,
    tone: 'green',
    Icon: Leaf,
    spark: [88, 90, 89, 91, 92, 93, 93, 94],
  },
  {
    label: 'Active Weather Alerts',
    value: '3',
    delta: '+1 today',
    deltaUp: false,
    tone: 'amber',
    Icon: AlertTriangle,
    spark: [1, 1, 2, 2, 1, 2, 3, 3],
  },
  {
    label: 'Pest Risk Zones',
    value: '2',
    delta: 'Plot 4B critical',
    deltaUp: false,
    tone: 'red',
    Icon: Bug,
    spark: [0, 1, 1, 1, 2, 1, 2, 2],
  },
]

/* ---------------- Map markers ---------------- */

type Marker = {
  id: string
  label: string
  value: string
  detail: string
  tone: Tone
  Icon: typeof Droplets
  top: string
  left: string
}

const markers: Marker[] = [
  {
    id: 'soil',
    label: 'Soil Moisture',
    value: '42%',
    detail: 'Plot 3A · Optimal',
    tone: 'blue',
    Icon: Droplets,
    top: '34%',
    left: '24%',
  },
  {
    id: 'ndvi',
    label: 'NDVI Index',
    value: '0.81',
    detail: 'Plot 1B · Vigorous canopy',
    tone: 'green',
    Icon: Leaf,
    top: '58%',
    left: '52%',
  },
  {
    id: 'pest',
    label: 'Pest Risk',
    value: 'High',
    detail: 'Plot 4B · Action needed',
    tone: 'red',
    Icon: Bug,
    top: '40%',
    left: '72%',
  },
]

/* ---------------- Yield prediction vs historical ---------------- */

const yieldData = [
  { month: 'Mar', historical: 3.2, predicted: 3.4 },
  { month: 'Apr', historical: 4.1, predicted: 4.6 },
  { month: 'May', historical: 4.8, predicted: 5.5 },
  { month: 'Jun', historical: 5.6, predicted: 6.4 },
  { month: 'Jul', historical: 7.2, predicted: 8.1 },
  { month: 'Aug', historical: 8.4, predicted: 9.6 },
  { month: 'Sep', historical: 9.1, predicted: 10.4 },
]

/* ---------------- Activity feed / alerts ---------------- */

type FeedItem = {
  time: string
  title: string
  text: string
  tone: Tone
  Icon: typeof Droplets
}

const activityFeed: FeedItem[] = [
  {
    time: '2m ago',
    title: 'Pest Detection',
    text: 'High severity flagged on Plot 4B — scout dispatched.',
    tone: 'red',
    Icon: Bug,
  },
  {
    time: '8m ago',
    title: 'Irrigation Cycle',
    text: 'Zone 3 completed · 1,240 L delivered.',
    tone: 'blue',
    Icon: Droplets,
  },
  {
    time: '15m ago',
    title: 'NDVI Recalculated',
    text: 'Plot 1B canopy density up +3.2% this week.',
    tone: 'green',
    Icon: Leaf,
  },
  {
    time: '22m ago',
    title: 'Storm Warning',
    text: 'Heavy rainfall expected Thursday — 70% chance.',
    tone: 'amber',
    Icon: CloudRain,
  },
  {
    time: '34m ago',
    title: 'Inspection Passed',
    text: 'Plot 2A soil sampling within optimal range.',
    tone: 'green',
    Icon: CheckCircle2,
  },
]

/* ---------------- Weather forecast ---------------- */

const forecast = [
  { day: 'Hoje', Icon: Sun, temp: '27°', rain: '5%', tone: 'green' as Tone },
  { day: 'Qua', Icon: Cloud, temp: '24°', rain: '20%', tone: 'blue' as Tone },
  { day: 'Qui', Icon: CloudRain, temp: '21°', rain: '70%', tone: 'blue' as Tone },
  { day: 'Sex', Icon: CloudRain, temp: '22°', rain: '55%', tone: 'blue' as Tone },
  { day: 'Sáb', Icon: Sun, temp: '26°', rain: '10%', tone: 'green' as Tone },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur-md">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="size-2 rounded-full"
            style={{ background: p.color || p.stroke || p.fill }}
          />
          {p.name}: <span className="font-semibold text-foreground">{p.value} t/ha</span>
        </p>
      ))}
    </div>
  )
}

export function AgricultureView() {
  const [active, setActive] = useState<string>('ndvi')

  return (
    <div className="space-y-6">
      {/* Linha de KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const s = toneStyles[k.tone]
          const data = k.spark.map((v, i) => ({ i, v }))
          return (
            <Panel key={k.label} className="p-4">
              <div className="flex items-start justify-between">
                <span
                  className={`flex size-10 items-center justify-center rounded-xl border ${s.chip}`}
                >
                  <k.Icon className={`size-5 ${s.text}`} />
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    k.deltaUp
                      ? 'bg-neon-green/10 text-neon-green'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {k.deltaUp && <TrendingUp className="size-3" />}
                  {k.delta}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{k.label}</p>
              <div className="flex items-end justify-between gap-2">
                <p className="text-2xl font-bold text-foreground">
                  {k.value}
                  {k.unit && (
                    <span className="ml-0.5 text-sm font-medium text-muted-foreground">
                      {k.unit}
                    </span>
                  )}
                </p>
                <div className="h-9 w-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient
                          id={`spark-${k.label}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor={`var(--neon-${k.tone})`}
                            stopOpacity={0.5}
                          />
                          <stop
                            offset="100%"
                            stopColor={`var(--neon-${k.tone})`}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke={`var(--neon-${k.tone})`}
                        fill={`url(#spark-${k.label})`}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Panel>
          )
        })}
      </div>

      {/* Mapa principal + painel lateral */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel className="overflow-hidden p-0">
            {/* Cabeçalho do mapa */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <Satellite className="size-5 text-neon-green" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Crop Monitoring · Maize Estate
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Live multispectral overlay · 3.46 S, 60.01 W
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-neon-red/40 bg-neon-red/10 px-2.5 py-1 text-xs font-semibold text-neon-red">
                <span className="size-2 rounded-full bg-neon-red animate-live" />
                LIVE
              </span>
            </div>

            {/* Área do mapa */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src="/satellite-farm-large.png"
                alt="Vista de satélite das fazendas de milho com sobreposição de dados"
                className="size-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--neon-green) 1px, transparent 1px), linear-gradient(90deg, var(--neon-green) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                  maskImage:
                    'radial-gradient(ellipse at center, black 40%, transparent 80%)',
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 h-px bg-neon-green/70 shadow-[0_0_12px_var(--neon-green)] animate-scan" />

              {/* Marcadores */}
              {markers.map((m) => {
                const s = toneStyles[m.tone]
                const isActive = active === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActive(m.id)}
                    style={{ top: m.top, left: m.left }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                    aria-label={`${m.label}: ${m.value}`}
                  >
                    <span className="relative flex size-4 items-center justify-center">
                      <span
                        className={`absolute inline-flex size-4 rounded-full ${s.ring} marker-pulse-ring`}
                      />
                      <span
                        className={`relative inline-flex size-3 rounded-full ${s.dot} ${s.shadow}`}
                      />
                    </span>
                    <span
                      className={`absolute left-1/2 top-5 w-max -translate-x-1/2 rounded-lg border px-2.5 py-1.5 text-left backdrop-blur-md transition-all ${
                        s.chip
                      } ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                        <m.Icon className={`size-3.5 ${s.text}`} />
                        {m.label}
                      </span>
                      <span className={`text-sm font-bold ${s.text}`}>
                        {m.value}
                      </span>
                      <span className="block text-[10px] text-muted-foreground">
                        {m.detail}
                      </span>
                    </span>
                  </button>
                )
              })}

              {/* Controles */}
              <div className="absolute right-3 top-3 flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-border bg-card/80 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:border-neon-green/50 hover:text-neon-green"
                  aria-label="Camadas do mapa"
                >
                  <Layers className="size-4" />
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-border bg-card/80 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:border-neon-green/50 hover:text-neon-green"
                  aria-label="Tela cheia"
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
              <div className="absolute bottom-3 right-3 flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-border bg-card/80 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:border-neon-green/50 hover:text-neon-green"
                  aria-label="Aproximar"
                >
                  <Plus className="size-4" />
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-border bg-card/80 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:border-neon-green/50 hover:text-neon-green"
                  aria-label="Afastar"
                >
                  <Minus className="size-4" />
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-border bg-card/80 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:border-neon-green/50 hover:text-neon-green"
                  aria-label="Centralizar"
                >
                  <Crosshair className="size-4" />
                </button>
              </div>
            </div>

            {/* Legenda selecionável */}
            <div className="grid grid-cols-3 gap-px bg-border">
              {markers.map((m) => {
                const s = toneStyles[m.tone]
                const isActive = active === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActive(m.id)}
                    className={`flex items-center gap-3 bg-card px-4 py-3 text-left transition-colors hover:bg-accent ${
                      isActive ? 'bg-accent' : ''
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg border ${s.chip}`}
                    >
                      <m.Icon className={`size-4 ${s.text}`} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs text-muted-foreground">
                        {m.label}
                      </span>
                      <span className={`block text-base font-bold ${s.text}`}>
                        {m.value}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </Panel>
        </div>

        {/* Painel lateral: Activity Feed / Recent Alerts */}
        <div className="space-y-6">
          <Panel className="flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Activity className="size-4 text-neon-green" />
                Activity Feed
              </h3>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-neon-green">
                <span className="size-2 rounded-full bg-neon-green animate-live" />
                Live
              </span>
            </div>

            <div className="relative space-y-4 pl-1">
              {/* Linha do tempo */}
              <span className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
              {activityFeed.map((f) => {
                const s = toneStyles[f.tone]
                return (
                  <div key={f.time} className="relative flex gap-3">
                    <span
                      className={`relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full border ${s.chip}`}
                    >
                      <f.Icon className={`size-3.5 ${s.text}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {f.title}
                        </p>
                        <span className="shrink-0 text-[10px] text-muted-foreground">
                          {f.time}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{f.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-lg border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-neon-green/50 hover:text-neon-green"
            >
              View all activity
            </button>
          </Panel>

          {/* Previsão do tempo */}
          <Panel>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Cloud className="size-4 text-neon-blue" />
                Weather Forecast
              </h3>
              <span className="text-xs text-muted-foreground">Amazonas, BR</span>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-xl border border-neon-blue/30 bg-neon-blue/5 p-3">
              <div className="flex items-center gap-3">
                <Sun className="size-8 text-neon-amber drop-shadow-[0_0_10px_var(--neon-amber)]" />
                <div>
                  <p className="text-2xl font-bold text-foreground">27°C</p>
                  <p className="text-xs text-muted-foreground">Ensolarado</p>
                </div>
              </div>
              <div className="space-y-1 text-right text-xs text-muted-foreground">
                <p className="flex items-center justify-end gap-1.5">
                  <Droplets className="size-3.5 text-neon-blue" /> Umidade 58%
                </p>
                <p className="flex items-center justify-end gap-1.5">
                  <Wind className="size-3.5 text-neon-cyan" /> Vento 12 km/h
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {forecast.map((d) => {
                const s = toneStyles[d.tone]
                return (
                  <div
                    key={d.day}
                    className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card/60 py-2"
                  >
                    <span className="text-[10px] text-muted-foreground">
                      {d.day}
                    </span>
                    <d.Icon className={`size-4 ${s.text}`} />
                    <span className="text-xs font-semibold text-foreground">
                      {d.temp}
                    </span>
                    <span className="text-[10px] text-neon-blue">{d.rain}</span>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>

      {/* Gráfico: Previsão de Safra vs Histórico */}
      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Yield Prediction vs. Historical Data
            </h3>
            <p className="text-xs text-muted-foreground">
              Maize · tons per hectare · 2024 season
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-sm bg-neon-blue" /> Historical
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span className="size-2.5 rounded-full bg-neon-green" /> Predicted
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={yieldData}
              margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="predArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--neon-green)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--neon-green)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                unit="t"
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--accent)', opacity: 0.4 }} />
              <Bar
                dataKey="historical"
                name="Historical"
                radius={[4, 4, 0, 0]}
                barSize={22}
              >
                {yieldData.map((_, i) => (
                  <Cell key={i} fill="var(--neon-blue)" fillOpacity={0.55} />
                ))}
              </Bar>
              <Area
                type="monotone"
                dataKey="predicted"
                name="Predicted"
                stroke="var(--neon-green)"
                fill="url(#predArea)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: 'var(--neon-green)' }}
                activeDot={{ r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  )
}
