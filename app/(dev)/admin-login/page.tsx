'use client'

import { useState } from 'react'
import AdminLogin from '@/components/AdminLogin'

export default function Page() {
  const [note, setNote] = useState('')

  return (
    <div className="w-full">
      <AdminLogin
        onSubmit={(password) => {
          setNote(password ? 'Preview captured the password field.' : 'Enter a password.')
          return password ? null : 'Enter a password.'
        }}
      />
      {note && <p className="mx-auto mt-4 max-w-md text-sm text-steel-blue-700">{note}</p>}
    </div>
  )
}
