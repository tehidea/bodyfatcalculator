'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock } from 'react-feather'

export default function Methods() {
  return (
    <Layout>
      <Container className="relative isolate py-16 sm:py-24">
        <CirclesBackground className="absolute left-1/2 top-0 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)]" />

        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">Methods</li>
            </ol>
          </nav>

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
            {/* Method Selection Guide */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Method Selection Guide
              </h2>
              <p className="mt-4 text-gray-300">
                Find the most suitable method based on your needs and available
                equipment.
              </p>

              <div className="mt-8 space-y-8">
                {/* For Athletes */}
                <div className="rounded-lg bg-black/20 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    For Athletes & Bodybuilders
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    When maximum precision is required for competition or
                    detailed progress tracking.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link href="#methods/parrillo" className="block">
                      <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">
                              Parrillo Method
                            </h4>
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            9-site skinfold method optimized for bodybuilders
                          </p>
                        </div>
                        <span className="text-[#4CAF50]">±3-4%</span>
                      </div>
                    </Link>
                    <Link href="#methods/jackson-pollock-7" className="block">
                      <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">
                              Jackson & Pollock 7-Site
                            </h4>
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            Gold standard for professional assessment
                          </p>
                        </div>
                        <span className="text-[#4CAF50]">±3-4%</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* For Regular Tracking */}
                <div className="rounded-lg bg-black/20 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    For Regular Progress Tracking
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    When you need a good balance between accuracy and
                    convenience.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link href="#methods/jackson-pollock-3" className="block">
                      <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">
                              Jackson & Pollock 3-Site
                            </h4>
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                              <Lock size={10} /> PRO
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-400">
                            Quick but reliable skinfold method
                          </p>
                        </div>
                        <span className="text-[#FFC107]">±4-5%</span>
                      </div>
                    </Link>
                    <Link href="#methods/us-navy" className="block">
                      <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                        <div>
                          <h4 className="font-medium text-white">
                            US Navy Method
                          </h4>
                          <p className="mt-1 text-sm text-gray-400">
                            Simple circumference measurements
                          </p>
                        </div>
                        <span className="text-[#FFC107]">±4-6%</span>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* For Quick Checks */}
                <div className="rounded-lg bg-black/20 p-6">
                  <h3 className="text-lg font-semibold text-white">
                    For Quick Assessments
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    When speed and simplicity are priorities over maximum
                    precision.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link href="#methods/ymca-modified" className="block">
                      <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                        <div>
                          <h4 className="font-medium text-white">
                            Modified YMCA
                          </h4>
                          <p className="mt-1 text-sm text-gray-400">
                            Enhanced accuracy over standard YMCA
                          </p>
                        </div>
                        <span className="text-[#FF5722]">±4-6%</span>
                      </div>
                    </Link>
                    <Link href="#methods/ymca" className="block">
                      <div className="flex items-center justify-between rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30">
                        <div>
                          <h4 className="font-medium text-white">
                            YMCA Method
                          </h4>
                          <p className="mt-1 text-sm text-gray-400">
                            Fastest basic screening method
                          </p>
                        </div>
                        <span className="text-[#FF5722]">±5-7%</span>
                      </div>
                    </Link>
                  </div>
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
                  <article id="methods/us-navy">
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

                  <article id="methods/ymca-modified">
                    <h3 className="text-xl font-semibold text-white">
                      Modified YMCA Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      An enhanced version of the YMCA method, incorporating
                      additional measurements for improved accuracy,
                      particularly for women. Validated against hydrostatic
                      weighing with r = 0.80-0.85.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±4-6% compared to DEXA</li>
                      <li>Enhanced accuracy for women</li>
                      <li>Accounts for body frame size</li>
                      <li>Uses multiple circumference measurements</li>
                      <li>Better for diverse body types</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Take all measurements in
                      the same order each time, ensuring consistent tension on
                      the measuring tape.
                    </div>
                  </article>

                  <article id="methods/ymca">
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
                  <article id="methods/parrillo">
                    <h3 className="text-xl font-semibold text-white">
                      Parrillo 9-Site Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Developed by John Parrillo specifically for bodybuilding
                      applications. Uses nine skinfold sites to account for
                      various fat distribution patterns. Particularly effective
                      for athletic populations.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±3-4% when performed correctly</li>
                      <li>Most comprehensive skinfold method</li>
                      <li>Excellent for trained individuals</li>
                      <li>Accounts for athletic body types</li>
                      <li>Best for bodybuilding applications</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Take measurements in a
                      rotational sequence to allow skin to return to normal.
                      Sites include: chest, axilla, triceps, subscapular,
                      abdominal, suprailiac, lower back, calf, and quadriceps.
                    </div>
                  </article>

                  <article id="methods/jackson-pollock-7">
                    <h3 className="text-xl font-semibold text-white">
                      Jackson & Pollock 7-Site Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      The gold standard in skinfold-based body fat assessment.
                      Uses seven strategic measurement sites for maximum
                      accuracy. Validated against hydrostatic weighing with
                      correlation coefficients exceeding 0.94.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±3-4% compared to hydrostatic weighing</li>
                      <li>Highest correlation with hydrostatic weighing</li>
                      <li>Most comprehensive skinfold method</li>
                      <li>Excellent for research and clinical applications</li>
                      <li>Gold standard for field testing</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Grasp skinfolds firmly
                      between thumb and index finger. Measure chest,
                      midaxillary, triceps, subscapular, abdomen, suprailiac,
                      and thigh sites. Wait 1-2 seconds after applying caliper
                      before reading.
                    </div>
                  </article>

                  <article id="methods/jackson-pollock-4">
                    <h3 className="text-xl font-semibold text-white">
                      Jackson & Pollock 4-Site Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      An intermediate version between the 3-site and 7-site
                      methods, offering improved accuracy while maintaining
                      practical efficiency. Validated against hydrostatic
                      weighing with correlation coefficients of r = 0.92-0.94.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Accuracy: ±3.5-4.5% compared to hydrostatic weighing
                      </li>
                      <li>Better accuracy than 3-site method</li>
                      <li>Balanced approach to measurement</li>
                      <li>Gender-specific measurement sites</li>
                      <li>Excellent balance of accuracy and practicality</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> For men: chest, triceps,
                      subscapular, and abdominal sites. For women: triceps,
                      suprailiac, abdomen, and thigh. Always measure on the
                      right side of the body.
                    </div>
                  </article>

                  <article id="methods/durnin-womersley">
                    <h3 className="text-xl font-semibold text-white">
                      Durnin & Womersley Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Published in 1974, this method pioneered age-specific body
                      fat calculations. Based on research with 481 subjects aged
                      16-72 years and validated against hydrostatic weighing.
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
                      <strong>Measurement Tip:</strong> Measure biceps, triceps,
                      subscapular, and suprailiac sites. Take readings 2 seconds
                      after applying caliper. Repeat measurements in the same
                      sequence for consistency.
                    </div>
                  </article>

                  <article id="methods/jackson-pollock-3">
                    <h3 className="text-xl font-semibold text-white">
                      Jackson & Pollock 3-Site Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A simplified version of the 7-site method, providing quick
                      but accurate body fat measurements. Validated against
                      hydrostatic weighing with correlation coefficients of r =
                      0.90-0.93.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±4-5% compared to hydrostatic weighing</li>
                      <li>Ideal for quick assessments</li>
                      <li>Gender-specific measurement sites</li>
                      <li>Validated on 1,500+ subjects</li>
                      <li>Excellent for tracking changes</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> For men: chest, abdomen,
                      and thigh. For women: triceps, suprailiac, and thigh. Take
                      measurements standing, with skin dry and unmarked. Wait 2
                      seconds after applying caliper.
                    </div>
                  </article>

                  <article id="methods/covert-bailey">
                    <h3 className="text-xl font-semibold text-white">
                      Covert Bailey Method
                    </h3>
                    <p className="mt-4 text-gray-300">
                      A comprehensive method using multiple body measurements,
                      developed to provide accurate estimates for different body
                      types and age groups. Validated against hydrostatic
                      weighing with r = 0.88-0.90.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Accuracy: ±4-5% compared to hydrostatic weighing</li>
                      <li>Age-specific formulas</li>
                      <li>Gender-specific measurement sites</li>
                      <li>Accounts for body frame variations</li>
                      <li>Good for general population use</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Measurement Tip:</strong> Take measurements at
                      triceps, suprailiac, and thigh sites. Ensure subject is
                      relaxed and standing. Measure each site twice and use the
                      average if readings differ by more than 1mm.
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Measurement Tools Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">
                  Measurement Tools
                </h2>
                <div className="mt-8 space-y-12">
                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Skinfold Calipers
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Professional-grade calipers designed for accurate skinfold
                      measurements. Essential for all skinfold-based methods.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Precision up to 0.5mm</li>
                      <li>Consistent pressure application</li>
                      <li>Durable construction</li>
                      <li>Regular calibration required</li>
                      <li>Available in digital and analog versions</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Usage Tip:</strong> Apply calipers 1cm away from
                      pinched fingers, release after 2 seconds of pressure.
                      Clean with alcohol wipes after use.
                    </div>
                  </article>

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Measuring Tape
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Flexible, non-stretchable tape measure for circumference
                      measurements. Required for Navy method and YMCA methods.
                    </p>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Non-elastic material</li>
                      <li>Clear markings in cm/inches</li>
                      <li>Easy to clean</li>
                      <li>Portable and lightweight</li>
                      <li>Replaceable when worn</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4 text-sm text-gray-300">
                      <strong>Usage Tip:</strong> Keep tape parallel to floor,
                      snug but not compressing tissue. Take measurements at end
                      of normal exhalation.
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Laboratory Standards Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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

                  <article>
                    <h3 className="text-xl font-semibold text-white">
                      Hydrostatic Weighing
                    </h3>
                    <p className="mt-4 text-gray-300">
                      Traditional gold standard with ±1.5-2.5% accuracy. Based
                      on Archimedes&apos; principle of water displacement to
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
                </div>
              </div>
            </motion.section>

            {/* Research References */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10">
                <h2 className="text-2xl font-semibold text-white">
                  Scientific Research
                </h2>
                <p className="mt-4 text-gray-300">
                  Our methods are backed by extensive scientific research and
                  validation studies. Learn more about:
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Link
                    href="/research/validation-studies"
                    className="group rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      Validation Studies
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Review scientific validation against laboratory standards
                      like DEXA and hydrostatic weighing.
                    </p>
                  </Link>
                  <Link
                    href="/research/comparison"
                    className="group rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      Method Comparisons
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Compare accuracy, reliability, and practical
                      considerations across all methods.
                    </p>
                  </Link>
                  <Link
                    href="/research/clinical-applications"
                    className="group rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      Clinical Applications
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Explore real-world applications in healthcare and fitness
                      settings.
                    </p>
                  </Link>
                  <Link
                    href="/research/meta-analyses"
                    className="group rounded-lg bg-black/20 p-4 transition-colors duration-200 hover:bg-black/30"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      Meta-Analyses
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      Review comprehensive analyses of multiple validation
                      studies.
                    </p>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
