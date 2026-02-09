import Animated, { type SharedValue, useAnimatedProps } from 'react-native-reanimated'
import { Circle, Line, Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface ArcGaugeProps {
  size: number
  progress: SharedValue<number>
  color: string
  strokeWidth?: number
}

// 240° arc with gap at the bottom
const ARC_DEGREES = 240
const ROTATION = 150 // Centers the 120° gap at the bottom

export const ArcGauge = ({ size, progress, color, strokeWidth = 10 }: ArcGaugeProps) => {
  const center = size / 2
  const radius = center - strokeWidth - 4
  const circumference = 2 * Math.PI * radius
  const arcLength = (ARC_DEGREES / 360) * circumference
  const gapLength = circumference - arcLength

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: arcLength * (1 - progress.value),
  }))

  // Calculate tick positions at 0%, 50%, 100% along the arc
  const getTickPosition = (percent: number) => {
    // Convert percent along arc to angle in degrees
    const angleDeg = ROTATION + ARC_DEGREES * percent
    const angleRad = (angleDeg * Math.PI) / 180
    const innerRadius = radius - strokeWidth / 2 - 2
    const outerRadius = radius + strokeWidth / 2 + 2
    return {
      x1: center + innerRadius * Math.cos(angleRad),
      y1: center + innerRadius * Math.sin(angleRad),
      x2: center + outerRadius * Math.cos(angleRad),
      y2: center + outerRadius * Math.sin(angleRad),
    }
  }

  const tick0 = getTickPosition(0)
  const tick50 = getTickPosition(0.5)
  const tick100 = getTickPosition(1)

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track (dim background arc) */}
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${arcLength} ${gapLength}`}
        strokeLinecap="round"
        transform={`rotate(${ROTATION} ${center} ${center})`}
      />

      {/* Animated progress arc */}
      <AnimatedCircle
        cx={center}
        cy={center}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={`${arcLength} ${gapLength}`}
        strokeLinecap="round"
        transform={`rotate(${ROTATION} ${center} ${center})`}
        animatedProps={animatedProps}
      />

      {/* Tick marks */}
      <Line
        x1={tick0.x1}
        y1={tick0.y1}
        x2={tick0.x2}
        y2={tick0.y2}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />
      <Line
        x1={tick50.x1}
        y1={tick50.y1}
        x2={tick50.x2}
        y2={tick50.y2}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />
      <Line
        x1={tick100.x1}
        y1={tick100.y1}
        x2={tick100.x2}
        y2={tick100.y2}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />
    </Svg>
  )
}
