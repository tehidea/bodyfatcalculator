import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function ForearmCircumference({
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
      viewBox={isMale ? '30 440 280 280' : '10 420 260 260'}
      size={size}
      highlightParts={['forearm']}
      color={color}
      highlightColor={highlightColor}
    >
      <CircumferenceOverlay
        {...(isMale ? { cx: 160, cy: 570, rx: 35, ry: 14 } : { cx: 130, cy: 540, rx: 32, ry: 12 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
