import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/lib/types'

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="Nothing on this shelf"
        message="Try another category, or search the shop for a different name."
        action={{ href: '/search', label: 'Search the shop' }}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
