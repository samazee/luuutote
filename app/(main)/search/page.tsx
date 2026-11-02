'use client'

import { useMemo, useState } from 'react'
import EmptyState from '@/components/EmptyState'
import ProductGrid from '@/components/ProductGrid'
import SearchBar from '@/components/SearchBar'
import { useStateStore } from '@/lib/state-store'

export default function SearchPage() {
  const products = useStateStore((state) => state.products)
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const results = useMemo(() => {
    if (!needle) return products
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(needle) ||
        product.category.toLowerCase().includes(needle)
    )
  }, [needle, products])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-graphite">Search</h1>
      <SearchBar value={query} onChange={setQuery} />
      {needle && (
        <p className="text-sm text-graphite-600">
          {results.length} {results.length === 1 ? 'result' : 'results'} for “{query.trim()}”
        </p>
      )}
      {results.length === 0 ? (
        <EmptyState
          title="No matches"
          message={`Nothing on the shelf matches “${query.trim()}”.`}
        />
      ) : (
        <ProductGrid products={results} />
      )}
    </div>
  )
}
