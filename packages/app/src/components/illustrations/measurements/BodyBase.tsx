import type { Gender } from '@bodyfat/shared/types'
import type { ReactNode } from 'react'
import Svg, { Path } from 'react-native-svg'
import { femaleBack } from './bodies/femaleBack'
import { femaleFront } from './bodies/femaleFront'
import { maleBack } from './bodies/maleBack'
import { maleFront } from './bodies/maleFront'
import type { BodyPartData } from './bodies/types'

type BodyView = 'front' | 'back'

interface BodyBaseProps {
  gender: Gender
  view: BodyView
  viewBox: string
  size: number
  highlightParts: string[]
  color: string
  highlightColor: string
  children?: ReactNode
}

function getBodyData(gender: Gender, view: BodyView): BodyPartData[] {
  if (gender === 'male') {
    return view === 'front' ? maleFront : maleBack
  }
  return view === 'front' ? femaleFront : femaleBack
}

export function BodyBase({
  gender,
  view,
  viewBox,
  size,
  highlightParts,
  color,
  highlightColor,
  children,
}: BodyBaseProps) {
  const bodyData = getBodyData(gender, view)
  const highlightSet = new Set(highlightParts)

  return (
    <Svg viewBox={viewBox} width={size} height={size}>
      {/* Layer 1: Full body silhouette */}
      {bodyData.map((part) =>
        part.paths.map((d, i) => (
          <Path
            key={`${part.slug}-${i}`}
            d={d}
            fill={highlightSet.has(part.slug) ? 'none' : `${color}15`}
            stroke={color}
            strokeWidth={1}
            opacity={highlightSet.has(part.slug) ? 0 : 0.3}
          />
        )),
      )}

      {/* Layer 2: Highlighted body parts */}
      {bodyData
        .filter((part) => highlightSet.has(part.slug))
        .map((part) =>
          part.paths.map((d, i) => (
            <Path
              key={`hl-${part.slug}-${i}`}
              d={d}
              fill={`${highlightColor}20`}
              stroke={highlightColor}
              strokeWidth={1.5}
              opacity={0.8}
            />
          )),
        )}

      {/* Layer 3: Measurement overlays (passed as children) */}
      {children}
    </Svg>
  )
}
