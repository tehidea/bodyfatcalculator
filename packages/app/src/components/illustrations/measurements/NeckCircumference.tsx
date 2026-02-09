import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function NeckCircumference({
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
      viewBox={isMale ? '200 140 324 280' : '160 120 340 280'}
      size={size}
      highlightParts={['neck']}
      color={color}
      highlightColor={highlightColor}
    >
      <CircumferenceOverlay
        {...(isMale ? { cx: 362, cy: 290, rx: 55, ry: 15 } : { cx: 320, cy: 275, rx: 50, ry: 14 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
