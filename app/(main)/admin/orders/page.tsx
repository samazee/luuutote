'use client'

import OrderTable from '@/components/OrderTable'
import { useStateStore } from '@/lib/state-store'

export default function AdminOrdersPage() {
  const orders = useStateStore((state) => state.orders)
  const updateOrderStatus = useStateStore((state) => state.updateOrderStatus)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-graphite">Orders</h1>
        <p className="mt-1 text-sm text-graphite-600">
          Move an order from pending through delivered, or cancel it.
        </p>
      </div>
      <OrderTable orders={orders} onStatusChange={updateOrderStatus} />
    </div>
  )
}
