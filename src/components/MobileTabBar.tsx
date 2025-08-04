'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaUser, FaCompass, FaPlus, FaBell, FaBriefcase } from 'react-icons/fa'

const TABS = [
  { href: '/browse', icon: FaCompass, label: 'Explore' },
  { href: '/dashboard', icon: FaBriefcase, label: 'Dashboard' },
  { href: '/dashboard/freelancer/gigs/create', icon: FaPlus, label: 'Create' },
  { href: '/notifications', icon: FaBell, label: 'Alerts' },
  { href: '/dashboard/freelancer/profile', icon: FaUser, label: 'Profile' },
]

export default function MobileTabBar() {
  const pathname = usePathname() ?? '' // ✅ Null-safe fallback

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-background border-t border-muted shadow-xl md:hidden">
      <ul className="flex justify-around items-center py-2">
        {TABS.map((tab) => {
          const isActive = pathname.startsWith(tab.href)
          const Icon = tab.icon

          return (
            <li key={tab.href}>
              <Link href={tab.href}>
                <div className="relative flex flex-col items-center text-xs group">
                  <Icon
                    className={`text-xl transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'text-textSecondary group-hover:text-accent'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute -bottom-1 h-[2px] w-6 bg-accent rounded-full shadow-glow"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
