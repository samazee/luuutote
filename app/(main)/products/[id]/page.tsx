'use client'

import { useParams } from 'next/navigation'
import EmptyState from '@/components/EmptyState'
import ProductDetail from '@/components/ProductDetail'
import { useStateStore } from '@/lib/state-store'

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const products = useStateStore((state) => state.products)
  const product = products.find((item) => item.id === Number(params.id))

  if (!product) {
    return (
      <EmptyState
        title="This product is not on the shelf"
        message="It may have been removed from the shop."
        action={{ href: '/', label: 'Back to the shop' }}
      />
    )
  }

  const related = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  )

  return <ProductDetail product={product} related={related} />
}
