'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default function NavyMethod() {
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
              US Navy Method
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Comprehensive analysis of the US Navy circumference-based body fat assessment method,
              including its development, validation studies, and widespread adoption in military and
              civilian applications.
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
              <h2 className="text-2xl font-semibold text-white">Historical Development</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Original Research (1984)</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Development by Hodgdon and Beckett at the Naval Health Research Center:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Developed at the Naval Health Research Center</li>
                      <li>Gender-specific equation development</li>
                      <li>Based on circumference measurements and height</li>
                      <li>Designed for field practicality</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Method Evolution</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">Refinement and validation over decades:</p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>1984: Original equations published</li>
                        <li>Ongoing use in military field settings</li>
                        <li>2020: Updated military standards</li>
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
              <h2 className="text-2xl font-semibold text-white">Method Details</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Measurement Protocol</h3>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Male Measurements</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Height</li>
                          <li>Neck circumference</li>
                          <li>Waist circumference</li>
                          <li>Standardized posture</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Female Measurements</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Height</li>
                          <li>Neck circumference</li>
                          <li>Waist circumference</li>
                          <li>Hip circumference</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Statistical Validation</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">Reported accuracy ranges and limitations:</p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Typical accuracy range: ±4-6%</li>
                      <li>Most accurate for individuals near population averages</li>
                      <li>Less reliable for very lean or obese individuals</li>
                      <li>Accuracy depends on measurement technique</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Practical Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Practical Applications</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Military Use</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Physical fitness standards</li>
                      <li>Combat readiness assessment</li>
                      <li>Career progression criteria</li>
                      <li>Health screening tool</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Civilian Applications</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Public health screening</li>
                      <li>Fitness center assessments</li>
                      <li>Clinical monitoring</li>
                      <li>Research studies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Advantages and Limitations */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Advantages and Limitations</h2>
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Key Advantages</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>No special equipment needed</li>
                      <li>Quick and non-invasive</li>
                      <li>Minimal technical expertise required</li>
                      <li>Good reliability in field settings</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-black/20 p-4">
                    <h3 className="text-lg font-semibold text-white">Limitations</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                      <li>Less accurate for extreme body types</li>
                      <li>Affected by hydration status</li>
                      <li>Posture affects measurements</li>
                      <li>Limited for athletic assessment</li>
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
                    Hodgdon, J.A., & Beckett, M.B. (1984). &ldquo;Prediction of percent body fat for
                    U.S. Navy men and women from body circumferences and height.&rdquo; Naval Health
                    Research Center Report, No. 84-29.
                  </li>
                  <li>
                    Heyward, V.H., & Wagner, D.R. (2004). &ldquo;Applied Body Composition Assessment
                    (2nd ed.).&rdquo; Human Kinetics.
                  </li>
                  <li>
                    Harty, P.S., et al. (2022). &ldquo;Military Body Composition Standards and
                    Physical Performance: Historical Perspectives and Future Directions.&rdquo; J
                    Strength Cond Res, 36(12), 3551-3561. DOI: 10.1519/JSC.0000000000004142
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
