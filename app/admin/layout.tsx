import AdminSidebar from '@/components/admin/AdminSidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // If not authenticated, redirect to login
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <AdminSidebar />
      <main className="flex-1 bg-white min-h-screen w-full lg:w-[calc(100%-256px)]">
        <div className="pt-16 lg:pt-0 p-3 sm:p-4 md:p-6 w-full">
          <div className="w-full mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
