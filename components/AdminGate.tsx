'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { useStateStore } from '@/lib/state-store'

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const authed = useStateStore((state) => state.adminAuthed)
  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    if (!isLogin && !authed) router.replace('/admin/login')
    if (isLogin && authed) router.replace('/admin')
  }, [authed, isLogin, router])

  if (isLogin) {
    if (authed) return <p className="text-sm text-graphite-600">Opening the counter…</p>
    return children
  }

  if (!authed) return <p className="text-sm text-graphite-600">Opening the counter…</p>

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
