'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PaymentMethod, submitBankPayment, submitCryptoPayment } from '@/lib/payment'
import { ProductStatus } from '@/lib/types'
import { ACTION_TEXT } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'

interface Props {
  slug: string
  status: ProductStatus
  price: number
}

export default function PaymentMethodSelector({ slug, status, price }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<PaymentMethod>('bank')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const actionText = ACTION_TEXT[status] || 'Create record'

  async function handleSubmit() {
    setSubmitting(true)
    try {
      if (selected === 'bank') {
        if (!email) {
          setSubmitting(false)
          return
        }
        const result = await submitBankPayment(slug, email)
        window.location.href = result.authorization_url
      } else {
        const result = await submitCryptoPayment(slug)
        const params = new URLSearchParams({
          ref: result.referenceId,
          date: result.date,
          status: result.status,
        })
        router.push(`/confirmation?${params.toString()}`)
      }
    } catch {
      router.push('/error?type=transaction_failed')
    }
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        <label
          style={{ cursor: 'pointer', color: selected === 'bank' ? '#d4d4d4' : '#737373' }}
          onClick={() => setSelected('bank')}
        >
          ( {selected === 'bank' ? '*' : '\u00A0'} ) Bank / Paystack
        </label>
        <label
          style={{ cursor: 'pointer', color: selected === 'crypto' ? '#d4d4d4' : '#737373' }}
          onClick={() => setSelected('crypto')}
        >
          ( {selected === 'crypto' ? '*' : '\u00A0'} ) Crypto
        </label>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {selected === 'bank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#737373', fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@address.com"
                style={{
                  background: 'none',
                  border: '1px solid #262626',
                  padding: '0.5rem',
                  color: '#d4d4d4',
                  width: '100%',
                }}
              />
            </div>
          </div>
        )}

        {selected === 'crypto' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: '#737373' }}>
            <p>
              <span style={{ color: '#d4d4d4' }}>Amount: </span>
              {formatPrice(price)}
            </p>
            <p>
              <span style={{ color: '#d4d4d4' }}>Network: </span>
              BTC / ETH / USDT
            </p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Wallet addresses will be provided after submission.
              <br />
              Status: pending confirmation until on-chain verification.
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting || (selected === 'bank' && !email)}
        style={{
          background: 'none',
          border: '1px solid #262626',
          color: '#d4d4d4',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          opacity: submitting || (selected === 'bank' && !email) ? 0.5 : 1,
        }}
      >
        {submitting ? 'Processing...' : actionText}
      </button>
    </div>
  )
}
