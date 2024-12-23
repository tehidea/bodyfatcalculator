'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'

export default function Methods() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              Body Fat Measurement Methods
            </h1>
            <p className="mt-4 text-base text-gray-400">
              A comprehensive guide to the most accurate and scientifically
              validated body fat measurement methods available in our app.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Free Methods Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Free Methods
                </h2>
                <div className="mt-8 space-y-12">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      YMCA Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A simple yet effective method using weight and waist
                      measurements. With an accuracy range of ±5-7%, it's best
                      suited for tracking personal trends rather than absolute
                      values.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Uses basic measurements anyone can take at home</li>
                      <li>Ideal for beginners and regular progress tracking</li>
                      <li>
                        Less accurate for athletic or non-standard body types
                      </li>
                      <li>Validated through extensive YMCA fitness research</li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Modified YMCA Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      An enhanced version of the YMCA method with additional
                      measurements for women, offering improved accuracy of
                      ±4-6%.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Gender-specific calculations for better accuracy</li>
                      <li>Additional measurements for women</li>
                      <li>More reliable than the basic YMCA method</li>
                      <li>Still affected by non-standard fat distribution</li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      U.S. Navy Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A military standard using key body measurements, offering
                      accuracy of ±4-6%. This method is widely used in military
                      and fitness settings.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Uses circumference measurements at key body points
                      </li>
                      <li>Most accurate for those near population averages</li>
                      <li>Less reliable for very lean or obese individuals</li>
                      <li>Requires precise measurement technique</li>
                    </ul>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* PRO Methods Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  PRO Methods
                </h2>
                <div className="mt-8 space-y-12">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Jackson & Pollock Methods
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The gold standard in skinfold measurements, offering
                      multiple variants with increasing accuracy:
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>3-Site: ±4-5% accuracy, quick but reliable</li>
                      <li>4-Site: ±3.5-4.5% accuracy, balanced approach</li>
                      <li>7-Site: ±3-4% accuracy, most comprehensive</li>
                      <li>Industry standard for professional assessments</li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Durnin & Womersley
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A scientific skinfold method with age and gender-specific
                      equations, offering accuracy of ±3.5-5%.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Age and gender-specific calculations</li>
                      <li>Validated through extensive research</li>
                      <li>Requires proper caliper technique</li>
                      <li>Ideal for clinical settings</li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Parillo 9-Site Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A comprehensive nine-site method popular in bodybuilding,
                      offering accuracy of ±3-4% when performed correctly.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Most comprehensive skinfold method</li>
                      <li>Ideal for trained individuals</li>
                      <li>Requires significant expertise</li>
                      <li>Best for tracking changes over time</li>
                    </ul>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Measurement Tools Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Measurement Tools
                </h2>
                <div className="mt-8">
                  <p className="text-gray-300">
                    Our app supports measurements from all major caliper brands
                    and measurement tools:
                  </p>
                  <div className="mt-6 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Skinfold Calipers
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Harpenden</li>
                        <li>Lange</li>
                        <li>Slim Guide</li>
                        <li>Accu-Measure</li>
                        <li>FatTrack</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Tape Measures
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Gulick II</li>
                        <li>MyoTape</li>
                        <li>Seca</li>
                        <li>AccuFitness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
