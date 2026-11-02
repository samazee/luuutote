import ProductGrid from '@/components/ProductGrid'
import { products } from '@/lib/mock-data'

export default function Page() {
  return (
    <div className="w-full">
      <ProductGrid products={products} />
    </div>
  )
}
