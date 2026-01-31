import { NextRequest, NextResponse } from 'next/server'
import { generateReferenceId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const referenceId = generateReferenceId()
    const date = new Date().toISOString().split('T')[0]

    return NextResponse.json({
      success: true,
      referenceId,
      date,
      status: 'pending confirmation',
      wallets: {
        btc: process.env.CRYPTO_WALLET_ADDRESS_BTC || '',
        eth: process.env.CRYPTO_WALLET_ADDRESS_ETH || '',
        usdt: process.env.CRYPTO_WALLET_ADDRESS_USDT || '',
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    )
  }
}
