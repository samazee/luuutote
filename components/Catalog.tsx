'use client'

import { useMemo, useState } from 'react'
import CategoryNav from '@/components/CategoryNav'
import ProductGrid from '@/components/ProductGrid'
import { useStateStore } from '@/lib/state-store'

export default function Catalog() {
  const products = useStateStore((state) => state.products)
  const [category, setCategory] = useState('all')
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort((a, b) => a.localeCompare(b)),
    [products]
  )
  const visible =
    category === 'all'
      ? products
      : products.filter((product) => product.category === category)

  return (
    <section id="shop" className="scroll-mt-24 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-graphite">The shop</h2>
          <p className="text-sm text-graphite-600">
            {visible.length} {visible.length === 1 ? 'product' : 'products'} on the shelf.
          </p>
        </div>
        <CategoryNav categories={categories} selected={category} onSelect={setCategory} />
      </div>
      <ProductGrid products={visible} />
    </section>
  )
}
