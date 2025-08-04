// components/CryptoIcon.tsx
'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'

export type CryptoCurrency = 'SOL' | 'USDC'

interface CryptoIconProps {
  /** "SOL" or "USDC" */
  currency: CryptoCurrency
  /** px size (width & height) */
  size?: number
  /** additional styles */
  style?: CSSProperties
}

export default function CryptoIcon({
  currency,
  size = 16,
  style,
}: CryptoIconProps) {
  const src = currency === 'SOL'
    ? '/icons/sol.svg'
    : '/icons/usdc.svg'

  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={`${currency} icon`}
      style={style}
    />
  )
}
