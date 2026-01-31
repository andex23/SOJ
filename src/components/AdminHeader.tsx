'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminHeader() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '2rem',
      }}
    >
      <a
        href="/admin"
        style={{
          color: '#737373',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        ADMIN
      </a>
      <button
        onClick={handleSignOut}
        style={{
          background: 'none',
          border: 'none',
          color: '#737373',
          fontSize: '0.875rem',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          padding: 0,
        }}
      >
        Sign out
      </button>
    </div>
  )
}
