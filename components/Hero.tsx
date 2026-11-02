import Link from 'next/link'

const tiles = [
  {
    href: '/search',
    label: 'Apparel',
    detail: 'Packs, jackets, and shirts',
    className: 'bg-princeton-orange-100 text-graphite',
  },
  {
    href: '/search',
    label: 'Jewelry',
    detail: 'Chains, rings, and studs',
    className: 'bg-golden-pollen-100 text-graphite',
  },
  {
    href: '/search',
    label: 'Electronics',
    detail: 'Drives for the workbench',
    className: 'bg-cool-sky-100 text-graphite',
  },
  {
    href: '#shop',
    label: 'The shelf',
    detail: 'Browse everything in the shop',
    className: 'bg-snow text-graphite',
  },
]

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-graphite-200 bg-golden-pollen-50 text-graphite">
      <div className="grid gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-14">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-princeton-orange-700">
            Tirilli market
          </p>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight text-graphite md:text-5xl">
            Goods for the table, the trail, and the workbench.
          </h1>
          <p className="max-w-md text-graphite-600">
            Browse the shelf, fill a basket, and leave the order at the counter.
          </p>
          <Link
            href="#shop"
            className="inline-flex rounded-full bg-princeton-orange px-5 py-2.5 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
          >
            Shop the shelf
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {tiles.map((tile) => (
            <Link
              key={tile.label}
              href={tile.href}
              className={`flex min-h-28 flex-col justify-end rounded-2xl p-4 ${tile.className}`}
            >
              <span className="text-sm font-semibold">{tile.label}</span>
              <span className="mt-1 text-xs opacity-80">{tile.detail}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
