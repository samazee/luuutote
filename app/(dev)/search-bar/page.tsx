'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'

export default function Page() {
  const [value, setValue] = useState('')

  return (
    <div className="w-full">
      <SearchBar value={value} onChange={setValue} />
    </div>
  )
}
