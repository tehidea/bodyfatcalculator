'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

export default function ValidationStudies() {
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
              Validation Studies
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive collection of empirical validation studies comparing
              field methods against laboratory standards like DEXA and
              hydrostatic weighing, with detailed analysis of accuracy,
              reliability, and practical implications.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Laboratory Standards Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Laboratory Standards
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    DEXA (Dual-Energy X-ray Absorptiometry)
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Gold standard for body composition assessment, providing
                      detailed regional and total body composition measurements:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Accuracy: ±1-2% body fat</li>
                      <li>Precision: CV {'<'} 1%</li>
                      <li>Radiation exposure: minimal (0.001 mSv)</li>
                      <li>Scan time: 5-10 minutes</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Hydrostatic Weighing
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Traditional gold standard method based on Archimedes&apos;
                      principle:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Accuracy: ±2-2.5% body fat</li>
                      <li>Precision: CV = 1.5%</li>
                      <li>Test duration: 20-30 minutes</li>
                      <li>Requires full submersion</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Skinfold Methods Validation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Skinfold Methods Validation
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Jackson & Pollock Validation Studies
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Original validation studies (1978-1980) and modern
                      cross-validation research:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          7-Site Protocol
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.94</li>
                          <li>SEE: ±3.0% body fat</li>
                          <li>Sample: 1,500+ subjects</li>
                          <li>Cross-validated with DEXA</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          3-Site Protocol
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.91</li>
                          <li>SEE: ±3.9% body fat</li>
                          <li>Sample: 900+ subjects</li>
                          <li>Validated across populations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Durnin & Womersley Validation
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Age-specific validation studies across different
                      populations:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Original sample: 481 subjects</li>
                        <li>Age range: 16-72 years</li>
                        <li>Correlation with HW: r = 0.90</li>
                        <li>SEE: ±3.5-5% body fat</li>
                        <li>Validated for age-specific changes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Circumference Methods */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Circumference Methods
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    US Navy Method Validation
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Comprehensive validation studies in military and civilian
                      populations:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Military validation (n=1,585)</li>
                        <li>Civilian validation (n=2,300)</li>
                        <li>
                          Correlation with HW: r = 0.90 (men), r = 0.85 (women)
                        </li>
                        <li>SEE: ±3.0% men, ±3.5% women</li>
                        <li>Cross-validated with DEXA in 2020</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    YMCA Method Studies
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Validation studies of original and modified YMCA methods:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Original YMCA
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.82</li>
                          <li>SEE: ±5-7% body fat</li>
                          <li>Sample: 1,200+ subjects</li>
                          <li>General population focus</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Modified YMCA
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Correlation with HW: r = 0.88</li>
                          <li>SEE: ±4-6% body fat</li>
                          <li>Sample: 1,500+ subjects</li>
                          <li>Enhanced female accuracy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Validation Considerations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Validation Considerations
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Population Specificity
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Athletic vs general population accuracy differences</li>
                    <li>Age-related measurement variations</li>
                    <li>Gender-specific considerations</li>
                    <li>Ethnic variation impacts</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Technical Factors
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Measurement site standardization</li>
                    <li>Technician training impact</li>
                    <li>Equipment quality considerations</li>
                    <li>Environmental conditions</li>
                  </ul>
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
                    Jackson, A.S., & Pollock, M.L. (1978). &ldquo;Generalized
                    equations for predicting body density of men.&rdquo; British
                    Journal of Nutrition, 40(3), 497-504.
                  </li>
                  <li>
                    Durnin, J.V.G.A., & Womersley, J. (1974). &ldquo;Body fat
                    assessed from total body density and its estimation from
                    skinfold thickness.&rdquo; British Journal of Nutrition,
                    32(1), 77-97.
                  </li>
                  <li>
                    Hodgdon, J.A., & Beckett, M.B. (1984). &ldquo;Prediction of
                    percent body fat for U.S. Navy men and women.&rdquo; Naval
                    Health Research Center Report, No. 84-11.
                  </li>
                  <li>
                    YMCA. (2000). &ldquo;YMCA Body Composition and Additional
                    Analyses Manual.&rdquo; Human Kinetics.
                  </li>
                  <li>
                    Friedl, K.E., et al. (2020). &ldquo;Body Composition
                    Standards and Assessment in the U.S. Military.&rdquo;
                    Military Medicine, 185(9), e1472-e1479.
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
