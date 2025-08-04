// components/GigCard.tsx
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CryptoIcon, { CryptoCurrency } from './CryptoIcon'

type GigCardProps = {
  id: number
  title: string
  description: string
  freelancer: {
    name: string
    walletAddress: string
    profileImage?: string
    rating: number
  }
  priceTiers: {
    price: number
    currency: CryptoCurrency
  }[]
}

export default function GigCard({
  id,
  title,
  description,
  freelancer,
  priceTiers,
}: GigCardProps) {
  const router = useRouter()

  return (
    <div
      className="
        w-full
        bg-gray-900 p-4 sm:p-5
        rounded-lg shadow-md border border-gray-800
        hover:border-purple-600 transition
        flex flex-col
      "
    >
      <div className="flex items-center gap-3 mb-3">
        <Image
          src={freelancer.profileImage || '/default-avatar.png'}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="overflow-hidden">
          <p className="font-semibold truncate">{freelancer.name}</p>
          <p className="text-xs text-gray-400">⭐ {freelancer.rating}/5</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-1 truncate">{title}</h2>
      <p className="text-sm text-gray-400 line-clamp-2 sm:line-clamp-3 mb-3">
        {description}
      </p>

      {priceTiers.length > 0 && (
        
+       <div className="flex items-center gap-1 text-sm text-purple-400 font-semibold mb-3">
+         <CryptoIcon currency={priceTiers[0].currency} size={18} />
+         <span>
+           From {priceTiers[0].price} {priceTiers[0].currency}
+         </span>
+       </div>
      )}

      <button
        onClick={() => router.push(`/gig/${id}`)}
        className="
          mt-auto
          w-full
          bg-purple-600 text-white py-2 rounded
          hover:bg-purple-700 transition
        "
      >
        View Gig
      </button>
    </div>
  )
}
