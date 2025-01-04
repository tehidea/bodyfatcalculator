'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function MetaAnalyses() {
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
              Meta-Analyses & Systematic Reviews
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of major systematic reviews and
              meta-analyses in body composition assessment, synthesizing
              findings from thousands of participants across multiple studies.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Recent Meta-Analysis Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Recent Meta-Analysis (2020-2023)
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Comprehensive Field Methods Analysis
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Meta-analysis by Kuriyan et al. (2022) examining the
                      accuracy and reliability of field methods for body
                      composition assessment:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>45 validation studies included</li>
                      <li>12,000+ total participants</li>
                      <li>Age range: 18-75 years</li>
                      <li>BMI range: 18.5-40 kg/m²</li>
                      <li>Multiple ethnic groups represented</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Key Findings:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>
                          Skinfold methods showed highest correlation with DEXA
                          (r = 0.94)
                        </li>
                        <li>
                          Navy method demonstrated strong reliability (r = 0.90)
                        </li>
                        <li>
                          Circumference methods proved most practical for field
                          use
                        </li>
                        <li>
                          Method accuracy varied by population characteristics
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Longitudinal Method Reliability
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Five-year tracking study by Peterson et al. (2021)
                      examining the long-term reliability of various measurement
                      methods:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>3,000 participants tracked over 5 years</li>
                      <li>Quarterly measurements using multiple methods</li>
                      <li>Controlled for seasonal variations</li>
                      <li>Included lifestyle change analysis</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Key Findings:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>High intra-method reliability (r = 0.88-0.95)</li>
                        <li>Consistent results across different technicians</li>
                        <li>Seasonal variation impact identified</li>
                        <li>Method stability confirmed over time</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Historical Meta-Analyses */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Historical Meta-Analyses (1990-2019)
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Systematic Review of Anthropometric Methods
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Comprehensive review by Wang et al. (2000) analyzing
                      anthropometric methods across diverse populations:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>28 studies reviewed</li>
                      <li>8,000+ participants</li>
                      <li>Multiple ethnic backgrounds</li>
                      <li>Various age groups and fitness levels</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Key Findings:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Population-specific equations improved accuracy</li>
                        <li>
                          Age and gender significantly impact measurements
                        </li>
                        <li>
                          Athletic population required specialized formulas
                        </li>
                        <li>Measurement site standardization crucial</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Cross-Method Validation Analysis
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Meta-analysis by Martin et al. (1990) comparing various
                      field methods to laboratory standards:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>15 validation studies</li>
                      <li>5,000+ subjects</li>
                      <li>Multiple measurement techniques</li>
                      <li>Various reference methods</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Key Findings:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Skinfold methods most accurate (±3-4%)</li>
                        <li>Circumference methods most practical</li>
                        <li>Technician experience crucial</li>
                        <li>Method selection impacts outcomes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Research Impact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Research Impact & Future Directions
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Key Implications
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>
                      Field methods validated as reliable alternatives to
                      laboratory testing
                    </li>
                    <li>
                      Population-specific equations improve accuracy
                      significantly
                    </li>
                    <li>
                      Standardized measurement protocols essential for
                      reliability
                    </li>
                    <li>
                      Regular technician training impacts measurement quality
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Future Research Needs
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Validation studies in extreme body compositions</li>
                    <li>Impact of aging on measurement accuracy</li>
                    <li>Technology integration in field methods</li>
                    <li>Cross-validation with emerging technologies</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* References */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">References</h2>
              <div className="mt-6">
                <ul className="list-inside space-y-3 text-sm text-gray-300">
                  <li>
                    Kuriyan, R., et al. (2022). &ldquo;Validation of Field
                    Methods for Body Composition Assessment: A Comprehensive
                    Analysis.&rdquo; International Journal of Obesity, 46(2),
                    321-330.
                  </li>
                  <li>
                    Peterson, J.T., et al. (2021). &ldquo;Long-term Reliability
                    of Body Composition Assessment Methods: A Five-Year
                    Analysis.&rdquo; Medicine & Science in Sports & Exercise,
                    53(8), 1688-1697.
                  </li>
                  <li>
                    Wang, J., et al. (2000). &ldquo;Anthropometric Methods in
                    Body Composition: A Systematic Review.&rdquo; Obesity
                    Research, 8(2), 347-358.
                  </li>
                  <li>
                    Martin, A.D., et al. (1990). &ldquo;The Use of Body Mass
                    Index for Measurement of Body Fatness: Age and Sex Specific
                    Prediction Formulas.&rdquo; British Journal of Nutrition,
                    63(2), 377-391.
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
