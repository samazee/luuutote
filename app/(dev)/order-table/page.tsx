'use client'

import { useState } from 'react'
import OrderTable from '@/components/OrderTable'
import { previewOrders } from '@/lib/preview-data'
import { Order, OrderStatus } from '@/lib/types'

export default function Page() {
  const [orders, setOrders] = useState<Order[]>(previewOrders)

  return (
    <div className="w-full">
      <OrderTable
        orders={orders}
        onStatusChange={(id, status: OrderStatus) =>
          setOrders((current) =>
            current.map((order) => (order.id === id ? { ...order, status } : order))
          )
        }
      />
    </div>
  )
}
