export type PaymentMethod = 'bank' | 'crypto'

export async function submitBankPayment(slug: string, email: string) {
  const res = await fetch('/api/payment/paystack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug, email }),
  })

  if (!res.ok) {
    throw new Error('Transaction failed.')
  }

  return res.json() as Promise<{
    authorization_url: string
    referenceId: string
  }>
}

export async function submitCryptoPayment(slug: string) {
  const res = await fetch('/api/payment/crypto', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug }),
  })

  if (!res.ok) {
    throw new Error('Transaction failed.')
  }

  return res.json() as Promise<{
    success: boolean
    referenceId: string
    date: string
    status: string
  }>
}
