import Link from 'next/link'
import { getAllProducts } from '@/lib/queries'
import { formatPrice } from '@/lib/utils'
import { STATUS_LABEL } from '@/lib/constants'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const products = await getAllProducts()

  return (
    <main>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '2rem',
        }}
      >
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            PRODUCT INDEX
          </p>
          <p style={{ color: '#737373' }}>———————————</p>
        </div>
        <Link href="/admin/new">+ New record</Link>
      </div>

      {products.length === 0 ? (
        <p style={{ color: '#737373', marginTop: '2rem' }}>No records.</p>
      ) : (
        <div>
          {products.map((p) => (
            <div
              key={p.slug}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '0.75rem 0',
                borderBottom: '1px solid #262626',
                gap: '1rem',
              }}
            >
              <Link
                href={`/admin/edit/${p.slug}`}
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                {p.name}
              </Link>
              <span
                style={{
                  color: '#737373',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                }}
              >
                {p.date} / {STATUS_LABEL[p.status]} / {formatPrice(p.price)}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
