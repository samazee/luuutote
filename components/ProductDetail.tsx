'use client'

import { useState } from 'react'
import Image from 'next/image'
import ProductGrid from '@/components/ProductGrid'
import ProductImage from '@/components/ProductImage'
import { formatPrice } from '@/lib/format'
import { useStateStore } from '@/lib/state-store'
import { Product } from '@/lib/types'

export default function ProductDetail({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const addItem = useStateStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const isNew = product.rating.count === 0

  return (
    <div className="space-y-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-3xl bg-golden-pollen-50 p-8">
          <ProductImage
            src={product.image}
            alt={product.title}
            className="h-auto max-h-96 w-auto object-contain"
          />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-graphite-500">
            {product.category}
          </p>
          <h1 className="text-3xl font-semibold text-graphite">{product.title}</h1>
          <div className="flex items-center gap-2 text-sm text-graphite-600">
            {isNew ? (
              <span className="rounded-full bg-golden-pollen-100 px-2 py-0.5 text-xs font-medium text-graphite">
                New
              </span>
            ) : (
              <>
                <span className="text-princeton-orange-700">★</span>
                <span>{product.rating.rate}</span>
                <span className="text-graphite-400">({product.rating.count} reviews)</span>
              </>
            )}
          </div>
          <p className="text-3xl font-semibold text-graphite">
            {formatPrice(product.price)}
          </p>
          <p className="leading-relaxed text-graphite-700">{product.description}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-300 text-graphite"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((value) => value + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-graphite-300 text-graphite"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              aria-label="Add to cart"
              className="transition hover:opacity-70"
            >
              <Image src="/cart.svg" alt="" width={40} height={40} className="h-10 w-10" />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-graphite">More in this aisle</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}
