'use client'

import { useRouter } from 'next/navigation'
import ProductForm from '@/components/ProductForm'
import { useStateStore } from '@/lib/state-store'

export default function NewProductPage() {
  const router = useRouter()
  const products = useStateStore((state) => state.products)
  const addProduct = useStateStore((state) => state.addProduct)
  const categories = [...new Set(products.map((product) => product.category))]

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-graphite">Add a product</h1>
        <p className="mt-1 text-sm text-graphite-600">
          It shows up on the shop shelf as soon as you save it.
        </p>
      </div>
      <ProductForm
        categories={categories}
        submitLabel="Save product"
        onSubmit={(values) => {
          addProduct(values)
          router.push('/admin/products')
        }}
      />
    </div>
  )
}
