'use client'

import OrderTable from '@/components/OrderTable'
import StatCard from '@/components/StatCard'
import { formatPrice } from '@/lib/format'
import { useStateStore } from '@/lib/state-store'

export default function AdminPage() {
  const products = useStateStore((state) => state.products)
  const orders = useStateStore((state) => state.orders)
  const updateOrderStatus = useStateStore((state) => state.updateOrderStatus)
  const revenue = orders
    .filter((order) => order.status !== 'cancelled')
    .reduce((sum, order) => sum + order.total, 0)
  const pending = orders.filter((order) => order.status === 'pending').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-graphite">Overview</h1>
        <p className="mt-1 text-sm text-graphite-600">The counter for this browser.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Products" value={String(products.length)} detail="On the shelf" />
        <StatCard label="Orders" value={String(orders.length)} detail="Placed in this browser" />
        <StatCard label="Revenue" value={formatPrice(revenue)} detail="Excludes cancelled orders" />
        <StatCard label="Pending" value={String(pending)} detail="Waiting to be packed" />
      </div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-graphite">Recent orders</h2>
        <OrderTable orders={orders.slice(0, 5)} onStatusChange={updateOrderStatus} />
      </section>
    </div>
  )
}
