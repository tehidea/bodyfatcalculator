'use client'

import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { CheckIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Unlock } from 'react-feather'
import { AppStoreLink } from '@/components/AppStoreLink'
import { Container } from '@/components/Container'
import { GooglePlayLink } from '@/components/GooglePlayLink'
import { BodyWeightScalesIcon } from '@/images/icons/BodyWeightScalesIcon'
import { MeasurementVerticalIcon } from '@/images/icons/MeasurementVerticalIcon'
import { MeasuringTapeIcon } from '@/images/icons/MeasuringTapeIcon'
import { SkinfoldIcon } from '@/images/icons/SkinfoldIcon'

// Helper function to check if formula needs specific measurements
function getRequiredMeasurements(formula: keyof typeof FORMULA_DEFINITIONS) {
  const fields = FORMULA_DEFINITIONS[formula].fields
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
    'navy',
  ] as const
  const premiumRequirements = premiumFormulas.map(getRequiredMeasurements)

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#000000] py-20 sm:py-28">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-20 top-20 h-[1000px] w-[1000px] rounded-full bg-gradient-to-tr from-[#ff4694]/40 to-[#776fff]/40 opacity-20 blur-[120px]"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-[#FF0000]/30 to-[#FF5722]/30 opacity-20 blur-[100px]"
          animate={{
            scale: [1.2, 0.8, 1.2],
            rotate: [90, 0, 90],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Free or PRO+ — Your Choice
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Start free or unlock all features with PRO+ — available as a subscription or one-time
            lifetime purchase
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Free Version */}
          <div className="relative rounded-2xl bg-[#1a1a1a] p-8 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-white">Free Version</h3>
              <p className="mt-2 text-gray-400">Perfect for casual measurements</p>

              <div className="mt-8 flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <CheckIcon className="h-5 w-5 text-[#FFC107]" />
                    <span>3 Free Basic Methods</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckIcon className="h-5 w-5 text-[#FFC107]" />
                    <span>±4-7% Accuracy*</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckIcon className="h-5 w-5 text-[#FFC107]" />
                    <span>Basic Results</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {freeRequirements.some((r) => r.needsWeight) && (
                    <BodyWeightScalesIcon size="12" className="text-gray-400" />
                  )}
                  {freeRequirements.some((r) => r.needsHeight) && (
                    <MeasurementVerticalIcon size="12" className="text-gray-400" />
                  )}
                  {freeRequirements.some((r) => r.needsCircumference) && (
                    <MeasuringTapeIcon size="12" className="text-gray-400" />
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">Free forever</p>
              </div>
            </div>
          </div>

          {/* PRO Version */}
          <div className="relative rounded-2xl bg-gradient-to-br from-[#FF0000] to-[#FF5722] p-[1px] shadow-xl transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative h-full rounded-2xl bg-[#1a1a1a] p-8">
              {/* Recommended badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF0000] to-[#FF5722] px-4 py-1 text-sm font-semibold text-white shadow-lg">
                  RECOMMENDED
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">PRO+</h3>
                  <div className="font-large inline-flex items-center gap-1.5 rounded-full border-2 border-gray-400 px-3 py-1 text-sm text-white">
                    <Unlock size={16} />
                    One-time option available
                  </div>
                </div>
                <p className="mt-2 text-gray-400">For professionals and enthusiasts</p>

                <div className="mt-8 flex-1 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                      <CheckIcon className="h-5 w-5 text-[#4CAF50]" />
                      <span>6 Additional Professional Methods</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <CheckIcon className="h-5 w-5 text-[#4CAF50]" />
                      <span>History & Progress Tracking</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <CheckIcon className="h-5 w-5 text-[#4CAF50]" />
                      <span>Cloud Sync & Health Integration</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {premiumRequirements.some((r) => r.needsWeight) && (
                      <BodyWeightScalesIcon size="12" className="text-gray-400" />
                    )}
                    {premiumRequirements.some((r) => r.needsHeight) && (
                      <MeasurementVerticalIcon size="12" className="text-gray-400" />
                    )}
                    {premiumRequirements.some((r) => r.needsCircumference) && (
                      <MeasuringTapeIcon size="12" className="text-gray-400" />
                    )}
                    {premiumRequirements.some((r) => r.needsSkinfold) && (
                      <SkinfoldIcon size="12" className="text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-500">From</span>
                    <span className="font-medium text-white">£3.99/month or £49.99 lifetime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          * Accuracy ranges are estimates. Results depend on measurement technique.
        </p>

        {/* MASSIVE Download Button */}
        <div className="mt-20 flex flex-col items-center justify-center">
          <div className="mb-6 text-center">
            <p className="text-xl font-medium text-white">Ready to get started?</p>
            <p className="mt-2 text-gray-400">Download now and start measuring</p>
          </div>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-20">
            <AppStoreLink
              className="scale-150 transform transition-all duration-300 hover:scale-[1.6]"
              location="cta"
            />
            <GooglePlayLink
              className="scale-150 transform transition-all duration-300 hover:scale-[1.6]"
              location="cta"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
