import Catalog from '@/components/Catalog'
import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <Catalog />
    </div>
  )
}
