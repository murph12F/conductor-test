import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    const isHotdog = Math.random() > 0.5
    const confidence = Math.random() * 0.3 + 0.7

    return NextResponse.json({
      isHotdog,
      confidence,
      filename: file.name
    })
  } catch (error) {
    console.error('Classification error:', error)
    return NextResponse.json(
      { error: 'Failed to classify image' },
      { status: 500 }
    )
  }
}