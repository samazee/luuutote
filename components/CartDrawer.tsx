'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductImage from '@/components/ProductImage'
import { formatPrice, lineTotal } from '@/lib/format'
import { previewCart } from '@/lib/preview-data'
import { useHydrated } from '@/lib/use-hydrated'
import { useStateStore } from '@/lib/state-store'
import { CartItem } from '@/lib/types'

export default function CartDrawer({ preview = false }: { preview?: boolean }) {
  const storeItems = useStateStore((state) => state.cartItems)
  const storeOpen = useStateStore((state) => state.cartOpen)
  const setCartOpen = useStateStore((state) => state.setCartOpen)
  const removeItem = useStateStore((state) => state.removeItem)
  const updateQuantity = useStateStore((state) => state.updateQuantity)
  const [previewItems, setPreviewItems] = useState<CartItem[]>(previewCart)
  const [previewOpen, setPreviewOpen] = useState(true)
  const hydrated = useHydrated()

  const items = preview ? previewItems : hydrated ? storeItems : []
  const isOpen = preview ? previewOpen : hydrated && storeOpen
  const setIsOpen = preview ? setPreviewOpen : setCartOpen
  const total = items.reduce((sum, item) => sum + lineTotal(item.price, item.quantity), 0)

  function changeQuantity(id: number, quantity: number) {
    if (preview) {
      setPreviewItems((current) =>
        quantity <= 0
          ? current.filter((item) => item.id !== id)
          : current.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
      return
    }
    updateQuantity(id, quantity)
  }

  function remove(id: number) {
    if (preview) {
      setPreviewItems((current) => current.filter((item) => item.id !== id))
      return
    }
    removeItem(id)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-graphite-900/40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,28rem)] flex-col bg-graphite-50 shadow-xl"
        style={{
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 200ms ease',
        }}
      >
        <div className="flex items-center justify-between border-b border-graphite-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-graphite">Basket</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-graphite-500 transition hover:text-graphite"
            aria-label="Close basket"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-graphite-600">Your basket is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-graphite-200 pb-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-snow">
                    <ProductImage
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="line-clamp-1 text-sm font-medium text-graphite">
                        {item.title}
                      </h3>
                      <p className="text-sm text-graphite-600">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-graphite-300 text-sm text-graphite"
                          aria-label={`Decrease ${item.title}`}
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-graphite-300 text-sm text-graphite"
                          aria-label={`Increase ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-xs text-princeton-orange-700 transition hover:text-burnt-caramel-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-graphite-200 p-5">
            <div className="mb-4 flex justify-between text-lg font-semibold text-graphite">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            {preview ? (
              <span className="block rounded-full bg-princeton-orange py-3 text-center text-sm font-semibold text-graphite">
                Checkout
              </span>
            ) : (
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block rounded-full bg-princeton-orange py-3 text-center text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
              >
                Checkout
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  )
}
