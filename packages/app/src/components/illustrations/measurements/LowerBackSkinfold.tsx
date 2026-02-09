import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function LowerBackSkinfold({
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
      viewBox={isMale ? '860 500 350 280' : '900 460 350 280'}
      size={size}
      highlightParts={['lower-back']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 1060, y: 610, length: 50, angle: 0 }
          : { x: 1100, y: 580, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
