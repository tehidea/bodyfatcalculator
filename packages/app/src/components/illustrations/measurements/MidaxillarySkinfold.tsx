import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function MidaxillarySkinfold({
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
      viewBox={isMale ? '200 400 280 280' : '150 380 300 280'}
      size={size}
      highlightParts={['obliques']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 445, y: 530, length: 50, angle: 0 }
          : { x: 405, y: 510, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
