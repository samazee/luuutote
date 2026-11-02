'use client'

import { useState } from 'react'
import ProductTable from '@/components/ProductTable'
import { products } from '@/lib/mock-data'
import { Product } from '@/lib/types'

export default function Page() {
  const [rows, setRows] = useState<Product[]>(products)

  return (
    <div className="w-full">
      <ProductTable
        products={rows}
        onDelete={(id) => setRows((current) => current.filter((product) => product.id !== id))}
      />
    </div>
  )
}
