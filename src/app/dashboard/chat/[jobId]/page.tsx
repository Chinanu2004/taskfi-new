'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { pusherClient } from '@/lib/pusher-client'

interface Message {
  id: number
  content: string
  senderId: number
  receiverId: number
  sentAt: string
}

export default function ChatPage() {
  const { jobId } = useParams() as { jobId?: string }
  const searchParams = useSearchParams()

  // Guard against null searchParams
  const userIdParam = searchParams?.get('userId') ?? null
  const peerIdParam = searchParams?.get('peerId') ?? null

  const userId = userIdParam ? Number(userIdParam) : null
  const peerId = peerIdParam ? Number(peerIdParam) : null

  const [chatId, setChatId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  // 1) Fetch chatId
  useEffect(() => {
    if (!jobId) return

    fetch(`/api/chat/by-job/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.chatId === 'number') {
          setChatId(data.chatId)
        }
      })
      .catch(() => toast.error('Failed to load chat'))
  }, [jobId])

  // 2) Fetch existing messages
  useEffect(() => {
    if (chatId === null) return

    fetch(`/api/chat/${chatId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.messages)) {
          setMessages(data.messages)
        }
      })
      .catch(() => toast.error('Failed to load messages'))
  }, [chatId])

  // 3) Real‐time listener
  useEffect(() => {
    if (chatId === null) return

    const channel = pusherClient.subscribe(`chat-${chatId}`)
    const handleNewMessage = (msg: Message) =>
      setMessages((prev) => [...prev, msg])

    channel.bind('new-message', handleNewMessage)
    return () => {
      channel.unbind('new-message', handleNewMessage)
      pusherClient.unsubscribe(`chat-${chatId}`)
    }
  }, [chatId])

  // 4) Send message
  const sendMessage = async () => {
    if (
      !newMessage.trim() ||
      chatId === null ||
      userId === null ||
      peerId === null
    ) {
      return
    }

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          senderId: userId,
          receiverId: peerId,
          content: newMessage.trim(),
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error()
      setNewMessage('')
      toast.success('Message sent')
    } catch {
      toast.error('Failed to send message')
    }
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-white">
      <h2 className="text-xl font-bold mb-3">Job Chat (ID: {jobId})</h2>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`inline-block p-2 rounded max-w-[80%] break-words ${
              msg.senderId === userId ? 'bg-blue-600 ml-auto' : 'bg-gray-700'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input + Send */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 text-white focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message…"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
