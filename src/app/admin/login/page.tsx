'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Authentication failed.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main>
      <div style={{ marginTop: '3rem' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          ADMIN ACCESS
        </p>
        <p style={{ color: '#737373' }}>
          ———————————
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              color: '#737373',
              fontSize: '0.875rem',
              display: 'block',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              background: 'none',
              border: '1px solid #262626',
              padding: '0.5rem',
              color: '#d4d4d4',
              width: '100%',
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label
            style={{
              color: '#737373',
              fontSize: '0.875rem',
              display: 'block',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              background: 'none',
              border: '1px solid #262626',
              padding: '0.5rem',
              color: '#d4d4d4',
              width: '100%',
            }}
          />
        </div>

        {error && (
          <p style={{ color: '#d4d4d4', marginBottom: '1.5rem' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            background: 'none',
            border: '1px solid #262626',
            color: '#d4d4d4',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? 'Authenticating...' : 'Authenticate'}
        </button>
      </form>
    </main>
  )
}
