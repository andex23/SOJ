'use client'

import { useSearchParams } from 'next/navigation'
import { RETURN_URL } from '@/lib/constants'

export default function ConfirmationContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')
  const date = searchParams.get('date')
  const status = searchParams.get('status') || 'confirmed'

  return (
    <div>
      <p>Record created.</p>
      <p style={{ color: '#737373', marginTop: '1.5rem' }}>
        Status: {status}.
      </p>
      {ref && (
        <p style={{ color: '#737373', marginTop: '0.5rem' }}>
          Reference: {ref}
        </p>
      )}
      {date && (
        <p style={{ color: '#737373', marginTop: '0.5rem' }}>
          Date: {date}
        </p>
      )}
      <p style={{ marginTop: '3rem' }}>
        <a href={RETURN_URL}>Return to index.</a>
      </p>
    </div>
  )
}
