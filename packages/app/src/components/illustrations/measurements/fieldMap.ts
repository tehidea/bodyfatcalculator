import type { ComponentType } from 'react'
import { AbdomenSkinfold } from './AbdomenSkinfold'
import { BicepSkinfold } from './BicepSkinfold'
import { CalfCircumference } from './CalfCircumference'
import { CalfSkinfold } from './CalfSkinfold'
import { ChestSkinfold } from './ChestSkinfold'
import { ForearmCircumference } from './ForearmCircumference'
import { Height } from './Height'
import { HipsCircumference } from './HipsCircumference'
import { LowerBackSkinfold } from './LowerBackSkinfold'
import { MidaxillarySkinfold } from './MidaxillarySkinfold'
import { NeckCircumference } from './NeckCircumference'
import { SubscapularSkinfold } from './SubscapularSkinfold'
import { SuprailiacSkinfold } from './SuprailiacSkinfold'
import { ThighCircumference } from './ThighCircumference'
import { ThighSkinfold } from './ThighSkinfold'
import { TricepSkinfold } from './TricepSkinfold'
import type { MeasurementIllustrationProps } from './types'
import { WaistCircumference } from './WaistCircumference'
import { WristCircumference } from './WristCircumference'

/**
 * Maps calculator field keys (from Zod schema shape) to their
 * corresponding measurement illustration component.
 */
export const measurementIllustrationMap: Record<
  string,
  ComponentType<MeasurementIllustrationProps>
> = {
  // Circumferences
  waistCircumference: WaistCircumference,
  neckCircumference: NeckCircumference,
  hipsCircumference: HipsCircumference,
  wristCircumference: WristCircumference,
  forearmCircumference: ForearmCircumference,
  thighCircumference: ThighCircumference,
  calfCircumference: CalfCircumference,

  // Height
  height: Height,

  // Skinfolds
  chestSkinfold: ChestSkinfold,
  abdomenSkinfold: AbdomenSkinfold,
  tricepSkinfold: TricepSkinfold,
  thighSkinfold: ThighSkinfold,
  bicepSkinfold: BicepSkinfold,
  suprailiacSkinfold: SuprailiacSkinfold,
  subscapularSkinfold: SubscapularSkinfold,
  midaxillarySkinfold: MidaxillarySkinfold,
  lowerBackSkinfold: LowerBackSkinfold,
  calfSkinfold: CalfSkinfold,
}
