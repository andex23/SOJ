import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get('reference')

  if (!reference) {
    return NextResponse.redirect(
      new URL('/error?type=transaction_failed', process.env.NEXT_PUBLIC_SITE_URL!)
    )
  }

  try {
    const verifyRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    )

    const verifyData = await verifyRes.json()

    if (verifyData.status && verifyData.data.status === 'success') {
      const date = new Date().toISOString().split('T')[0]
      const params = new URLSearchParams({
        ref: reference,
        date,
        status: 'confirmed',
      })
      return NextResponse.redirect(
        new URL(`/confirmation?${params.toString()}`, process.env.NEXT_PUBLIC_SITE_URL!)
      )
    }

    return NextResponse.redirect(
      new URL('/error?type=transaction_failed', process.env.NEXT_PUBLIC_SITE_URL!)
    )
  } catch {
    return NextResponse.redirect(
      new URL('/error?type=transaction_failed', process.env.NEXT_PUBLIC_SITE_URL!)
    )
  }
}
