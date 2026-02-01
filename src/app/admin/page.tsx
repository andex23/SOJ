import Link from 'next/link'
import { getAllProducts } from '@/lib/queries'
import { formatPriceUSD } from '@/lib/utils'
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
          <p style={{ color: '#8a8a8a' }}>———————————</p>
        </div>
        <Link href="/admin/new">+ New record</Link>
      </div>

      {products.length === 0 ? (
        <p style={{ color: '#8a8a8a', marginTop: '2rem' }}>No records.</p>
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
                borderBottom: '1px solid #d0d0d0',
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
                  color: '#8a8a8a',
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                }}
              >
                {p.date} / {STATUS_LABEL[p.status]} / {formatPriceUSD(p.price)}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
