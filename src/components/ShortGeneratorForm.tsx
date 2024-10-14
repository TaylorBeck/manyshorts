'use client';

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'

export default function ShortGeneratorForm() {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const { data: session } = useSession()

  const onSubmit = async (data) => {
    if (!session?.user?.id) {
      alert('Please sign in to generate a short')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/generate-short', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: session.user.id }),
      })
      const result = await response.json()
      if (result.videoUrl) {
        setVideoUrl(result.videoUrl)
      } else {
        throw new Error('No video URL returned')
      }
    } catch (error) {
      console.error('Error generating short:', error)
      alert('Error generating short. Please try again.')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="description" className="block mb-2">Description</label>
        <Textarea id="description" {...register('description', { required: true })} />
      </div>
      <div>
        <label htmlFor="length" className="block mb-2">Video Length (seconds)</label>
        <Slider
          id="length"
          min={15}
          max={60}
          step={1}
          {...register('length', { required: true })}
        />
      </div>
      <Button type="submit" disabled={loading || !session?.user}>
        {loading ? 'Generating...' : 'Generate Short'}
      </Button>
      {videoUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Generated Video:</h3>
          <video src={videoUrl} controls className="w-full max-w-md" />
        </div>
      )}
    </form>
  )
}