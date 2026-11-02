'use client'

import Link from 'next/link'
import Image from 'next/image'
import CartDrawer from '@/components/CartDrawer'
import { useHydrated } from '@/lib/use-hydrated'
import { useStateStore } from '@/lib/state-store'

const links = [
  { href: '/', label: 'Shop' },
  { href: '/search', label: 'Search' },
]

export default function Header() {
  const items = useStateStore((state) => state.cartItems)
  const setCartOpen = useStateStore((state) => state.setCartOpen)
  const hydrated = useHydrated()
  const totalItems = hydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-graphite-200 bg-snow/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link href="/" className="text-xl font-semibold tracking-tight text-graphite">
            Tirilli
          </Link>
          <nav className="flex items-center gap-2 sm:gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-graphite-700 transition hover:text-steel-blue-700"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative rounded-full bg-graphite-100 px-4 py-2 text-sm text-graphite transition hover:bg-graphite-200"
            >
		      <Image src="/cart.svg" alt="" width={32} height={32} className="h-8 w-8" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-princeton-orange px-1 text-xs font-semibold text-graphite">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>
      <CartDrawer />
    </>
  )
}
