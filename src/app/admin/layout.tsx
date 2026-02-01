import AdminHeader from '@/components/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        backgroundColor: '#f0eeeb',
        color: '#333',
        minHeight: '100vh',
        margin: '-2rem -1rem',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <AdminHeader />
        {children}
      </div>
    </div>
  )
}
