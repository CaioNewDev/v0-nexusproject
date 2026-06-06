'use client'

import { useState } from 'react'
import { TopNav, type TabId } from '@/components/dashboard/top-nav'
import { HomeView } from '@/components/dashboard/views/home-view'
import { AgricultureView } from '@/components/dashboard/views/agriculture-view'
import { StrategyView } from '@/components/dashboard/views/strategy-view'
import { ComplianceView } from '@/components/dashboard/views/compliance-view'
import { LogisticsView } from '@/components/dashboard/views/logistics-view'

export default function Page() {
  const [active, setActive] = useState<TabId>('agriculture')

  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        style={{
          background:
            'radial-gradient(900px 500px at 80% -10%, color-mix(in oklch, var(--neon-blue) 18%, transparent), transparent 60%), radial-gradient(700px 500px at 10% 110%, color-mix(in oklch, var(--neon-green) 12%, transparent), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <TopNav active={active} onChange={setActive} />
        <main className="mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
          <div key={active} className="animate-view">
            {active === 'dashboard' && <HomeView />}
            {active === 'agriculture' && <AgricultureView />}
            {active === 'strategy' && <StrategyView />}
            {active === 'compliance' && <ComplianceView />}
            {active === 'logistics' && <LogisticsView />}
          </div>
        </main>
      </div>
    </div>
  )
}
