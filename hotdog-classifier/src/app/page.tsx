'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ClassificationResult {
  isHotdog: boolean
  confidence: number
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setResult(null)
      setError('')
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const classifyImage = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('image', selectedImage)

      const response = await fetch('/api/classify', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Classification failed')
      }

      const data = await response.json()
      setResult({
        isHotdog: data.isHotdog,
        confidence: data.confidence
      })
    } catch (err) {
      setError('Failed to classify image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🌭 Hotdog or Not Hotdog?
          </h1>
          <p className="text-xl text-gray-600">
            Upload an image and our AI will tell you if it's a hotdog or not!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">Click to upload image</span>
                  </label>
                </div>
              </div>

              {selectedImage && (
                <button
                  onClick={classifyImage}
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  {isLoading ? 'Analyzing...' : 'Classify Image'}
                </button>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {imagePreview && (
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Preview</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing your image...</p>
                </div>
              )}

              {result && (
                <div className={`rounded-lg p-6 ${result.isHotdog ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <div className="text-center">
                    <div className="text-4xl mb-4">
                      {result.isHotdog ? '🌭' : '❌'}
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${result.isHotdog ? 'text-green-800' : 'text-red-800'}`}>
                      {result.isHotdog ? 'Hotdog!' : 'Not Hotdog'}
                    </h3>
                    <p className={`text-lg ${result.isHotdog ? 'text-green-700' : 'text-red-700'}`}>
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Powered by advanced AI technology 🤖</p>
        </div>
      </div>
    </div>
  )
}
