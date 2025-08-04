// /components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Briefcase,
  ClipboardList,
  ShoppingBag,
  UserCog,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import clsx from 'clsx'

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Browse Gigs', href: '/browse', icon: Briefcase },
  { name: 'My Jobs', href: '/dashboard/hirer/jobs', icon: ClipboardList },
  { name: 'My Gigs', href: '/dashboard/freelancer/gigs', icon: ShoppingBag },
  { name: 'Admin Panel', href: '/dashboard/admin', icon: UserCog },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname() ?? ''
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={clsx(
        'h-screen bg-[#0d0d0d] border-r border-gray-800 flex flex-col transition-width duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {!collapsed && <span className="text-xl font-bold text-white">TaskFi</span>}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="text-white"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      <nav className="mt-6 flex-1 overflow-y-auto px-2 space-y-1">
        {links.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center px-3 py-2 rounded hover:bg-gray-800 transition-colors',
                isActive ? 'bg-gray-800 text-blue-400' : 'text-gray-400',
                collapsed && 'justify-center'
              )}
            >
              <Icon size={18} />
              {!collapsed && <span className="ml-2">{name}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
