import ProductImage from '@/components/ProductImage'
import { products } from '@/lib/mock-data'

export default function Page() {
  return (
    <div className="flex h-48 w-full max-w-xs items-center justify-center rounded-2xl bg-golden-pollen-50">
      <ProductImage
        src={products[0].image}
        alt={products[0].title}
        className="h-40 w-auto object-contain"
      />
    </div>
  )
}
