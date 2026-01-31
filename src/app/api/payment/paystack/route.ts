import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateReferenceId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { slug, email } = await request.json()

    if (!slug || !email) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: product, error } = await supabase
      .from('products')
      .select('price, name')
      .eq('slug', slug)
      .single()

    if (error || !product) {
      return NextResponse.json(
        { error: 'Product not found.' },
        { status: 404 }
      )
    }

    const referenceId = generateReferenceId()
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/paystack/callback`

    const paystackRes = await fetch(
      'https://api.paystack.co/transaction/initialize',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          amount: product.price,
          reference: referenceId,
          callback_url: callbackUrl,
          currency: 'NGN',
        }),
      }
    )

    const paystackData = await paystackRes.json()

    if (!paystackData.status) {
      return NextResponse.json(
        { error: 'Failed to initialize transaction.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      referenceId,
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
