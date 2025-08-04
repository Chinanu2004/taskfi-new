'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import CryptoIcon, { CryptoCurrency } from '@/components/CryptoIcon'
import PrimaryButton from '@/components/ui/PrimaryButton'
import SecondaryButton from '@/components/ui/SecondaryButton'

export default function CreateGigPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [acceptedTokens, setAcceptedTokens] = useState<string[]>(['SOL'])
  const [priceTiers, setPriceTiers] = useState([
    { name: 'Basic', description: '', price: '', token: 'SOL', deliveryDays: '' }
  ])

  const handleAddTier = () => {
    if (priceTiers.length >= 3) return
    const names = ['Basic', 'Standard', 'Premium']
    setPriceTiers([
      ...priceTiers,
      { name: names[priceTiers.length], description: '', price: '', token: 'SOL', deliveryDays: '' }
    ])
  }
  const handleRemoveTier = (i: number) => {
    if (priceTiers.length <= 1) return
    setPriceTiers(priceTiers.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/freelancer/gigs/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, acceptedTokens, priceTiers })
    })
    if (res.ok) {
      toast.success('Gig created!')
      router.push('/dashboard/freelancer/gigs')
    } else {
      toast.error('Failed to create gig')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Create Gig</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 bg-surface border border-muted rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 bg-surface border border-muted rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Accepted Tokens */}
        <div>
          <label className="block mb-1">Accepted Tokens</label>
          <div className="flex gap-4">
            {['SOL', 'USDC'].map((token) => (
              <label key={token} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={acceptedTokens.includes(token)}
                  onChange={() =>
                    setAcceptedTokens((prev) =>
                      prev.includes(token)
                        ? prev.filter((t) => t !== token)
                        : [...prev, token]
                    )
                  }
                />
                <span>{token}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Tiers */}
        <div>
          <label className="block mb-2 font-semibold">Price Tiers</label>
          {priceTiers.map((tier, idx) => (
            <div
              key={idx}
              className="bg-surface border border-muted p-4 mb-4 rounded space-y-3"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <SecondaryButton onClick={() => handleRemoveTier(idx)}>
                  Remove
                </SecondaryButton>
              </div>

              <label className="block mb-1">Description</label>
              <textarea
                className="w-full p-2 bg-surface border border-muted rounded"
                rows={2}
                value={tier.description}
                onChange={(e) => {
                  const copy = [...priceTiers]
                  copy[idx].description = e.target.value
                  setPriceTiers(copy)
                }}
                required
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1">Price</label>
                  <input
                    type="number"
                    className="w-full p-2 bg-surface border border-muted rounded"
                    value={tier.price}
                    onChange={(e) => {
                      const copy = [...priceTiers]
                      copy[idx].price = e.target.value
                      setPriceTiers(copy)
                    }}
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-2 mb-1">
                    Token <CryptoIcon currency={tier.token as CryptoCurrency} size={16} />
                  </label>
                  <select
                    className="w-full p-2 bg-surface border border-muted rounded"
                    value={tier.token}
                    onChange={(e) => {
                      const copy = [...priceTiers]
                      copy[idx].token = e.target.value
                      setPriceTiers(copy)
                    }}
                  >
                    <option value="SOL">SOL</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block mb-1">Delivery Days</label>
                  <input
                    type="number"
                    className="w-full p-2 bg-surface border border-muted rounded"
                    value={tier.deliveryDays}
                    onChange={(e) => {
                      const copy = [...priceTiers]
                      copy[idx].deliveryDays = e.target.value
                      setPriceTiers(copy)
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          {priceTiers.length < 3 && (
            <SecondaryButton onClick={handleAddTier}>
              + Add Tier
            </SecondaryButton>
          )}
        </div>

        <PrimaryButton type="submit">Submit Gig</PrimaryButton>
      </form>
    </div>
)
}
