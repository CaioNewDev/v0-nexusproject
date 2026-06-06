'use client'

import { useEffect, useState } from 'react'
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
  Droplets,
  Leaf,
  Satellite,
  Sun,
  TrendingUp,
  Wind,
} from 'lucide-react'
import { Panel } from '@/components/dashboard/panel'
const RealMap = dynamic(
  () => import('@/components/RealMap').then((mod) => mod.default || mod.RealMap),
  { ssr: false }
);
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

/* ---------------- Weather (Open-Meteo) ---------------- */

const SAO_PAULO = { latitude: -23.55, longitude: -46.63, label: 'São Paulo, BR' }

type OpenMeteoResponse = {
  current: {
    temperature_2m: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    precipitation_probability_max: number[]
  }
}

type ForecastDay = {
  day: string
  Icon: typeof Sun
  temp: string
  rain: string
  tone: Tone
}

function weatherCodeToCondition(code: number): string {
  if (code === 0) return 'Ensolarado'
  if (code <= 3) return 'Parcialmente nublado'
  if (code <= 48) return 'Neblina'
  if (code <= 55) return 'Garoa'
  if (code <= 65) return 'Chuvoso'
  if (code <= 75) return 'Neve'
  if (code <= 82) return 'Pancadas de chuva'
  if (code <= 99) return 'Tempestade'
  return 'Indefinido'
}

function weatherCodeToIcon(code: number): typeof Sun {
  if (code === 0) return Sun
  if (code <= 3) return Cloud
  if (code <= 48) return Cloud
  if (code <= 82) return CloudRain
  return CloudRain
}

function weatherCodeToTone(code: number): Tone {
  if (code === 0) return 'green'
  if (code <= 3) return 'green'
  if (code <= 65) return 'blue'
  return 'amber'
}

function formatForecastDays(daily: OpenMeteoResponse['daily']): ForecastDay[] {
  const today = new Date().toLocaleDateString('pt-BR')

  return daily.time.slice(0, 5).map((dateStr, index) => {
    const date = new Date(`${dateStr}T12:00:00`)
    const dayLabel =
      date.toLocaleDateString('pt-BR') === today
        ? 'Hoje'
        : date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')

    return {
      day: dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1),
      Icon: weatherCodeToIcon(daily.weather_code[index]),
      temp: `${Math.round(daily.temperature_2m_max[index])}°`,
      rain: `${daily.precipitation_probability_max[index] ?? 0}%`,
      tone: weatherCodeToTone(daily.weather_code[index]),
    }
  })
}

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
  const [now, setNow] = useState(() => new Date())
  const [weather, setWeather] = useState<OpenMeteoResponse | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchWeather() {
      setWeatherLoading(true)
      setWeatherError(null)

      try {
        const params = new URLSearchParams({
          latitude: String(SAO_PAULO.latitude),
          longitude: String(SAO_PAULO.longitude),
          current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
          daily: 'weather_code,temperature_2m_max,precipitation_probability_max',
          timezone: 'America/Sao_Paulo',
          forecast_days: '5',
        })

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const data: OpenMeteoResponse = await response.json()
        setWeather(data)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setWeatherError('Unable to load weather data')
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
    return () => controller.abort()
  }, [])

  const currentWeatherCode = weather?.current.weather_code ?? 0
  const CurrentWeatherIcon = weatherCodeToIcon(currentWeatherCode)
  const forecast = weather ? formatForecastDays(weather.daily) : []

  const formattedDate = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

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
                    Crop Monitoring · Fazenda Santa Maria do Monjolinho
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    São Carlos, SP · 21.98° S, 47.90° W
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-neon-red/40 bg-neon-red/10 px-2.5 py-1 text-xs font-semibold text-neon-red">
                <span className="size-2 rounded-full bg-neon-red animate-live" />
                LIVE
              </span>
            </div>

            <RealMap className="aspect-[16/10] w-full min-h-[320px] border-0" />

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
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                <Cloud className="size-4 text-neon-blue" />
                Weather Forecast
              </h3>
              <div className="text-right">
                <p className="text-xs font-medium text-muted-foreground">
                  {SAO_PAULO.label}
                </p>
                <p className="text-[11px] capitalize text-muted-foreground">
                  {formattedDate}
                </p>
                <p className="font-mono text-sm font-semibold tabular-nums text-foreground" suppressHydrationWarning>
                  {formattedTime}
                </p>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between rounded-xl border border-neon-blue/30 bg-neon-blue/5 p-3">
              <div className="flex items-center gap-3">
                <CurrentWeatherIcon className="size-8 text-neon-amber drop-shadow-[0_0_10px_var(--neon-amber)]" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {weatherLoading
                      ? '—'
                      : weatherError
                        ? '—'
                        : `${Math.round(weather?.current?.temperature_2m || 0)}°C`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {weatherLoading
                      ? 'Carregando...'
                      : weatherError
                        ? weatherError
                        : weatherCodeToCondition(currentWeatherCode)}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-right text-xs text-muted-foreground">
                <p className="flex items-center justify-end gap-1.5">
                  <Droplets className="size-3.5 text-neon-blue" /> Umidade{' '}
                  {weatherLoading || weatherError || !weather
                    ? '—'
                    : `${weather.current.relative_humidity_2m}%`}
                </p>
                <p className="flex items-center justify-end gap-1.5">
                  <Wind className="size-3.5 text-neon-cyan" /> Vento{' '}
                  {weatherLoading || weatherError || !weather
                    ? '—'
                    : `${Math.round(weather.current.wind_speed_10m)} km/h`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {weatherLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 rounded-lg border border-border bg-card/60 py-2"
                    >
                      <span className="text-[10px] text-muted-foreground">—</span>
                      <Cloud className="size-4 text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground">
                        —
                      </span>
                      <span className="text-[10px] text-muted-foreground">—</span>
                    </div>
                  ))
                : forecast.map((d) => {
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
