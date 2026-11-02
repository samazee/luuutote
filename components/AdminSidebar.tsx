'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useStateStore } from '@/lib/state-store'

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
]

function isActive(href: string, current: string) {
  if (href === '/admin') return current === '/admin'
  return current === href || current.startsWith(`${href}/`)
}

export default function AdminSidebar({ currentPath }: { currentPath?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const signOut = useStateStore((state) => state.signOut)
  const current = currentPath ?? pathname

  return (
    <aside className="rounded-2xl border border-graphite-200 bg-graphite-50 p-3">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-graphite-500">
        Counter
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = isActive(link.href, current)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                active
                  ? 'bg-steel-blue-700 text-snow'
                  : 'text-graphite hover:bg-graphite-100'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
      <Link
        href="/"
        className="mt-4 block rounded-xl px-3 py-2 text-sm text-graphite-600 transition hover:bg-graphite-100 hover:text-graphite"
      >
        Back to the shop
      </Link>
      <button
        type="button"
        onClick={() => {
          signOut()
          router.push('/admin/login')
        }}
        className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm text-graphite-600 transition hover:bg-graphite-100 hover:text-graphite"
      >
        Sign out
      </button>
    </aside>
  )
}
