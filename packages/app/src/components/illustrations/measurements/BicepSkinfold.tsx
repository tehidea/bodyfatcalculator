import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function BicepSkinfold({
  size = 200,
  color = '#333',
  highlightColor = '#FF0000',
  gender = 'male',
}: MeasurementIllustrationProps) {
  const isMale = gender === 'male'

  return (
    <BodyBase
      gender={gender}
      view="front"
      viewBox={isMale ? '60 350 250 250' : '40 340 230 230'}
      size={size}
      highlightParts={['biceps']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 200, y: 470, length: 50, angle: 0 }
          : { x: 170, y: 450, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
