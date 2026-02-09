import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function ThighSkinfold({
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
      viewBox={isMale ? '160 680 260 320' : '130 680 250 300'}
      size={size}
      highlightParts={['quadriceps']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 310, y: 850, length: 50, angle: 0 }
          : { x: 280, y: 830, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
