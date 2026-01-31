import { Suspense } from 'react'
import ConfirmationContent from './ConfirmationContent'
import { RETURN_URL } from '@/lib/constants'

export default function ConfirmationPage() {
  return (
    <main>
      <div style={{ marginBottom: '3rem' }}>
        <a href={RETURN_URL} style={{ color: '#737373', fontSize: '0.875rem' }}>
          SON OF JULIET
        </a>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <ConfirmationContent />
      </Suspense>
    </main>
  )
}
