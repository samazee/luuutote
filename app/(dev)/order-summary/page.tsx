import OrderSummary from '@/components/OrderSummary'
import { previewCart } from '@/lib/preview-data'

export default function Page() {
  return (
    <div className="w-full max-w-md">
      <OrderSummary items={previewCart} />
    </div>
  )
}
