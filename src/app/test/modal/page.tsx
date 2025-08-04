'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import PrimaryButton from '@/components/ui/PrimaryButton'

export default function ModalTestPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-textPrimary">
      <PrimaryButton onClick={() => setOpen(true)}>Open Modal</PrimaryButton>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">TaskFi Modal</h2>
        <p className="text-textSecondary mb-6">
          This is a smooth, animated, reusable modal with glass styling.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-muted hover:bg-accent transition text-sm"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}
