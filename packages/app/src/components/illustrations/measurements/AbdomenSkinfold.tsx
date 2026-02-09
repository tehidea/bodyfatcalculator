import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function AbdomenSkinfold({
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
      viewBox={isMale ? '220 440 280 280' : '180 420 280 280'}
      size={size}
      highlightParts={['abs']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 362, y: 560, length: 50, angle: 0 }
          : { x: 320, y: 540, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
