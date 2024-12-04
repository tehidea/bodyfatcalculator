import { ImageResponse } from 'next/og'
import { Logo } from '@/components/Logo'

export const runtime = 'edge'

export const alt =
  'Body Fat Calculator Pro - Professional Body Fat Measurement Tool'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#333333',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          padding: '4rem',
        }}
      >
        <div
          style={{
            width: '200px',
            height: '200px',
          }}
        >
          <Logo />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.2,
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            Body Fat Calculator
            <span style={{ color: '#FF0000' }}> PRO</span>
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#FFFFFF',
              margin: 0,
              opacity: 0.8,
              textAlign: 'center',
            }}
          >
            Professional Body Fat Measurement Tool
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
