'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    { href: '/admin', label: 'Products' },
    { href: '/admin/dashboard', label: 'Analytics' },
  ]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '2rem',
      }}
    >
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline' }}>
        <span
          style={{
            color: '#525252',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          ADMIN
        </span>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              color: pathname === item.href ? '#333' : '#8a8a8a',
              fontSize: '0.8125rem',
              textDecoration: pathname === item.href ? 'underline' : 'none',
              textUnderlineOffset: '3px',
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <button
        onClick={handleSignOut}
        style={{
          background: 'none',
          border: 'none',
          color: '#8a8a8a',
          fontSize: '0.8125rem',
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
