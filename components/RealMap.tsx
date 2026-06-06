'use client'

import { FormEvent, useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import { Loader2, MapPin, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import 'leaflet/dist/leaflet.css'

const FARM_CENTER: LatLngExpression = [-21.98, -47.9]
const DEFAULT_ZOOM = 15
const SEARCH_ZOOM = 15

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type NominatimResult = {
  lat: string
  lon: string
  display_name: string
}

type FlyTarget = {
  lat: number
  lng: number
  zoom: number
}

type SearchMarker = {
  position: LatLngExpression
  label: string
}

function MapFlyTo({ target }: { target: FlyTarget | null }) {
  const map = useMap()

  useEffect(() => {
    if (!target) return
    map.flyTo([target.lat, target.lng], target.zoom, { duration: 1.5 })
  }, [map, target])

  return null
}

async function searchAddress(query: string): Promise<NominatimResult | null> {
  const params = new URLSearchParams({
    format: 'json',
    q: query,
    limit: '1',
    countrycodes: 'br',
  })

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'pt-BR,pt;q=0.9',
      },
    },
  )

  if (!response.ok) {
    throw new Error('Não foi possível consultar o endereço.')
  }

  const results: NominatimResult[] = await response.json()
  return results[0] ?? null
}

export function RealMap({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const [query, setQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [flyTarget, setFlyTarget] = useState<FlyTarget | null>(null)
  const [searchMarker, setSearchMarker] = useState<SearchMarker | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleSearch(event?: FormEvent) {
    event?.preventDefault()

    const trimmed = query.trim()
    if (!trimmed) {
      setSearchError('Digite um endereço para buscar.')
      return
    }

    setSearchLoading(true)
    setSearchError(null)

    try {
      const result = await searchAddress(trimmed)

      if (!result) {
        setSearchError('Nenhum resultado encontrado para este endereço.')
        return
      }

      const lat = Number.parseFloat(result.lat)
      const lng = Number.parseFloat(result.lon)

      setSearchMarker({
        position: [lat, lng],
        label: result.display_name,
      })
      setFlyTarget({ lat, lng, zoom: SEARCH_ZOOM })
    } catch {
      setSearchError('Erro ao buscar endereço. Tente novamente.')
    } finally {
      setSearchLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col overflow-hidden bg-[#0b1220]', className)}>
      <form
        onSubmit={handleSearch}
        className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-card/80 px-3 py-2 backdrop-blur-md"
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar endereço (ex: Fazenda Santa Maria, São Carlos SP)"
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-neon-green/50"
          />
        </div>
        <button
          type="submit"
          disabled={searchLoading}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-neon-green/40 bg-neon-green/10 px-3 text-sm font-medium text-neon-green transition-colors hover:bg-neon-green/20 disabled:opacity-60"
        >
          {searchLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <MapPin className="size-4" />
          )}
          Buscar
        </button>
      </form>

      {searchError && (
        <p className="shrink-0 border-b border-border bg-neon-red/5 px-3 py-1.5 text-xs text-neon-red">
          {searchError}
        </p>
      )}

      <div className="relative min-h-0 flex-1">
        {mounted ? (
          <MapContainer
            center={FARM_CENTER}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapFlyTo target={flyTarget} />
            {searchMarker && (
              <Marker position={searchMarker.position} icon={markerIcon}>
                <Popup>{searchMarker.label}</Popup>
              </Marker>
            )}
          </MapContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            Carregando mapa...
          </div>
        )}
      </div>
    </div>
  )
}
