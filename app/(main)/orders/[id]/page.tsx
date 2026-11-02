'use client'

import { useParams } from 'next/navigation'
import EmptyState from '@/components/EmptyState'
import OrderReceipt from '@/components/OrderReceipt'
import { useStateStore } from '@/lib/state-store'

export default function OrderPage() {
  const params = useParams<{ id: string }>()
  const order = useStateStore((state) =>
    state.orders.find((item) => item.id === params.id)
  )

  if (!order) {
    return (
      <EmptyState
        title="Order not found"
        message="This order is not saved in this browser."
        action={{ href: '/', label: 'Back to the shop' }}
      />
    )
  }

  return <OrderReceipt order={order} />
}
