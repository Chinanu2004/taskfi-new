// /components/MotionWrapper.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
