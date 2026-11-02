'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStateStore } from '@/lib/state-store'
import { OrderCustomer } from '@/lib/types'

const emptyCustomer: OrderCustomer = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
}

const fields: { key: keyof OrderCustomer; label: string; type: string }[] = [
  { key: 'name', label: 'Full name', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'address', label: 'Street address', type: 'text' },
  { key: 'city', label: 'City', type: 'text' },
  { key: 'postalCode', label: 'Postal code', type: 'text' },
]

export default function CheckoutForm({
  onSubmit,
}: {
  onSubmit?: (customer: OrderCustomer) => void
}) {
  const router = useRouter()
  const placeOrder = useStateStore((state) => state.placeOrder)
  const itemCount = useStateStore((state) => state.cartItems.length)
  const [customer, setCustomer] = useState<OrderCustomer>(emptyCustomer)
  const [errors, setErrors] = useState<Partial<Record<keyof OrderCustomer, string>>>({})
  const [formError, setFormError] = useState('')

  function validate(values: OrderCustomer) {
    const next: Partial<Record<keyof OrderCustomer, string>> = {}
    if (!values.name.trim()) next.name = 'Enter the name for the order.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Enter a valid email.'
    }
    if (!values.address.trim()) next.address = 'Enter a street address.'
    if (!values.city.trim()) next.city = 'Enter a city.'
    if (!values.postalCode.trim()) next.postalCode = 'Enter a postal code.'
    return next
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const nextErrors = validate(customer)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    if (onSubmit) {
      onSubmit(customer)
      return
    }

    if (itemCount === 0) {
      setFormError('Add something to the basket before placing an order.')
      return
    }

    const order = placeOrder(customer)
    if (order) router.push(`/orders/${order.id}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-graphite-200 bg-snow p-6">
      <div>
        <h2 className="text-xl font-semibold text-graphite">Delivery details</h2>
        <p className="mt-1 text-sm text-graphite-600">
          We pack the order under this name and send the receipt to the email.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.key}
            className={`block space-y-1.5 ${field.key === 'address' ? 'sm:col-span-2' : ''}`}
          >
            <span className="text-sm font-medium text-graphite">{field.label}</span>
            <input
              type={field.type}
              value={customer[field.key]}
              onChange={(event) =>
                setCustomer((current) => ({ ...current, [field.key]: event.target.value }))
              }
              className="w-full rounded-xl border border-graphite-200 bg-graphite-50 px-4 py-3 text-sm text-graphite focus:outline-none focus:ring-2 focus:ring-steel-blue"
            />
            {errors[field.key] && (
              <span className="block text-xs text-burnt-caramel-700">{errors[field.key]}</span>
            )}
          </label>
        ))}
      </div>
      {formError && <p className="text-sm text-burnt-caramel-700">{formError}</p>}
      <button
        type="submit"
        className="rounded-full bg-princeton-orange px-6 py-3 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
      >
        Place order
      </button>
    </form>
  )
}
