import EmptyState from '@/components/EmptyState'
import { formatDate, formatPrice } from '@/lib/format'
import { statusClass } from '@/lib/order-status'
import { ORDER_STATUSES, Order, OrderStatus } from '@/lib/types'

export default function OrderTable({
  orders,
  onStatusChange,
}: {
  orders: Order[]
  onStatusChange: (id: string, status: OrderStatus) => void
}) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="Orders land here after someone checks out from the shop."
        action={{ href: '/', label: 'Open the shop' }}
      />
    )
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-graphite-200 bg-snow">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-graphite-200 bg-graphite-50 text-xs uppercase tracking-wide text-graphite-500">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-graphite-100 align-top last:border-0">
              <td className="px-4 py-4">
                <p className="font-medium text-graphite">{order.id}</p>
                <p className="mt-1 text-xs text-graphite-500">{formatDate(order.createdAt)}</p>
                <ul className="mt-2 space-y-1 text-xs text-graphite-600">
                  {order.items.map((item) => (
                    <li key={`${order.id}-${item.productId}`}>
                      {item.quantity} × {item.title}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-4 text-graphite-700">
                <p>{order.customer.name}</p>
                <p className="text-xs text-graphite-500">{order.customer.email}</p>
                <p className="mt-1 text-xs">
                  {order.customer.city} {order.customer.postalCode}
                </p>
              </td>
              <td className="px-4 py-4 font-medium text-graphite">
                {formatPrice(order.total)}
              </td>
              <td className="px-4 py-4">
                <label className="block space-y-2">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(order.status)}`}>
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(event) =>
                      onStatusChange(order.id, event.target.value as OrderStatus)
                    }
                    className="block rounded-xl border border-graphite-200 bg-graphite-50 px-3 py-2 text-sm text-graphite focus:outline-none focus:ring-2 focus:ring-steel-blue"
                    aria-label={`Status for ${order.id}`}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
