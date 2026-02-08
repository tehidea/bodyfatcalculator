import type * as React from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

interface MeasurementVerticalIconProps extends SvgProps {
  size?: number
  color?: string
}
export const MeasurementVerticalIcon: React.FunctionComponent<MeasurementVerticalIconProps> = ({
  size = 24,
  color = 'black',
  ...props
}) => (
  <Svg viewBox="0 0 82.27 122.88" width={size} height={size} fill={color} {...props}>
    <Path d="M39.47 0h40.1a2.68 2.68 0 0 1 1.87.76l.08.08a2.67 2.67 0 0 1 .75 1.86v117.48a2.74 2.74 0 0 1-.76 1.87l-.13.12a2.72 2.72 0 0 1-1.81.71h-40.1a2.72 2.72 0 0 1-1.87-.76l-.13-.13a2.72 2.72 0 0 1-.71-1.81V2.7a2.73 2.73 0 0 1 .76-1.87l.07-.07A2.69 2.69 0 0 1 39.47 0Zm37.75 15.81H58.14v-5.06h19.08V5.06h-35.4v112.76h35.4v-5.69H66.7v-5.06h10.52v-5.65H58.14v-5h19.08v-5.7H66.7v-5h10.52V80H58.14v-5h19.08v-5.68H66.7v-5h10.52v-5.7H58.14v-5.06h19.08v-5.64H66.7v-5.06h10.52v-5.64H58.14v-5.06h19.08v-5.65H66.7v-5.05h10.52v-5.65ZM24.31.23a3.22 3.22 0 0 1 0 6.43H3.22a3.22 3.22 0 1 1 0-6.43Zm0 115.66a3.22 3.22 0 0 1 0 6.44H3.22a3.22 3.22 0 1 1 0-6.44Zm.31-93.78a3.21 3.21 0 0 1-4.85 4.2l-2.62-3V99.6l2.62-3a3.21 3.21 0 0 1 4.85 4.2L16 110.31a3.21 3.21 0 0 1-4.53.33l-.29-.3-8.27-9.27a3.22 3.22 0 1 1 4.8-4.28l2.64 3V23.11l-2.65 3a3.22 3.22 0 0 1-4.8-4.28l8.26-9.28.3-.29a3.21 3.21 0 0 1 4.53.33l8.26 9.54Z" />
  </Svg>
)
