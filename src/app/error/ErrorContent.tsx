'use client'

import { useSearchParams } from 'next/navigation'
import { ERROR_MESSAGES, RETURN_URL } from '@/lib/constants'

export default function ErrorContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'transaction_failed'
  const slug = searchParams.get('slug')
  const message = ERROR_MESSAGES[type] || ERROR_MESSAGES.transaction_failed

  return (
    <div>
      {message.split('\n').map((line, i) => (
        <p key={i} style={{ marginTop: i > 0 ? '0.5rem' : 0 }}>
          {line}
        </p>
      ))}
      <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {slug && (
          <p>
            <a href={`/record/${slug}`}>Retry</a>
          </p>
        )}
        <p>
          <a href={RETURN_URL}>Return to index.</a>
        </p>
      </div>
    </div>
  )
}
