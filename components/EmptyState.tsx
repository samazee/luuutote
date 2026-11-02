import Link from 'next/link'

export default function EmptyState({
  title,
  message,
  action,
}: {
  title: string
  message: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="rounded-3xl border border-dashed border-graphite-300 bg-graphite-50 px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-graphite">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-graphite-600">{message}</p>
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex rounded-full bg-princeton-orange px-5 py-2.5 text-sm font-semibold text-graphite transition hover:bg-princeton-orange-400"
        >
          {action.label}
        </Link>
      )}
    </div>
  )
}
