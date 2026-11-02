'use client'

import { useState } from 'react'
import CategoryNav from '@/components/CategoryNav'

const categories = ["men's clothing", 'jewelery', 'electronics']

export default function Page() {
  const [selected, setSelected] = useState('all')

  return (
    <div className="w-full">
      <CategoryNav categories={categories} selected={selected} onSelect={setSelected} />
    </div>
  )
}
