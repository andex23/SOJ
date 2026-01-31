import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/queries'
import { ACTION_TEXT, CLOSED_TEXT, STATUS_LABEL, RETURN_URL } from '@/lib/constants'
import { formatPrice } from '@/lib/utils'
import PaymentMethodSelector from '@/components/PaymentMethodSelector'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function RecordPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const isClosed = product.status === 'sold' || product.status === 'archived'

  return (
    <main>
      <div style={{ marginTop: '3rem' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Record
        </p>
        <p style={{ color: '#737373' }}>
          ———————————————————————
        </p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <p>
          <span style={{ color: '#737373' }}>Object: </span>
          {product.name}
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <span style={{ color: '#737373' }}>Date: </span>
          {product.date}
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <span style={{ color: '#737373' }}>Status: </span>
          {STATUS_LABEL[product.status]}
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <span style={{ color: '#737373' }}>Price: </span>
          {formatPrice(product.price)}
        </p>
      </div>

      {product.description && (
        <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
          <p>{product.description}</p>
        </div>
      )}

      {isClosed ? (
        <p style={{ color: '#737373', marginTop: '3rem' }}>
          {CLOSED_TEXT[product.status]}
        </p>
      ) : (
        <>
          <div style={{ borderTop: '1px solid #262626', marginTop: '3rem' }} />
          <div style={{ marginTop: '2rem' }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Payment method
            </p>
            <p style={{ color: '#737373' }}>
              ———————————————————————
            </p>
          </div>
          <PaymentMethodSelector
            slug={product.slug}
            status={product.status}
            price={product.price}
          />
        </>
      )}

      <p style={{ marginTop: '3rem' }}>
        <a href={RETURN_URL}>Return to index.</a>
      </p>
    </main>
  )
}
