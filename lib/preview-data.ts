import { lineTotal } from '@/lib/format'
import { products } from '@/lib/mock-data'
import { CartItem, Order } from '@/lib/types'

export const previewCart: CartItem[] = [
  { ...products[0], quantity: 1 },
  { ...products[4], quantity: 2 },
]

export const previewOrders: Order[] = [
  {
    id: 'TR-PREVIEW1',
    createdAt: '2026-10-01T15:30:00.000Z',
    status: 'paid',
    customer: {
      name: 'Jordan Ellis',
      email: 'jordan@example.com',
      address: '14 Cedar Lane',
      city: 'Portland',
      postalCode: '97205',
    },
    items: previewCart.map((item) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
    total: previewCart.reduce(
      (sum, item) => sum + lineTotal(item.price, item.quantity),
      0
    ),
  },
  {
    id: 'TR-PREVIEW2',
    createdAt: '2026-09-28T11:05:00.000Z',
    status: 'shipped',
    customer: {
      name: 'Sam Rivera',
      email: 'sam@example.com',
      address: '88 Market Street',
      city: 'Austin',
      postalCode: '78701',
    },
    items: [
      {
        productId: products[8].id,
        title: products[8].title,
        price: products[8].price,
        quantity: 1,
        image: products[8].image,
      },
    ],
    total: products[8].price,
  },
]
