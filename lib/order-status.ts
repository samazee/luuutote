import { OrderStatus } from '@/lib/types'

export function statusClass(status: OrderStatus) {
  switch (status) {
    case 'pending':
      return 'bg-golden-pollen-100 text-graphite'
    case 'paid':
      return 'bg-cool-sky-100 text-steel-blue-800'
    case 'shipped':
      return 'bg-princeton-orange-100 text-burnt-caramel-700'
    case 'delivered':
      return 'bg-steel-blue-100 text-steel-blue-800'
    case 'cancelled':
      return 'bg-graphite-100 text-graphite-700'
  }
}
