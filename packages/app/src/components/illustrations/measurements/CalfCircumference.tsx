import { BodyBase } from './BodyBase'
import { CircumferenceOverlay } from './overlays'
import type { MeasurementIllustrationProps } from './types'

export function CalfCircumference({
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
      <CircumferenceOverlay
        {...(isMale
          ? { cx: 300, cy: 1090, rx: 42, ry: 16 }
          : { cx: 280, cy: 1120, rx: 38, ry: 14 })}
        color={highlightColor}
      />
    </BodyBase>
  )
}
