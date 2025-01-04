'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function DurninWomersley() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/research"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Research Overview
            </Link>
          </div>

          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Durnin & Womersley Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of the Durnin & Womersley skinfold method,
              featuring age-specific equations and extensive validation across
              different populations. Explore its unique approach to accounting
              for age-related changes in body composition.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Historical Development */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Historical Development
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Original Research (1974)
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Groundbreaking study addressing age-related variations in
                      body composition:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>481 subjects studied (272 males, 209 females)</li>
                      <li>Age range: 16-72 years</li>
                      <li>First method to account for age differences</li>
                      <li>Validated against hydrostatic weighing</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Method Evolution
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Development and refinement over time:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>1974: Original equations published</li>
                        <li>1980s: Population-specific validations</li>
                        <li>1990s: Cross-validation studies</li>
                        <li>2000s: DEXA comparison studies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Method Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Method Details
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Measurement Protocol
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Measurement Sites
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Biceps</li>
                          <li>Triceps</li>
                          <li>Subscapular</li>
                          <li>Suprailiac</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Age Categories
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>17-19 years</li>
                          <li>20-29 years</li>
                          <li>30-39 years</li>
                          <li>40-49 years</li>
                          <li>50+ years</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Statistical Validation
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Original Validation
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.90</li>
                          <li>SEE: ±3.5-5% body fat</li>
                          <li>Test-retest reliability: r = 0.97</li>
                          <li>Age-specific accuracy verified</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Modern Validation
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>DEXA comparisons</li>
                          <li>Multiple population studies</li>
                          <li>Ethnic group validations</li>
                          <li>Athletic population studies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Age-Specific Considerations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Age-Specific Considerations
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Age-Related Changes
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Fat distribution patterns</li>
                      <li>Skin elasticity variations</li>
                      <li>Muscle mass changes</li>
                      <li>Hydration status differences</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Equation Adjustments
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Age-specific constants</li>
                      <li>Gender-specific factors</li>
                      <li>Body density calculations</li>
                      <li>Fat percentage conversion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Clinical Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Clinical Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Research Applications
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Aging studies</li>
                      <li>Longitudinal monitoring</li>
                      <li>Population research</li>
                      <li>Clinical trials</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      Practical Uses
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Geriatric assessment</li>
                      <li>Health screening</li>
                      <li>Nutritional monitoring</li>
                      <li>Fitness evaluation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* References */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">References</h2>
              <div className="mt-6">
                <ul className="list-inside space-y-3 text-sm text-gray-300">
                  <li>
                    Durnin, J.V.G.A., & Womersley, J. (1974). &ldquo;Body fat
                    assessed from total body density and its estimation from
                    skinfold thickness: measurements on 481 men and women aged
                    from 16 to 72 years.&rdquo; British Journal of Nutrition,
                    32(1), 77-97.
                  </li>
                  <li>
                    Eston, R.G., & Reilly, T. (2009). &ldquo;Kinanthropometry
                    and Exercise Physiology Laboratory Manual: Tests, Procedures
                    and Data.&rdquo; Routledge, 3rd Edition.
                  </li>
                  <li>
                    Martin, A.D., et al. (1985). &ldquo;The use of body mass
                    index for measurement of body fatness in men and women: age
                    specific prediction formulas.&rdquo; International Journal
                    of Obesity, 9(2), 147-153.
                  </li>
                  <li>
                    Reilly, J.J., et al. (1995). &ldquo;Determination of body
                    composition from skinfold thickness: a validation
                    study.&rdquo; Archives of Disease in Childhood, 73(4),
                    305-310.
                  </li>
                </ul>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
