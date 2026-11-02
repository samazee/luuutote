'use client'

import { useParams, useRouter } from 'next/navigation'
import EmptyState from '@/components/EmptyState'
import ProductForm from '@/components/ProductForm'
import { useStateStore } from '@/lib/state-store'

export default function EditProductPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const products = useStateStore((state) => state.products)
  const updateProduct = useStateStore((state) => state.updateProduct)
  const product = products.find((item) => item.id === Number(params.id))
  const categories = [...new Set(products.map((item) => item.category))]

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        message="This product is no longer on the shelf."
        action={{ href: '/admin/products', label: 'Back to products' }}
      />
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-graphite">Edit product</h1>
        <p className="mt-1 text-sm text-graphite-600">{product.title}</p>
      </div>
      <ProductForm
        key={product.id}
        initial={product}
        categories={categories}
        submitLabel="Update product"
        onSubmit={(values) => {
          updateProduct(product.id, values)
          router.push('/admin/products')
        }}
      />
    </div>
  )
}
