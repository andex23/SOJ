import { createClient } from '@/lib/supabase/server'
import type { Product } from './types'

export async function getAllProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('date', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function checkSlugExists(
  slug: string,
  excludeId?: string
): Promise<boolean> {
  const supabase = await createClient()
  let query = supabase.from('products').select('id').eq('slug', slug)
  if (excludeId) {
    query = query.neq('id', excludeId)
  }
  const { data } = await query.maybeSingle()
  return !!data
}
