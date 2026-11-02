import StatCard from '@/components/StatCard'

export default function Page() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <StatCard label="Products" value="10" detail="On the shelf" />
      <StatCard label="Orders" value="2" detail="Placed in this browser" />
      <StatCard label="Revenue" value="$1,499.95" detail="Excludes cancelled orders" />
      <StatCard label="Pending" value="1" detail="Waiting to be packed" />
    </div>
  )
}
