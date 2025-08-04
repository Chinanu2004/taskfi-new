'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { useWallet } from '@solana/wallet-adapter-react'
import Card from '@/components/Card'
import PrimaryButton from '@/components/ui/PrimaryButton'

type Freelancer = {
  id: number
  user: {
    name: string
    walletAddress: string
  }
  rating: number
}

export default function CategoryFreelancersPage() {
  const params = useParams()
  const categoryId = params?.id
  const [freelancers, setFreelancers] = useState<Freelancer[]>([])
  const [loading, setLoading] = useState(true)
  const { publicKey } = useWallet()
  const walletAddress = publicKey?.toBase58()

  const handleHire = async (freelancerId: number) => {
    const price = prompt('Enter price in SOL or USDC:')
    const token = prompt('Enter token (SOL or USDC):')?.toUpperCase()

    if (!price || !token || !['SOL', 'USDC'].includes(token)) {
      toast.error('Invalid price or token')
      return
    }
    if (!walletAddress) {
      toast.error('Wallet not connected')
      return
    }

    const res = await fetch('/api/hire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Custom Job',
        description: 'Generated from prompt',
        categoryId,
        price,
        token,
        freelancerId,
        walletAddress,
      }),
    })
    const data = await res.json()

    if (data.success) {
      toast.success('Freelancer hired!')
    } else {
      toast.error('Failed to hire')
    }
  }

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await fetch(`/api/freelancers/category/${categoryId}`)
        const data = await res.json()
        if (data.success) setFreelancers(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (categoryId) fetchFreelancers()
  }, [categoryId])

  if (loading) return <p className="text-white p-6">Loading…</p>

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Freelancers in this Category</h1>
      {freelancers.length === 0 ? (
        <p>No freelancers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {freelancers.map((f) => (
            <Card key={f.id} className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">{f.user.name}</h2>
                <p className="text-textSecondary text-sm mb-2">
                  Wallet: {f.user.walletAddress}
                </p>
                <p className="text-yellow-400 mb-4">Rating: {f.rating}/5</p>
              </div>
              <PrimaryButton onClick={() => handleHire(f.id)}>
                Hire
              </PrimaryButton>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
