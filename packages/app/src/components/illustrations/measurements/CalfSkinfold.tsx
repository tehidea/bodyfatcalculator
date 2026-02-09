import { BodyBase } from './BodyBase'
import { SkinfoldOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function CalfSkinfold({
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
      viewBox={isMale ? '160 920 260 350' : '140 960 250 330'}
      size={size}
      highlightParts={['calves']}
      color={color}
      highlightColor={highlightColor}
    >
      <SkinfoldOverlay
        {...(isMale
          ? { x: 300, y: 1090, length: 50, angle: 0 }
          : { x: 280, y: 1120, length: 45, angle: 0 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
