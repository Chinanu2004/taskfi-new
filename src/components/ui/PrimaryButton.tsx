'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { MotionProps } from 'framer-motion'
import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps & {
    children: ReactNode
    className?: string
  }

export default function PrimaryButton({ children, className = '', ...props }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'bg-accent text-white font-medium px-4 py-2 rounded-lg shadow-glow transition hover:opacity-90',
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
