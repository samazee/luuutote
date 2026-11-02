'use client'

import Link from 'next/link'
import ProductTable from '@/components/ProductTable'
import { useStateStore } from '@/lib/state-store'

export default function AdminProductsPage() {
  const products = useStateStore((state) => state.products)
  const deleteProduct = useStateStore((state) => state.deleteProduct)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold text-graphite">Products</h1>
          <p className="mt-1 text-sm text-graphite-600">Add, edit, or take goods off the shelf.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-princeton-orange px-5 py-2.5 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
        >
          Add product
        </Link>
      </div>
      <ProductTable
        products={products}
        onDelete={(id) => {
          const product = products.find((item) => item.id === id)
          if (!product) return
          if (window.confirm(`Remove ${product.title} from the shop?`)) deleteProduct(id)
        }}
      />
    </div>
  )
}
