import AdminSidebar from '@/components/AdminSidebar'

export default function Page() {
  return (
    <div className="w-full max-w-xs">
      <AdminSidebar currentPath="/admin/products" />
    </div>
  )
}
