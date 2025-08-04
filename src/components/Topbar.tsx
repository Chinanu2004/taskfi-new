'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { shortenAddress } from '@/lib/utils'
import { FaUserCircle } from 'react-icons/fa'
import NotificationBell from '@/components/NotificationBell' // ✅ NEW

export default function Topbar() {
  const pathname = usePathname()
  const { publicKey } = useWallet()

  const isActive = (path: string) => !!pathname && pathname.startsWith(path)

  const navItems = [
    { label: 'Browse', href: '/browse' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Profile', href: '/dashboard/freelancer/profile' },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-muted"
    >
      <div className="flex items-center justify-between px-4 md:px-8 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="TaskFi" width={28} height={28} />
          <span className="text-lg font-semibold text-white tracking-wide">TaskFi</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-all duration-200 ${
                isActive(item.href)
                  ? 'text-accent font-semibold'
                  : 'text-textSecondary hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* 🔔 Notification Bell */}
          <NotificationBell />

          {/* Wallet Badge with hover */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-sm text-accent font-mono cursor-pointer transition-all"
          >
            {publicKey ? shortenAddress(publicKey.toBase58()) : 'Not Connected'}
          </motion.div>

          {/* Avatar */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl text-textSecondary hover:text-white transition-colors cursor-pointer"
          >
            <FaUserCircle />
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
