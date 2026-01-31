import { getAllProducts } from '@/lib/queries'
import { Product } from '@/lib/types'
import AmbientVideo from '@/components/AmbientVideo'
import ProductList from '@/components/ProductList'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let products: Product[] = []

  try {
    products = await getAllProducts()
  } catch {
    products = []
  }

  return (
    <main>
      <AmbientVideo />
      <ProductList products={products} />
    </main>
  )
}
