export type ProductStatus = 'available' | 'preorder' | 'sold' | 'archived'

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  status: ProductStatus
  date: string
  description: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}
