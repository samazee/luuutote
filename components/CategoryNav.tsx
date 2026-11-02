export default function CategoryNav({
  categories,
  selected,
  onSelect,
}: {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}) {
  const options = ['all', ...categories]

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
      {options.map((category) => {
        const active = selected === category
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(category)}
            className={`rounded-full px-4 py-2 text-sm capitalize transition ${
              active
                ? 'bg-steel-blue-700 text-snow'
                : 'border border-graphite-200 bg-snow text-graphite-700 hover:border-steel-blue'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        )
      })}
    </div>
  )
}
