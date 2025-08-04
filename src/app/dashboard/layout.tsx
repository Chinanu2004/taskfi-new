// /dashboard/layout.tsx
'use client'

import { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'
import MobileTabBar from '@/components/MobileTabBar'
import { Toaster } from 'react-hot-toast'
import MotionWrapper from '@/components/MotionWrapper'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname() ?? ''

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/select-role')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        🔄 Checking profile…
      </div>
    )
  }

  const showTopbar = pathname.startsWith('/dashboard')

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          {showTopbar && <Topbar />}
          <main className="flex-1 p-6">
            <MotionWrapper>{children}</MotionWrapper>
          </main>
        </div>
      </div>
      <MobileTabBar />
    </>
  )
}
