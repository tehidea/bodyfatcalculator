import { AppStoreLink } from '@/components/AppStoreLink'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { CheckIcon } from '@heroicons/react/24/solid'
import { FORMULA_REQUIREMENTS } from '@/FORMULA_REQUIREMENTS'
import { BodyWeightScalesIcon } from '@/images/icons/BodyWeightScalesIcon'
import { MeasuringTapeIcon } from '@/images/icons/MeasuringTapeIcon'
import { SkinfoldIcon } from '@/images/icons/SkinfoldIcon'
import { MeasurementVerticalIcon } from '@/images/icons/MeasurementVerticalIcon'

// Helper function to check if formula needs specific measurements
function getRequiredMeasurements(formula: keyof typeof FORMULA_REQUIREMENTS) {
  const fields = FORMULA_REQUIREMENTS[formula].fields
  return {
    needsWeight: fields.some((f) => f.key === 'weight'),
    needsHeight: fields.some((f) => f.key === 'height'),
    needsCircumference: fields.some((f) => f.key.includes('Circumference')),
    needsSkinfold: fields.some((f) => f.key.includes('Skinfold')),
  }
}

export function CallToAction() {
  // Get measurement requirements for free formulas
  const freeFormulas = ['ymca', 'mymca', 'navy'] as const
  const freeRequirements = freeFormulas.map(getRequiredMeasurements)

  // Get measurement requirements for premium formulas
  const premiumFormulas = [
    'covert',
    'jack3',
    'durnin',
    'jack4',
    'jack7',
    'parrillo',
  ] as const
  const premiumRequirements = premiumFormulas.map(getRequiredMeasurements)

  return (
    <section
      id="get-pro-version"
      className="relative overflow-hidden bg-[#000000] py-20 sm:py-28"
    >
      <div className="absolute left-20 top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground
          color="#FF0000"
          className="animate-spin-slower opacity-10"
        />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Choose Your Version
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Start with our free version or upgrade to PRO for advanced features
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Free Version */}
          <div className="relative rounded-2xl bg-background p-8">
            <h3 className="text-xl font-semibold text-white">Free Version</h3>
            <p className="mt-4 text-gray-400">Basic methods for casual users</p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-warning" />
                <span className="ml-4">YMCA Method (±5-7%)</span>
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-warning" />
                <span className="ml-4">Modified YMCA Method</span>
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-warning" />
                <span className="ml-4">US Navy Method (±4-6%)</span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                {freeRequirements.some((r) => r.needsWeight) && (
                  <BodyWeightScalesIcon className="h-8 w-8 text-gray-400" />
                )}
                {freeRequirements.some((r) => r.needsHeight) && (
                  <MeasurementVerticalIcon className="h-8 w-8 text-gray-400" />
                )}
                {freeRequirements.some((r) => r.needsCircumference) && (
                  <MeasuringTapeIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-warning" />
                <span className="ml-4">Basic Results</span>
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-warning" />
                <span className="ml-4">Standard Precision (1 decimal)</span>
              </div>
            </div>
            <div className="mt-8">
              <AppStoreLink />
            </div>
            <p className="mt-4 text-sm text-gray-400">Free forever</p>
          </div>

          {/* PRO Version */}
          <div className="relative rounded-2xl bg-background p-8 ring-2 ring-primary">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white">
                RECOMMENDED
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white">PRO Version</h3>
            <p className="mt-4 text-gray-400">
              Advanced methods for professionals
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-success" />
                <span className="ml-4">All Free Features</span>
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-success" />
                <span className="ml-4">7 Professional Methods (±3-4%)</span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                {premiumRequirements.some((r) => r.needsWeight) && (
                  <BodyWeightScalesIcon className="h-8 w-8 text-gray-400" />
                )}
                {premiumRequirements.some((r) => r.needsHeight) && (
                  <MeasurementVerticalIcon className="h-8 w-8 text-gray-400" />
                )}
                {premiumRequirements.some((r) => r.needsCircumference) && (
                  <MeasuringTapeIcon className="h-8 w-8 text-gray-400" />
                )}
                {premiumRequirements.some((r) => r.needsSkinfold) && (
                  <SkinfoldIcon className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-success" />
                <span className="ml-4">Enhanced Precision (2 decimals)</span>
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-success" />
                <span className="ml-4">Unlimited Storage</span>
              </div>
              <div className="flex items-center text-white">
                <CheckIcon className="h-5 w-5 text-success" />
                <span className="ml-4">Professional PDF Reports</span>
              </div>
            </div>
            <div className="mt-8">
              <AppStoreLink />
            </div>
            <p className="mt-4 text-sm text-gray-400">
              One-time purchase • £10
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
