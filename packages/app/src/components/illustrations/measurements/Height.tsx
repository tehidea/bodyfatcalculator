import { BodyBase } from './BodyBase'
import { HeightOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function Height({
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
      viewBox={isMale ? '0 100 724 1300' : '0 0 660 1450'}
      size={size}
      highlightParts={[]}
      color={color}
      highlightColor={highlightColor}
    >
      <HeightOverlay
        {...(isMale ? { x: 100, yTop: 170, yBottom: 1340 } : { x: 80, yTop: 50, yBottom: 1430 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
