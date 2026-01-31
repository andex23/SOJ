'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('products').insert({
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    price: Number(formData.get('price')),
    status: formData.get('status') as string,
    date: formData.get('date') as string,
    description: (formData.get('description') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
  })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/admin')
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .update({
      name: formData.get('name') as string,
      slug: formData.get('slug') as string,
      price: Number(formData.get('price')),
      status: formData.get('status') as string,
      date: formData.get('date') as string,
      description: (formData.get('description') as string) || null,
      image_url: (formData.get('image_url') as string) || null,
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  redirect('/admin')
}
