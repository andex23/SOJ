import { Suspense } from 'react'
import ErrorContent from './ErrorContent'
import { RETURN_URL } from '@/lib/constants'

export default function ErrorPage() {
  return (
    <main>
      <div style={{ marginBottom: '3rem' }}>
        <a href={RETURN_URL} style={{ color: '#737373', fontSize: '0.875rem' }}>
          SON OF JULIET
        </a>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <ErrorContent />
      </Suspense>
    </main>
  )
}
