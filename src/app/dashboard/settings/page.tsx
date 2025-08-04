'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import PrimaryButton from '@/components/ui/PrimaryButton'

type Category = { id: number; name: string }
type UserWithFreelancer = {
  name?: string
  profilePhoto?: string
  freelancer?: { bio?: string; categories: Category[] }
}

export default function SettingsPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserWithFreelancer | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState({
    name: '',
    bio: '',
    profilePhoto: '',
    selectedCategories: [] as number[],
  })

  useEffect(() => {
    async function fetchData() {
      const [userRes, catRes] = await Promise.all([
        fetch('/api/user/settings'),
        fetch('/api/categories'),
      ])
      const user = await userRes.json()
      const cat = await catRes.json()
      setUserData(user)
      setCategories(cat)
      setForm({
        name: user.name || '',
        bio: user.freelancer?.bio || '',
        profilePhoto: user.profilePhoto || '',
        selectedCategories:
          user.freelancer?.categories?.map((c: Category) => c.id) || [],
      })
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCategoryToggle = (id: number) => {
    setForm((prev) => {
      const exists = prev.selectedCategories.includes(id)
      if (exists) {
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter((c) => c !== id),
        }
      }
      if (prev.selectedCategories.length >= 3) {
        toast.error('Max 3 categories')
        return prev
      }
      return {
        ...prev,
        selectedCategories: [...prev.selectedCategories, id],
      }
    })
  }

  const handleSubmit = async () => {
    const res = await fetch('/api/user/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        bio: form.bio,
        categories: form.selectedCategories,
      }),
    })

    if (res.ok) {
      toast.success('Profile updated')
    } else {
      toast.error('Error updating profile')
    }
  }

  if (loading) return <p className="text-white p-8">Loading...</p>

  const isFreelancer = !!userData?.freelancer

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="mb-4">
        <label className="block mb-1">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full bg-surface text-white px-3 py-2 rounded"
        />
      </div>

      {isFreelancer && (
        <div className="mb-4">
          <label className="block mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full bg-surface text-white px-3 py-2 rounded"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">Wallet Address</label>
        <input
          value={session?.user?.walletAddress || ''}
          readOnly
          className="w-full bg-muted text-textSecondary px-3 py-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Profile Photo (URL)</label>
        <input
          name="profilePhoto"
          value={form.profilePhoto}
          onChange={handleChange}
          className="w-full bg-surface text-white px-3 py-2 rounded mb-2"
        />
        {form.profilePhoto && (
          <Image
            src={form.profilePhoto}
            alt="Preview"
            width={80}
            height={80}
            className="rounded"
          />
        )}
      </div>

      {isFreelancer && (
        <div className="mb-6">
          <label className="block mb-2">Categories (max 3)</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const selected = form.selectedCategories.includes(cat.id)
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryToggle(cat.id)}
                  className={`px-3 py-1 rounded border ${
                    selected
                      ? 'bg-accent border-accent text-white'
                      : 'bg-muted border-muted text-textSecondary'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <PrimaryButton onClick={handleSubmit}>Save Settings</PrimaryButton>
    </div>
  )
}
