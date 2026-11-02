'use client'

import ProductImage from '@/components/ProductImage'
import { formatPrice, lineTotal } from '@/lib/format'
import { useStateStore } from '@/lib/state-store'
import { CartItem } from '@/lib/types'

export default function OrderSummary({ items }: { items?: CartItem[] }) {
  const cartItems = useStateStore((state) => state.cartItems)
  const lines = items ?? cartItems
  const total = lines.reduce((sum, item) => sum + lineTotal(item.price, item.quantity), 0)

  return (
    <aside className="h-fit rounded-3xl border border-graphite-200 bg-golden-pollen-50 p-6">
      <h2 className="text-xl font-semibold text-graphite">Order summary</h2>
      {lines.length === 0 ? (
        <p className="mt-4 text-sm text-graphite-600">The basket is empty.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {lines.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-snow">
                <ProductImage
                  src={item.image}
                  alt=""
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-graphite">{item.title}</p>
                <p className="text-xs text-graphite-500">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-graphite">
                {formatPrice(lineTotal(item.price, item.quantity))}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex items-center justify-between border-t border-graphite-200 pt-4 text-lg font-semibold text-graphite">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </aside>
  )
}
