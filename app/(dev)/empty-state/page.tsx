import EmptyState from '@/components/EmptyState'

export default function Page() {
  return (
    <div className="w-full">
      <EmptyState
        title="The shelf is clear"
        message="Use this when a list has nothing to show, and offer the next useful step."
        action={{ href: '/', label: 'Back to the shop' }}
      />
    </div>
  )
}
