import { Circle, Ellipse, Line, Path } from 'react-native-svg'

interface CircumferenceOverlayProps {
  cx: number
  cy: number
  rx: number
  ry: number
  color: string
}

export function CircumferenceOverlay({ cx, cy, rx, ry, color }: CircumferenceOverlayProps) {
  return (
    <>
      {/* Dashed tape measure ellipse */}
      <Ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeDasharray="8,4"
      />
      {/* Left arrow */}
      <Path
        d={`M${cx - rx - 8} ${cy} L${cx - rx} ${cy - 5} L${cx - rx} ${cy + 5} Z`}
        fill={color}
      />
      {/* Right arrow */}
      <Path
        d={`M${cx + rx + 8} ${cy} L${cx + rx} ${cy - 5} L${cx + rx} ${cy + 5} Z`}
        fill={color}
      />
    </>
  )
}

interface SkinfoldOverlayProps {
  x: number
  y: number
  length: number
  angle?: number
  color: string
}

export function SkinfoldOverlay({ x, y, length, angle = 0, color }: SkinfoldOverlayProps) {
  const rad = (angle * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const halfLen = length / 2

  // Main fold line direction
  const dx = cos * halfLen
  const dy = sin * halfLen

  // Perpendicular offset for the two skin lines
  const gap = 6
  const px = -sin * gap
  const py = cos * gap

  // Caliper jaw size
  const jaw = 10

  return (
    <>
      {/* Highlight zone */}
      <Circle cx={x} cy={y} r={length * 0.4} fill={color} opacity={0.15} />

      {/* Left skin fold line */}
      <Line
        x1={x - dx + px}
        y1={y - dy + py}
        x2={x + dx + px}
        y2={y + dy + py}
        stroke={color}
        strokeWidth={3}
      />
      {/* Right skin fold line */}
      <Line
        x1={x - dx - px}
        y1={y - dy - py}
        x2={x + dx - px}
        y2={y + dy - py}
        stroke={color}
        strokeWidth={3}
      />

      {/* Top caliper jaw */}
      <Path
        d={`M${x - dx - jaw * sin} ${y - dy + jaw * cos} L${x - dx} ${y - dy} L${x - dx + jaw * sin} ${y - dy - jaw * cos}`}
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
      {/* Bottom caliper jaw */}
      <Path
        d={`M${x + dx - jaw * sin} ${y + dy + jaw * cos} L${x + dx} ${y + dy} L${x + dx + jaw * sin} ${y + dy - jaw * cos}`}
        fill="none"
        stroke={color}
        strokeWidth={2}
      />
    </>
  )
}

interface HeightOverlayProps {
  x: number
  yTop: number
  yBottom: number
  color: string
}

export function HeightOverlay({ x, yTop, yBottom, color }: HeightOverlayProps) {
  return (
    <>
      {/* Vertical measurement line */}
      <Line
        x1={x}
        y1={yTop}
        x2={x}
        y2={yBottom}
        stroke={color}
        strokeWidth={2}
        strokeDasharray="8,4"
      />
      {/* Top arrow */}
      <Path d={`M${x} ${yTop - 8} L${x - 5} ${yTop} L${x + 5} ${yTop} Z`} fill={color} />
      {/* Bottom arrow */}
      <Path d={`M${x} ${yBottom + 8} L${x - 5} ${yBottom} L${x + 5} ${yBottom} Z`} fill={color} />
      {/* Top horizontal tick */}
      <Line x1={x - 12} y1={yTop} x2={x + 12} y2={yTop} stroke={color} strokeWidth={2} />
      {/* Bottom horizontal tick */}
      <Line x1={x - 12} y1={yBottom} x2={x + 12} y2={yBottom} stroke={color} strokeWidth={2} />
    </>
  )
}
