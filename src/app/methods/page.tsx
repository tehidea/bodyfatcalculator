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
              A comprehensive guide to body fat measurement methods, from
              field-testing techniques to laboratory standards, with detailed
              accuracy assessments and practical applications.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Laboratory Methods Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Laboratory Standards
                </h2>
                <p className="mt-4 text-gray-300">
                  While not available in our app, these methods serve as the
                  gold standards against which our supported methods are
                  validated:
                </p>
                <div className="mt-8 space-y-12">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      DEXA (Dual-Energy X-ray Absorptiometry)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The current gold standard for body composition analysis,
                      offering ±1-2% accuracy. Uses low-dose X-rays to
                      differentiate between bone, fat, and lean tissue.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Highest accuracy in clinical settings</li>
                      <li>Can measure regional body composition</li>
                      <li>Provides bone density measurements</li>
                      <li>Used in major research studies</li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Hydrostatic Weighing
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Traditional gold standard with ±1.5-2.5% accuracy. Based
                      on Archimedes' principle of water displacement to
                      determine body density.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Requires complete underwater submersion</li>
                      <li>Accounts for residual lung volume</li>
                      <li>Used to validate most field methods</li>
                      <li>Limited by equipment availability</li>
                    </ul>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Air Displacement Plethysmography (Bod Pod)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Modern alternative to hydrostatic weighing, using air
                      displacement to measure body volume with ±2-3% accuracy.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Non-invasive and quick (5-10 minutes)</li>
                      <li>Suitable for most populations</li>
                      <li>Requires minimal subject cooperation</li>
                      <li>Used in clinical and research settings</li>
                    </ul>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Free Methods Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                      Developed through extensive YMCA research programs, this
                      method uses waist circumference and weight to estimate
                      body fat percentage. Validated against hydrostatic
                      weighing with a correlation coefficient of r = 0.72-0.82.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±5-7% compared to DEXA</li>
                      <li>Requires only a tape measure and scale</li>
                      <li>Best for tracking changes over time</li>
                      <li>Validated on 1,000+ subjects</li>
                      <li>Less accurate for athletic builds</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Measure waist at the
                      narrowest point, typically just above the belly button,
                      while standing relaxed.
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      U.S. Navy Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by Hodgdon and Beckett (1984) at the Naval
                      Health Research Center. Uses circumference measurements
                      and height to estimate body fat percentage. Validated
                      against hydrostatic weighing with r = 0.85-0.88.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±4-6% compared to hydrostatic weighing</li>
                      <li>Validated on 5,000+ military personnel</li>
                      <li>Gender-specific equations</li>
                      <li>Accounts for body shape variations</li>
                      <li>Used in military fitness assessments</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Take measurements in the
                      morning before eating, standing straight with muscles
                      relaxed. Ensure the tape is snug but not compressing the
                      skin.
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* PRO Methods Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
                      Published in the British Journal of Nutrition (1978) and
                      Medicine & Science in Sports & Exercise (1980), these
                      methods represent the gold standard in skinfold-based
                      assessment. Validated against hydrostatic weighing with
                      correlation coefficients exceeding 0.94.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        3-Site Method: ±4-5% accuracy, ideal for quick
                        assessments
                      </li>
                      <li>7-Site Method: ±3-4% accuracy, most comprehensive</li>
                      <li>Age-adjusted equations for better accuracy</li>
                      <li>Validated on 1,500+ subjects</li>
                      <li>Used in research and clinical settings</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Take skinfold
                      measurements on the right side of the body. Grasp the fold
                      firmly but avoid squeezing too hard. Take readings 2-3
                      seconds after applying the caliper.
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Durnin & Womersley Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Published in the British Journal of Nutrition (1974), this
                      method pioneered age-specific body fat calculations. Based
                      on research with 481 subjects aged 16-72 years and
                      validated against hydrostatic weighing.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy: ±3.5-5% compared to hydrostatic weighing
                      </li>
                      <li>Age and gender-specific equations</li>
                      <li>Validated across five age groups</li>
                      <li>Accounts for age-related changes</li>
                      <li>Ideal for longitudinal studies</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> For consistent results,
                      mark measurement sites with a surgical marker. Take
                      measurements in the same order each time.
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Parillo 9-Site Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by John Parillo for bodybuilding applications,
                      this comprehensive method uses nine skinfold sites to
                      account for various fat distribution patterns.
                      Particularly effective for athletic populations.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±3-4% when performed correctly</li>
                      <li>Most comprehensive skinfold method</li>
                      <li>Excellent for trained individuals</li>
                      <li>Accounts for athletic body types</li>
                      <li>Popular in bodybuilding community</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Due to the number of
                      sites, maintain consistent technique and order. Consider
                      taking multiple measurements at each site and using the
                      average.
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Measurement Tools Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Measurement Tools
                </h2>
                <div className="mt-8">
                  <p className="mt-4 text-gray-300">
                    The accuracy of your measurements greatly depends on the
                    quality and proper use of your tools. Here are our
                    recommended instruments, listed by precision level:
                  </p>
                  <div className="mt-6 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Professional Calipers
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Harpenden (±0.2mm accuracy)</li>
                        <li>Lange (±1mm accuracy)</li>
                        <li>Beta Technology (±0.5mm)</li>
                        <li>Lafayette (±1mm accuracy)</li>
                      </ul>
                      <p className="mt-4 text-sm text-gray-400">
                        Best for clinical and research settings
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Consumer Calipers
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Slim Guide (±1mm accuracy)</li>
                        <li>Accu-Measure (±1-2mm)</li>
                        <li>FatTrack (±1-2mm)</li>
                        <li>Baseline (±1mm accuracy)</li>
                      </ul>
                      <p className="mt-4 text-sm text-gray-400">
                        Suitable for personal use and fitness settings
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Professional Tape Measures
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Gulick II (spring-loaded)</li>
                        <li>Seca 201 (ergonomic)</li>
                        <li>Lufkin Executive (steel)</li>
                        <li>Hoechstmass (medical grade)</li>
                      </ul>
                      <p className="mt-4 text-sm text-gray-400">
                        Ensures consistent tension for accurate measurements
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Consumer Tape Measures
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>MyoTape (retractable)</li>
                        <li>AccuFitness (basic)</li>
                        <li>Orbitape (self-help)</li>
                        <li>RENPHO (smart)</li>
                      </ul>
                      <p className="mt-4 text-sm text-gray-400">
                        Good for self-measurement and home use
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Emerging Technologies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Emerging Technologies
                </h2>
                <div className="mt-8 space-y-12">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      3D Body Scanning
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Advanced optical scanning technology that creates detailed
                      3D models for body composition analysis. Currently being
                      validated against traditional methods.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Non-invasive and quick (30-60 seconds)</li>
                      <li>Preliminary accuracy: ±4-6% vs DEXA</li>
                      <li>Provides detailed body shape analysis</li>
                      <li>Requires specialized equipment</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Status:</strong> Promising technology still
                      undergoing validation studies. Currently used in research
                      settings and high-end fitness facilities.
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Bioelectrical Impedance Spectroscopy (BIS)
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Advanced version of traditional BIA, using multiple
                      frequencies for more detailed tissue analysis.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Multi-frequency analysis (5-1000 kHz)</li>
                      <li>Improved accuracy over traditional BIA</li>
                      <li>Measures intracellular/extracellular water</li>
                      <li>Less affected by hydration status</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Status:</strong> Gaining acceptance in clinical
                      settings, but still needs more validation for general
                      population use.
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Method Selection Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Method Selection Guide
                </h2>
                <div className="mt-8 space-y-8">
                  <div className="overflow-x-auto rounded-lg bg-black/20 ring-1 ring-white/10">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Your Goal
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Recommended Method
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Alternative Method
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            General Tracking
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Navy Method
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            YMCA Method
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Athletic Performance
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            7-Site Jackson & Pollock
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Parillo 9-Site
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Clinical Assessment
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin & Womersley
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3-Site Jackson & Pollock
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Quick Assessment
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3-Site Jackson & Pollock
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Navy Method
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Selection Factors
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Available equipment</li>
                        <li>Measurement expertise</li>
                        <li>Time constraints</li>
                        <li>Required accuracy</li>
                        <li>Subject characteristics</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Best Practices
                      </h3>
                      <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Use multiple methods when possible</li>
                        <li>Track trends over absolute values</li>
                        <li>Maintain consistent conditions</li>
                        <li>Document measurement details</li>
                        <li>Regular recalibration of tools</li>
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
