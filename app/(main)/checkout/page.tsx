'use client'

import CheckoutForm from '@/components/CheckoutForm'
import EmptyState from '@/components/EmptyState'
import OrderSummary from '@/components/OrderSummary'
import { useStateStore } from '@/lib/state-store'

export default function CheckoutPage() {
  const items = useStateStore((state) => state.cartItems)

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your basket is empty"
        message="Add a product from the shop before checkout."
        action={{ href: '/', label: 'Browse the shop' }}
      />
    )
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-graphite">Checkout</h1>
        <CheckoutForm />
      </div>
      <OrderSummary />
    </div>
  )
}
