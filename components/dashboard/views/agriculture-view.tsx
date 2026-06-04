'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from 'recharts'
import {
  Activity,
  Bug,
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
  Wind,
} from 'lucide-react'
import { Panel } from '@/components/dashboard/panel'

type MarkerTone = 'blue' | 'green' | 'red'

type Marker = {
  id: string
  label: string
  value: string
  detail: string
  tone: MarkerTone
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

const toneStyles: Record<
  MarkerTone,
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
}

const analysisFeed = [
  {
    time: '12:04:21',
    text: 'NDVI recalculated for Plot 1B — canopy density +3.2%',
    tone: 'green' as MarkerTone,
  },
  {
    time: '12:03:58',
    text: 'Soil moisture map updated · Sentinel-2 L2A pass',
    tone: 'blue' as MarkerTone,
  },
  {
    time: '12:02:40',
    text: 'Thermal anomaly flagged near Plot 4B boundary',
    tone: 'red' as MarkerTone,
  },
  {
    time: '12:01:12',
    text: 'Cloud cover 6% · imagery confidence 94%',
    tone: 'blue' as MarkerTone,
  },
]

const forecast = [
  { day: 'Hoje', Icon: Sun, temp: '27°', rain: '5%', tone: 'green' as MarkerTone },
  { day: 'Qua', Icon: Cloud, temp: '24°', rain: '20%', tone: 'blue' as MarkerTone },
  { day: 'Qui', Icon: CloudRain, temp: '21°', rain: '70%', tone: 'blue' as MarkerTone },
  { day: 'Sex', Icon: CloudRain, temp: '22°', rain: '55%', tone: 'blue' as MarkerTone },
  { day: 'Sáb', Icon: Sun, temp: '26°', rain: '10%', tone: 'green' as MarkerTone },
]

const moistureTrend = [38, 41, 39, 44, 42, 46, 43, 45].map((v, i) => ({ i, v }))

export function AgricultureView() {
  const [active, setActive] = useState<string>('ndvi')

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Mapa de satélite principal */}
      <div className="lg:col-span-2">
        <Panel className="overflow-hidden p-0">
          {/* Cabeçalho do mapa */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Satellite className="size-5 text-neon-green" />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Satellite Map · Maize Estate
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
          <div className="relative aspect-[16/11] w-full overflow-hidden">
            <img
              src="/satellite-farm-large.png"
              alt="Vista de satélite das fazendas de milho com sobreposição de dados"
              className="size-full object-cover"
              crossOrigin="anonymous"
            />
            {/* Vinheta + tonalidade escura */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
            {/* Grade tática */}
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
            {/* Linha de varredura */}
            <div className="pointer-events-none absolute inset-x-0 h-px bg-neon-green/70 shadow-[0_0_12px_var(--neon-green)] animate-scan" />

            {/* Marcadores de dados */}
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
                  {/* Etiqueta */}
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

            {/* Controles do mapa */}
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

          {/* Legenda de camadas selecionáveis */}
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

      {/* Painel lateral */}
      <div className="space-y-6">
        {/* Análise de imagens de satélite (feed ao vivo) */}
        <Panel>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Activity className="size-4 text-neon-green" />
              Satellite Imagery Analysis
            </h3>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-neon-green">
              <span className="size-2 rounded-full bg-neon-green animate-live" />
              Live
            </span>
          </div>

          {/* Pré-visualização com varredura */}
          <div className="relative mb-4 h-28 overflow-hidden rounded-xl border border-border">
            <img
              src="/satellite-field.png"
              alt="Pré-visualização da imagem de satélite"
              className="size-full object-cover opacity-80"
              crossOrigin="anonymous"
            />
            <div className="pointer-events-none absolute inset-x-0 h-px bg-neon-green/80 shadow-[0_0_10px_var(--neon-green)] animate-scan" />
            <div className="absolute bottom-2 left-2 rounded-md bg-background/70 px-2 py-1 text-[10px] font-medium text-neon-green backdrop-blur-sm">
              Sentinel-2 · 10m/px
            </div>
          </div>

          <div className="space-y-2.5">
            {analysisFeed.map((f) => {
              const s = toneStyles[f.tone]
              return (
                <div key={f.time} className="flex gap-3">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${s.dot} ${s.shadow}`}
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {f.time}
                    </p>
                    <p className="text-xs text-foreground">{f.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
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

          {/* Condição atual */}
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

          {/* Tendência de umidade do solo */}
          <div className="mb-4 h-14 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moistureTrend}>
                <defs>
                  <linearGradient id="moist" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--neon-blue)"
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--neon-blue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--neon-blue)"
                  fill="url(#moist)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Previsão de 5 dias */}
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
  )
}
