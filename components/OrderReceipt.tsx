import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import { formatDate, formatPrice, lineTotal } from '@/lib/format'
import { statusClass } from '@/lib/order-status'
import { Order } from '@/lib/types'

export default function OrderReceipt({ order }: { order: Order }) {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-blue-700">
          Order confirmed
        </p>
        <h1 className="text-3xl font-semibold text-graphite">Thank you. The order is in.</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-graphite-600">
          <span className="font-medium text-graphite">{order.id}</span>
          <span>{formatDate(order.createdAt)}</span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusClass(order.status)}`}>
            {order.status}
          </span>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-graphite-200 bg-snow p-6">
          <h2 className="text-lg font-semibold text-graphite">Items</h2>
          <ul className="mt-4 space-y-4">
            {order.items.map((item) => (
              <li key={item.productId} className="flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-graphite-50">
                  <ProductImage
                    src={item.image}
                    alt=""
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-graphite">{item.title}</p>
                  <p className="text-xs text-graphite-500">
                    {item.quantity} × {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-medium text-graphite">
                  {formatPrice(lineTotal(item.price, item.quantity))}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex justify-between border-t border-graphite-200 pt-4 text-lg font-semibold text-graphite">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </section>

        <section className="rounded-3xl border border-graphite-200 bg-golden-pollen-50 p-6">
          <h2 className="text-lg font-semibold text-graphite">Ship to</h2>
          <p className="mt-3 text-sm leading-relaxed text-graphite-700">
            {order.customer.name}
            <br />
            {order.customer.address}
            <br />
            {order.customer.city} {order.customer.postalCode}
            <br />
            {order.customer.email}
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="inline-flex rounded-full bg-princeton-orange px-5 py-2.5 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
      >
        Back to the shop
      </Link>
    </article>
  )
}
