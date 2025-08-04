// /components/DashboardSectionWrapper.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function DashboardSectionWrapper({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: 'easeOut',
      }}
      className="mb-6"
    >
      {children}
    </motion.div>
  )
}
