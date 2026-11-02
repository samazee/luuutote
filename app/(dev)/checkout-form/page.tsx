'use client'

import { useState } from 'react'
import CheckoutForm from '@/components/CheckoutForm'

export default function Page() {
  const [name, setName] = useState('')

  return (
    <div className="w-full">
      <CheckoutForm onSubmit={(customer) => setName(customer.name)} />
      {name && (
        <p className="mt-4 text-sm text-steel-blue-700">Preview captured {name}.</p>
      )}
    </div>
  )
}
