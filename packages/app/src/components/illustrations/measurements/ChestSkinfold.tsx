import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function ChestSkinfold({
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
      viewBox={isMale ? '200 280 280 280' : '150 270 300 280'}
      size={size}
      highlightParts={['chest']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 340, y: 400, length: 50, angle: 45 }
          : { x: 290, y: 390, length: 45, angle: 45 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
