import AdminProductForm from '@/components/AdminProductForm'

export default function NewProductPage() {
  return (
    <main>
      <div>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          NEW RECORD
        </p>
        <p style={{ color: '#737373' }}>———————————</p>
      </div>
      <AdminProductForm />
    </main>
  )
}
