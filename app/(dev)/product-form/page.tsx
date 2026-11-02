'use client'

import { useState } from 'react'
import ProductForm from '@/components/ProductForm'

const categories = ["men's clothing", 'jewelery', 'electronics']

export default function Page() {
  const [title, setTitle] = useState('')

  return (
    <div className="w-full max-w-xl">
      <ProductForm
        categories={categories}
        submitLabel="Save product"
        onSubmit={(values) => setTitle(values.title)}
      />
      {title && <p className="mt-4 text-sm text-steel-blue-700">Preview saved {title}.</p>}
    </div>
  )
}
