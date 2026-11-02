import OrderReceipt from '@/components/OrderReceipt'
import { previewOrders } from '@/lib/preview-data'

export default function Page() {
  return (
    <div className="w-full">
      <OrderReceipt order={previewOrders[0]} />
    </div>
  )
}
