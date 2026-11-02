'use client'

import { ReactNode } from 'react'
import { useHydrated } from '@/lib/use-hydrated'

export default function StoreGate({ children }: { children: ReactNode }) {
  const hydrated = useHydrated()

  if (!hydrated) {
    return <p className="text-sm text-graphite-600">Loading the shop…</p>
  }

  return children
}
