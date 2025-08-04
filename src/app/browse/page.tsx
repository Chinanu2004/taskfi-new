'use client'

import { useEffect, useState } from 'react'
import GigCard from '@/components/GigCard'
import Card from '@/components/Card'
import type { CryptoCurrency } from '@/components/CryptoIcon'
import MotionWrapper from '@/components/MotionWrapper'

type Gig = {
  id: number
  title: string
  description: string
  freelancer: {
    user: {
      name: string
      walletAddress: string
      profileImage?: string
    }
    rating: number
  }
  priceTiers: {
    price: number
    currency: CryptoCurrency
  }[]
}

export default function BrowseGigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([])

  useEffect(() => {
    fetch('/api/gigs')
      .then(res => res.json())
      .then(data => setGigs(data.gigs))
  }, [])

  return (
    <MotionWrapper>
      <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Browse Gigs</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {gigs.map(gig => (
            <Card key={gig.id}>
              <GigCard
                id={gig.id}
                title={gig.title}
                description={gig.description}
                freelancer={{
                  name: gig.freelancer.user.name,
                  walletAddress: gig.freelancer.user.walletAddress,
                  profileImage: gig.freelancer.user.profileImage,
                  rating: gig.freelancer.rating
                }}
                priceTiers={gig.priceTiers}
              />
            </Card>
          ))}
        </div>
      </div>
    </MotionWrapper>
  )
}
