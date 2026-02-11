'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

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
              Comprehensive analysis of validation studies comparing field methods against
              laboratory standards, based on research by Jackson & Pollock (1978), Durnin &
              Womersley (1974), and recent systematic reviews (Wagner & Heyward, 1999).
            </p>
            <p className="mt-2 text-sm text-gray-500">Content last reviewed: February 11, 2026</p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Method Accuracy Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">Validation Overview</h2>
                <div className="mt-8">
                  <p className="mb-6 text-gray-400">
                    Typical accuracy ranges reported for field methods when measured correctly:
                  </p>
                  <div className="overflow-x-auto rounded-lg bg-black/20 ring-1 ring-white/10">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Method
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Accuracy Range
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Primary Reference
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson &amp; Pollock 7-Site
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">±3-4%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson &amp; Pollock (1985)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin &amp; Womersley
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">±3.5-5%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin & Womersley (1974)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">U.S. Navy</td>
                          <td className="px-6 py-4 text-sm text-gray-300">±4-6%</td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Hodgdon & Beckett (1984)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    Accuracy ranges assume proper measurement technique and calibrated tools.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Error Sources */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">Sources of Measurement Error</h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <article>
                    <h3 className="text-lg font-semibold text-white">Technical Errors</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Site location and landmarking</li>
                      <li>Caliper pressure and timing</li>
                      <li>Equipment calibration</li>
                      <li>Inter-observer variation</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Impact:</strong> Technical error of measurement varies with training
                        and consistency in technique.
                      </p>
                    </div>
                  </article>
                  <article>
                    <h3 className="text-lg font-semibold text-white">Biological Factors</h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Hydration status</li>
                      <li>Time of day</li>
                      <li>Recent exercise</li>
                      <li>Age and gender differences</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Impact:</strong> Biological factors can affect measurements between
                        sessions, so consistent conditions matter.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </motion.section>

            {/* Laboratory Standards */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Laboratory Standards</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    DEXA (Dual-Energy X-ray Absorptiometry)
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Common reference method for body composition assessment:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Used in research and clinical settings</li>
                      <li>Provides regional and whole-body composition data</li>
                      <li>Often used to validate field methods</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Hydrostatic Weighing</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">Long-standing reference method:</p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Requires water immersion and proper technique</li>
                      <li>Often used as a comparison standard</li>
                      <li>Supports body density-based equations</li>
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
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">Skinfold Methods Validation</h2>
                <div className="mt-6 space-y-6">
                  {/* Jackson & Pollock Studies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Jackson & Pollock Validation Studies
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Key findings from the original publications and follow-up validations:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>3-site method: ±4-5% accuracy when measured correctly</li>
                        <li>7-site method: ±3-4% accuracy when measured correctly</li>
                        <li>Accuracy generally improves with more measurement sites</li>
                      </ul>
                    </div>
                  </div>

                  {/* Durnin & Womersley Studies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Durnin & Womersley Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Age- and gender-specific equations based on four skinfold sites:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Typical accuracy range: ±3.5-5%</li>
                        <li>Results depend on caliper technique and consistency</li>
                        <li>Used widely in field assessments and research</li>
                      </ul>
                    </div>
                  </div>

                  {/* Parrillo Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">Parrillo Method</h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Nine-site skinfold method from Parrillo & Greenwood-Robinson (1993). This
                        method has not been independently validated in peer-reviewed research.
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>
                          Estimated accuracy range: ±3-4% (based on number of measurement sites, not
                          published SEE)
                        </li>
                        <li>Commonly used in bodybuilding for tracking changes over time</li>
                        <li>No peer-reviewed validation studies available</li>
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
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/[0.04]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              <div className="relative">
                <h2 className="text-2xl font-semibold text-white">Circumference Methods</h2>
                <div className="mt-6 space-y-6">
                  {/* US Navy Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">US Navy Method Validation</h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Circumference-based method used by the U.S. military:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>Typical accuracy range: ±4-6%</li>
                        <li>Most accurate for individuals near population averages</li>
                        <li>Less reliable for very lean or obese individuals</li>
                        <li>Accuracy depends on measurement technique</li>
                      </ul>
                    </div>
                  </div>

                  {/* YMCA Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">YMCA Method Studies</h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Simple circumference-based equations with two variants:
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>
                          YMCA: ±5-7% estimated accuracy — no published SEE, best for tracking
                          trends
                        </li>
                        <li>
                          Modified YMCA: ±4-6% estimated accuracy — no published SEE, extra
                          measurements for women
                        </li>
                        <li>Less accurate for athletic or non-standard body types</li>
                      </ul>
                    </div>
                  </div>

                  {/* Covert Bailey Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">Covert Bailey Method</h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Circumference-based method from Bailey&apos;s &ldquo;The Ultimate Fit or
                        Fat&rdquo; (1991/1999). No peer-reviewed validation studies have been
                        published.
                      </p>
                      <ul className="list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                        <li>
                          Estimated accuracy range: ±4-5% (author&apos;s claim, not independently
                          verified)
                        </li>
                        <li>Uses age- and gender-specific circumference measurements</li>
                        <li>Useful as a no-equipment-needed estimate for trend tracking</li>
                      </ul>
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
              <h2 className="text-2xl font-semibold text-white">Validation Considerations</h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">Population Specificity</h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Athletic vs general population accuracy differences</li>
                    <li>Age-related measurement variations</li>
                    <li>Gender-specific considerations</li>
                    <li>Ethnic variation impacts</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">Technical Factors</h3>
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
                    Jackson, A.S., & Pollock, M.L. (1978). &ldquo;Generalized equations for
                    predicting body density of men.&rdquo; British Journal of Nutrition, 40(3),
                    497-504.
                  </li>
                  <li>
                    Jackson, A.S., Pollock, M.L., & Ward, A. (1980). &ldquo;Generalized equations
                    for predicting body density of women.&rdquo; Medicine and Science in Sports and
                    Exercise, 12(3), 175-182.
                  </li>
                  <li>
                    Durnin, J.V.G.A., & Womersley, J. (1974). &ldquo;Body fat assessed from total
                    body density and its estimation from skinfold thickness.&rdquo; British Journal
                    of Nutrition, 32(1), 77-97.
                  </li>
                  <li>
                    Hodgdon, J.A., & Beckett, M.B. (1984). &ldquo;Prediction of percent body fat for
                    U.S. Navy men and women.&rdquo; Naval Health Research Center Report, No. 84-29.
                  </li>
                  <li>
                    Golding, L.A., Myers, C.R., & Sinning, W.E. (1999). &ldquo;Y&apos;s Way to
                    Physical Fitness: The Complete Guide to Fitness Testing and Instruction.&rdquo;
                    Human Kinetics.
                  </li>
                  <li>
                    YMCA of the USA. (2000). &ldquo;YMCA Fitness Testing and Assessment Manual (4th
                    ed.).&rdquo; YMCA of the USA.
                  </li>
                  <li>
                    Harty, P.S., et al. (2022). &ldquo;Military Body Composition Standards and
                    Physical Performance: Historical Perspectives and Future Directions.&rdquo; J
                    Strength Cond Res, 36(12), 3551-3561. DOI: 10.1519/JSC.0000000000004142
                  </li>
                  <li>
                    Parrillo, J., & Greenwood-Robinson, M. (1993). &ldquo;High-Performance
                    Body-Building.&rdquo; Perigee Books. ISBN: 978-0399517716
                  </li>
                  <li>
                    Bailey, C. (1999). &ldquo;The Ultimate Fit or Fat.&rdquo; Houghton Mifflin
                    Harcourt. ISBN: 978-0395959411
                  </li>
                </ul>
              </div>
            </motion.section>

            <Breadcrumbs
              items={[
                {
                  label: 'Research',
                  href: '/research',
                },
                {
                  label: 'Validation Studies',
                  href: '/research/validation-studies',
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </Layout>
  )
}
