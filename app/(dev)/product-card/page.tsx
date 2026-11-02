import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/mock-data'

export default function Page() {
  return (
    <div className="w-full max-w-xs">
      <ProductCard product={products[0]} />
    </div>
  )
}
