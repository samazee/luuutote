import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ADMIN_PASSWORD } from '@/lib/admin'
import { products as seedProducts } from '@/lib/mock-data'
import { lineTotal } from '@/lib/format'
import {
  CartItem,
  Order,
  OrderCustomer,
  OrderStatus,
  Product,
  ProductInput,
} from '@/lib/types'

interface StateStore {
  products: Product[]
  cartItems: CartItem[]
  cartOpen: boolean
  orders: Order[]
  adminAuthed: boolean
  signIn: (password: string) => boolean
  signOut: () => void
  addItem: (product: Product, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
  addProduct: (input: ProductInput) => Product
  updateProduct: (id: number, input: ProductInput) => void
  deleteProduct: (id: number) => void
  placeOrder: (customer: OrderCustomer) => Order | null
  updateOrderStatus: (id: string, status: OrderStatus) => void
}

export const useStateStore = create<StateStore>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      cartItems: [],
      cartOpen: false,
      orders: [],
      adminAuthed: false,
      signIn: (password) => {
        const ok = password === ADMIN_PASSWORD
        if (ok) set({ adminAuthed: true })
        return ok
      },
      signOut: () => set({ adminAuthed: false }),
      addItem: (product, quantity = 1) =>
        set((state) => {
          const amount = Math.max(1, quantity)
          const existing = state.cartItems.find((item) => item.id === product.id)
          const cartItems = existing
            ? state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, ...product, quantity: item.quantity + amount }
                  : item
              )
            : [...state.cartItems, { ...product, quantity: amount }]
          return { cartItems, cartOpen: true }
        }),
      removeItem: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems:
            quantity <= 0
              ? state.cartItems.filter((item) => item.id !== id)
              : state.cartItems.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
        })),
      clearCart: () => set({ cartItems: [] }),
      setCartOpen: (cartOpen) => set({ cartOpen }),
      addProduct: (input) => {
        const product: Product = {
          ...input,
          id: get().products.reduce((max, item) => Math.max(max, item.id), 0) + 1,
          rating: { rate: 0, count: 0 },
        }
        set((state) => ({ products: [product, ...state.products] }))
        return product
      },
      updateProduct: (id, input) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...input } : product
          ),
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, ...input } : item
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      placeOrder: (customer) => {
        const { cartItems } = get()
        if (cartItems.length === 0) return null
        const order: Order = {
          id: `TR-${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
          status: 'pending',
          customer: {
            name: customer.name.trim(),
            email: customer.email.trim(),
            address: customer.address.trim(),
            city: customer.city.trim(),
            postalCode: customer.postalCode.trim(),
          },
          items: cartItems.map((item) => ({
            productId: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total: cartItems.reduce(
            (sum, item) => sum + lineTotal(item.price, item.quantity),
            0
          ),
        }
        set((state) => ({
          orders: [order, ...state.orders],
          cartItems: [],
          cartOpen: false,
        }))
        return order
      },
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),
    }),
    {
      name: 'tirilli-store',
      partialize: (state) => ({
        products: state.products,
        cartItems: state.cartItems,
        orders: state.orders,
        adminAuthed: state.adminAuthed,
      }),
    }
  )
)
