import { Product } from '@/lib/types'
import ProductListItem from './ProductListItem'

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  if (products.length === 0) {
    return <p style={{ color: '#737373', marginTop: '3rem' }}>No records.</p>
  }

  return (
    <div style={{ marginTop: '3rem' }}>
      {products.map((product) => (
        <ProductListItem
          key={product.slug}
          name={product.name}
          slug={product.slug}
          date={product.date}
          status={product.status}
        />
      ))}
    </div>
  )
}
