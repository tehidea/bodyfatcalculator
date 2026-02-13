interface ClassificationRange {
  max: number
  label: string
  color: string
}

const MALE_RANGES: ClassificationRange[] = [
  { max: 6, label: 'Essential Fat', color: '#2196F3' },
  { max: 14, label: 'Athletic', color: '#4CAF50' },
  { max: 18, label: 'Fitness', color: '#8BC34A' },
  { max: 25, label: 'Acceptable', color: '#FFC107' },
  { max: Infinity, label: 'Obese', color: '#FF5722' },
]

const FEMALE_RANGES: ClassificationRange[] = [
  { max: 14, label: 'Essential Fat', color: '#2196F3' },
  { max: 21, label: 'Athletic', color: '#4CAF50' },
  { max: 25, label: 'Fitness', color: '#8BC34A' },
  { max: 32, label: 'Acceptable', color: '#FFC107' },
  { max: Infinity, label: 'Obese', color: '#FF5722' },
]

export function getClassification(
  bodyFatPercentage: number,
  gender: string,
): { label: string; color: string } {
  const ranges = gender === 'male' ? MALE_RANGES : FEMALE_RANGES
  for (const range of ranges) {
    if (bodyFatPercentage < range.max) {
      return { label: range.label, color: range.color }
    }
  }
  // Unreachable — Infinity range always matches — but satisfies the compiler
  const last = ranges[ranges.length - 1]!
  return { label: last.label, color: last.color }
}

export function getClassificationForGender(bodyFatPercentage: number, gender: string): string {
  return getClassification(bodyFatPercentage, gender).label
}

export function getClassificationColor(bodyFatPercentage: number, gender: string): string {
  return getClassification(bodyFatPercentage, gender).color
}
