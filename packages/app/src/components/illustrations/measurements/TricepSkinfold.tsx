import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function TricepSkinfold({
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
      viewBox={isMale ? '810 340 260 260' : '840 360 240 240'}
      size={size}
      highlightParts={['triceps']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 940, y: 470, length: 50, angle: 0 }
          : { x: 980, y: 470, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
