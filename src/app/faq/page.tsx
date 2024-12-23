'use client'

import { Container } from '@/components/Container'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'

export default function FAQ() {
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
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Common questions and answers about body fat measurement methods,
              accuracy, and best practices.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* General Questions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  General Questions
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      What is body fat percentage?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Body fat percentage is the total mass of fat divided by
                      total body mass. It includes both essential fat (needed
                      for basic bodily functions) and storage fat. This
                      measurement is more meaningful than BMI for assessing body
                      composition.
                    </p>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Which measurement method should I use?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The best method depends on your needs:
                    </p>
                    <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        YMCA Method: Quick and easy, good for regular tracking
                      </li>
                      <li>
                        Navy Method: Good balance of accuracy and simplicity
                      </li>
                      <li>
                        Skinfold Methods: Most accurate but require proper
                        technique
                      </li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      How often should I measure?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      For most people, measuring every 2-4 weeks is sufficient.
                      Body fat changes slowly, and more frequent measurements
                      may not show meaningful changes. Consistency in timing and
                      conditions is more important than frequency.
                    </p>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Accuracy Questions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Accuracy & Reliability
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      How accurate are these methods?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Accuracy varies by method:
                    </p>
                    <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                      <li>YMCA Method: ±5-7% accuracy</li>
                      <li>Navy Method: ±4-6% accuracy</li>
                      <li>
                        Jackson & Pollock (7-site): ±3-4% accuracy when done
                        correctly
                      </li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Why do different methods give different results?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Each method uses different measurements and equations
                      optimized for specific populations. Variations can occur
                      due to differences in body type, measurement technique,
                      and the underlying assumptions of each method.
                    </p>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      How can I ensure accurate measurements?
                    </h3>
                    <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                      <li>Measure at the same time of day</li>
                      <li>Use consistent measurement locations</li>
                      <li>Take multiple measurements and average them</li>
                      <li>Follow proper measurement techniques</li>
                      <li>Use quality measurement tools</li>
                    </ul>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Technical Questions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Technical Questions
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      What equipment do I need?
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Required equipment depends on the method:
                      </p>
                      <ul className="list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                        <li>Basic methods: Tape measure and scale</li>
                        <li>
                          Skinfold methods: Quality caliper (Harpenden, Lange,
                          or similar)
                        </li>
                        <li>All methods: Our app for calculations</li>
                      </ul>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      How do I take skinfold measurements?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Proper technique is crucial:
                    </p>
                    <ul className="mt-4 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                      <li>Grasp skin and fat between thumb and forefinger</li>
                      <li>Pull away from muscle</li>
                      <li>Place caliper 1cm below fingers</li>
                      <li>Read measurement within 2 seconds</li>
                      <li>Take 2-3 measurements at each site</li>
                    </ul>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Interpretation Questions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Interpreting Results
                </h2>
                <div className="mt-8 space-y-8">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      What is a healthy body fat percentage?
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Healthy ranges vary by gender and age:
                      </p>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                          <h4 className="font-medium text-white">Men</h4>
                          <ul className="mt-2 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                            <li>Essential fat: 2-5%</li>
                            <li>Athletes: 6-13%</li>
                            <li>Fitness: 14-17%</li>
                            <li>Acceptable: 18-24%</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-white">Women</h4>
                          <ul className="mt-2 list-disc pl-6 text-gray-300 marker:text-[#FF0000]">
                            <li>Essential fat: 10-13%</li>
                            <li>Athletes: 14-20%</li>
                            <li>Fitness: 21-24%</li>
                            <li>Acceptable: 25-31%</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      How quickly can body fat percentage change?
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Healthy fat loss typically occurs at 0.5-1% per week with
                      proper diet and exercise. Faster changes may indicate
                      water weight fluctuations rather than true fat loss. Focus
                      on long-term trends rather than daily or weekly changes.
                    </p>
                  </article>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
