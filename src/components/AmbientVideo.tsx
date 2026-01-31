'use client'

import { useState } from 'react'

export default function AmbientVideo() {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#0a0a0a',
        }}
      />
    )
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      onError={() => setError(true)}
      style={{
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        display: 'block',
      }}
    >
      <source src="/video/ambient-placeholder.mp4" type="video/mp4" />
    </video>
  )
}
