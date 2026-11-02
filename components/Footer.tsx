import Link from 'next/link'

const links = [
  { href: '/', label: 'Shop' },
  { href: '/search', label: 'Search' },
]

export default function Footer() {
  return (
    <footer className="border-t border-graphite-200 bg-graphite-50 text-graphite">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-graphite">Tirilli</p>
          <p className="mt-2 max-w-xs text-sm text-graphite-600">
            A general store for clothes, jewelry, and the small electronics that keep a day moving.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-blue-700">
            Visit
          </p>
          <ul className="mt-3 space-y-2 text-sm text-graphite-700">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-steel-blue-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-steel-blue-700">
            Counter
          </p>
          <p className="mt-3 text-sm text-graphite-600">
            Orders stay in this browser and are packed from the counter.
          </p>
        </div>
      </div>
    </footer>
  )
}
