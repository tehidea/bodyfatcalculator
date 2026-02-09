import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function WristCircumference({
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
      viewBox={isMale ? '30 600 280 250' : '10 580 250 230'}
      size={size}
      highlightParts={['forearm']}
      color={color}
      highlightColor={highlightColor}
    >
      <CircumferenceOverlay
        {...(isMale ? { cx: 140, cy: 720, rx: 30, ry: 12 } : { cx: 110, cy: 680, rx: 28, ry: 10 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
