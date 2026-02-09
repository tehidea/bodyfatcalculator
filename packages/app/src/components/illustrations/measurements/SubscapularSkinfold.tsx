import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function SubscapularSkinfold({
  size = 200,
  color = '#333',
  highlightColor = '#FF0000',
  gender = 'male',
}: MeasurementIllustrationProps) {
  const isMale = gender === 'male'

  return (
    <BodyBase
      gender={gender}
      view="back"
      viewBox={isMale ? '900 300 280 280' : '940 290 280 280'}
      size={size}
      highlightParts={['upper-back', 'trapezius']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 1060, y: 420, length: 50, angle: 45 }
          : { x: 1100, y: 400, length: 45, angle: 45 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
