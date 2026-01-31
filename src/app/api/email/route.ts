import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { referenceId, slug, date } = await request.json()

  const emailContent = {
    subject: 'SOJ — Record Created',
    body: [
      'SOJ — Record Created',
      '',
      `Reference: ${referenceId}`,
      `Item: ${slug}`,
      `Date: ${date}`,
      '',
      'This record has been created.',
      '',
      '—',
      'SON OF JULIET',
    ].join('\n'),
  }

  console.log('[EMAIL STUB]', emailContent)

  return NextResponse.json({ sent: false, stub: true })
}
