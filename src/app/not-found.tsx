import { RETURN_URL } from '@/lib/constants'

export default function NotFound() {
  return (
    <div style={{ marginTop: '3rem' }}>
      <p>Record not found.</p>
      <p style={{ marginTop: '1.5rem' }}>
        <a href={RETURN_URL}>Return to index.</a>
      </p>
    </div>
  )
}
