import Link from 'next/link'
import EmptyState from '@/components/EmptyState'
import ProductImage from '@/components/ProductImage'
import { formatPrice } from '@/lib/format'
import { Product } from '@/lib/types'

export default function ProductTable({
  products,
  onDelete,
}: {
  products: Product[]
  onDelete: (id: number) => void
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="The shelf is empty"
        message="Add the first product and it will show up in the shop."
        action={{ href: '/admin/products/new', label: 'Add a product' }}
      />
    )
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-graphite-200 bg-snow">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-graphite-200 bg-graphite-50 text-xs uppercase tracking-wide text-graphite-500">
          <tr>
            <th className="px-4 py-3 font-medium">Product</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-graphite-100 last:border-0">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-graphite-50">
                    <ProductImage
                      src={product.image}
                      alt=""
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <span className="font-medium text-graphite">{product.title}</span>
                </div>
              </td>
              <td className="px-4 py-3 capitalize text-graphite-600">{product.category}</td>
              <td className="px-4 py-3 text-graphite">{formatPrice(product.price)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-3">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-sm font-medium text-graphite underline-offset-2 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="text-sm font-medium text-princeton-orange-700 hover:text-burnt-caramel-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
