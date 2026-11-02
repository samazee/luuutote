'use client'

import { useRouter } from 'next/navigation'
import AdminLogin from '@/components/AdminLogin'
import { useStateStore } from '@/lib/state-store'

export default function AdminLoginPage() {
  const router = useRouter()
  const signIn = useStateStore((state) => state.signIn)

  return (
    <AdminLogin
      onSubmit={(password) => {
        if (!signIn(password)) return 'That password does not open the counter.'
        router.push('/admin')
        return null
      }}
    />
  )
}
