'use client'

import Image from 'next/image'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import { formatPrice } from '@/lib/format'
import { useStateStore } from '@/lib/state-store'
import { Product } from '@/lib/types'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useStateStore((state) => state.addItem)
  const isNew = product.rating.count === 0

  return (
    <article className="flex h-full flex-col rounded-2xl border border-graphite-200 bg-golden-pollen-50 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="mb-3 flex h-48 items-center justify-center rounded-xl bg-graphite-50"
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          className="h-40 w-auto object-contain"
        />
      </Link>
      <div className="flex flex-1 flex-col space-y-2">
        <p className="text-xs uppercase tracking-wide text-graphite-500">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-graphite hover:text-steel-blue-700">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-sm text-graphite-600">
          {isNew ? (
            <span className="rounded-full bg-golden-pollen-100 px-2 py-0.5 text-xs font-medium text-graphite">
              New
            </span>
          ) : (
            <>
              <span className="text-princeton-orange-700">★</span>
              <span>{product.rating.rate}</span>
              <span className="text-graphite-400">({product.rating.count})</span>
            </>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-graphite">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            aria-label="Add to cart"
            className="transition hover:opacity-70"
          >
            <Image src="/cart.svg" alt="" width={32} height={32} className="h-8 w-8" />
          </button>
        </div>
      </div>
    </article>
  )
}
