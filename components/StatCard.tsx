export default function StatCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <article className="rounded-2xl border border-graphite-200 bg-golden-pollen-50 p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-graphite-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-graphite">{value}</p>
      <p className="mt-1 text-sm text-graphite-600">{detail}</p>
    </article>
  )
}
