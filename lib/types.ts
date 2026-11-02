export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface ProductInput {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export const ORDER_STATUSES: OrderStatus[] = [
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled',
]

export interface OrderItem {
  productId: number
  title: string
  price: number
  quantity: number
  image: string
}

export interface OrderCustomer {
  name: string
  email: string
  address: string
  city: string
  postalCode: string
}

export interface Order {
  id: string
  createdAt: string
  status: OrderStatus
  items: OrderItem[]
  customer: OrderCustomer
  total: number
}
