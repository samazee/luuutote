export default function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-graphite">Search the shop</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Name or category"
        className="w-full rounded-2xl border border-graphite-200 bg-snow px-4 py-3 text-sm text-graphite placeholder:text-graphite-400 focus:outline-none focus:ring-2 focus:ring-steel-blue"
      />
    </label>
  )
}
