'use client'

import { useState } from 'react'
import { Product, ProductInput } from '@/lib/types'

const fieldClass =
  'w-full rounded-xl border border-graphite-200 bg-graphite-50 px-4 py-3 text-sm text-graphite focus:outline-none focus:ring-2 focus:ring-steel-blue'

export default function ProductForm({
  initial,
  categories,
  submitLabel,
  onSubmit,
}: {
  initial?: Partial<Product>
  categories: string[]
  submitLabel: string
  onSubmit: (values: ProductInput) => void
}) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [price, setPrice] = useState(initial?.price?.toString() ?? '')
  const [category, setCategory] = useState(initial?.category ?? '')
  const [image, setImage] = useState(initial?.image ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [errors, setErrors] = useState<Partial<Record<'title' | 'price' | 'category' | 'description', string>>>({})

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    const parsedPrice = Number(price)
    if (!title.trim()) nextErrors.title = 'Give the product a name.'
    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      nextErrors.price = 'Enter a price of zero or more.'
    }
    if (!category.trim()) nextErrors.category = 'Choose or type a category.'
    if (!description.trim()) nextErrors.description = 'Add a short description.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      title: title.trim(),
      price: Math.round(parsedPrice * 100) / 100,
      category: category.trim(),
      image: image.trim(),
      description: description.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-graphite-200 bg-snow p-6">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-graphite">Name</span>
        <input value={title} onChange={(event) => setTitle(event.target.value)} className={fieldClass} />
        {errors.title && <span className="block text-xs text-burnt-caramel-700">{errors.title}</span>}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-graphite">Price</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className={fieldClass}
          />
          {errors.price && <span className="block text-xs text-burnt-caramel-700">{errors.price}</span>}
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-graphite">Category</span>
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            list="product-categories"
            className={fieldClass}
          />
          <datalist id="product-categories">
            {categories.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
          {errors.category && (
            <span className="block text-xs text-burnt-caramel-700">{errors.category}</span>
          )}
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-graphite">Image address</span>
        <input
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="https://"
          className={fieldClass}
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-graphite">Description</span>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
          className={fieldClass}
        />
        {errors.description && (
          <span className="block text-xs text-burnt-caramel-700">{errors.description}</span>
        )}
      </label>
      <button
        type="submit"
        className="rounded-full bg-princeton-orange px-6 py-3 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
      >
        {submitLabel}
      </button>
    </form>
  )
}
