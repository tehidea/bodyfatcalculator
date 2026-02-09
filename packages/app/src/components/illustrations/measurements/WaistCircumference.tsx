import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function WaistCircumference({
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
      viewBox={isMale ? '150 450 424 350' : '120 400 420 350'}
      size={size}
      highlightParts={['abs', 'obliques']}
      color={color}
      highlightColor={highlightColor}
    >
      <CircumferenceOverlay
        {...(isMale
          ? { cx: 362, cy: 620, rx: 160, ry: 25 }
          : { cx: 320, cy: 570, rx: 145, ry: 22 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
