'use client'

import { useSyncExternalStore } from 'react'
import { useStateStore } from '@/lib/state-store'

export function useHydrated() {
  return useSyncExternalStore(
    (onStoreChange) => useStateStore.persist.onFinishHydration(onStoreChange),
    () => useStateStore.persist.hasHydrated(),
    () => false
  )
}
