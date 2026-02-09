import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function HipsCircumference({
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
      viewBox={isMale ? '150 550 424 350' : '100 500 460 380'}
      size={size}
      highlightParts={['adductors', 'quadriceps']}
      color={color}
      highlightColor={highlightColor}
    >
      <CircumferenceOverlay
        {...(isMale
          ? { cx: 362, cy: 720, rx: 120, ry: 22 }
          : { cx: 320, cy: 690, rx: 120, ry: 22 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
