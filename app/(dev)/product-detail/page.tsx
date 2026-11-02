import ProductDetail from '@/components/ProductDetail'
import { products } from '@/lib/mock-data'

export default function Page() {
  const product = products[0]
  const related = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  )

  return (
    <div className="w-full">
      <ProductDetail product={product} related={related} />
    </div>
  )
}
