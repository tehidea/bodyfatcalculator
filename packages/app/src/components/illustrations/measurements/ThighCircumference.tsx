import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function ThighCircumference({
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
      viewBox={isMale ? '160 620 260 380' : '130 610 250 380'}
      size={size}
      highlightParts={['quadriceps']}
      color={color}
      highlightColor={highlightColor}
    >
      <CircumferenceOverlay
        {...(isMale ? { cx: 310, cy: 820, rx: 55, ry: 18 } : { cx: 280, cy: 800, rx: 50, ry: 16 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
