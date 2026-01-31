import Link from 'next/link'
import { STATUS_LABEL } from '@/lib/constants'
import { ProductStatus } from '@/lib/types'

interface Props {
  name: string
  slug: string
  date: string
  status: ProductStatus
}

export default function ProductListItem({ name, slug, date, status }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '0.75rem 0',
        borderBottom: '1px solid #262626',
        gap: '1rem',
      }}
    >
      <Link
        href={`/record/${slug}`}
        style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
      >
        {name}
      </Link>
      <span
        style={{
          color: '#737373',
          whiteSpace: 'nowrap',
          fontSize: '0.875rem',
        }}
      >
        {date} / {STATUS_LABEL[status]}
      </span>
    </div>
  )
}
