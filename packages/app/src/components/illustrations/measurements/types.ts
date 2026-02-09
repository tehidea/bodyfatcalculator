import type { Gender } from '@bodyfat/shared/types'
import type { SvgProps } from 'react-native-svg'

export interface MeasurementIllustrationProps extends SvgProps {
  size?: number
  color?: string
  highlightColor?: string
  gender?: Gender | undefined
}
