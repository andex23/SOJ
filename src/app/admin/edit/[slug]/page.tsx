import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/queries'
import AdminProductForm from '@/components/AdminProductForm'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main>
      <div>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          EDIT RECORD
        </p>
        <p style={{ color: '#737373' }}>———————————</p>
      </div>
      <AdminProductForm product={product} />
    </main>
  )
}
