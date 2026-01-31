'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Product, ProductStatus } from '@/lib/types'
import { slugify } from '@/lib/utils'
import { createProduct, updateProduct } from '@/app/admin/actions'

interface Props {
  product?: Product
}

const STATUS_OPTIONS: ProductStatus[] = ['available', 'preorder', 'sold', 'archived']

const inputStyle: React.CSSProperties = {
  background: 'none',
  border: '1px solid #262626',
  padding: '0.5rem',
  color: '#d4d4d4',
  width: '100%',
}

const labelStyle: React.CSSProperties = {
  color: '#737373',
  fontSize: '0.875rem',
  display: 'block',
  marginBottom: '0.5rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}

export default function AdminProductForm({ product }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [slugManual, setSlugManual] = useState(false)
  const [price, setPrice] = useState(product?.price?.toString() || '')
  const [status, setStatus] = useState<ProductStatus>(product?.status || 'available')
  const [date, setDate] = useState(product?.date || '')
  const [description, setDescription] = useState(product?.description || '')
  const [imageUrl, setImageUrl] = useState(product?.image_url || '')
  const [error, setError] = useState('')

  function handleNameChange(val: string) {
    setName(val)
    if (!slugManual) {
      setSlug(slugify(val))
    }
  }

  function handleSlugChange(val: string) {
    setSlugManual(true)
    setSlug(val)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name || !slug || !price || !date) {
      setError('Required fields: name, slug, price, date.')
      return
    }

    const formData = new FormData()
    formData.set('name', name)
    formData.set('slug', slug)
    formData.set('price', price)
    formData.set('status', status)
    formData.set('date', date)
    formData.set('description', description)
    formData.set('image_url', imageUrl)

    startTransition(async () => {
      try {
        if (product) {
          await updateProduct(product.id, formData)
        } else {
          await createProduct(formData)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Save failed.'
        if (message.includes('duplicate') || message.includes('unique')) {
          setError('Slug already exists.')
        } else {
          setError(message)
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>NAME</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>SLUG</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => handleSlugChange(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>PRICE (kobo)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>STATUS</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProductStatus)}
          style={{
            ...inputStyle,
            appearance: 'none',
          }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>DATE</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={labelStyle}>DESCRIPTION</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={labelStyle}>IMAGE URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error && (
        <p style={{ color: '#d4d4d4', marginBottom: '1.5rem' }}>{error}</p>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            background: 'none',
            border: '1px solid #262626',
            color: '#d4d4d4',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            opacity: isPending ? 0.5 : 1,
          }}
        >
          {isPending ? 'Saving...' : product ? 'Update record' : 'Create record'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          style={{
            background: 'none',
            border: 'none',
            color: '#737373',
            fontSize: '1rem',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            padding: 0,
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
