'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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
              Comprehensive analysis of validation studies comparing field
              methods against laboratory standards, based on research by Jackson
              & Pollock (1978), Durnin & Womersley (1974), and recent systematic
              reviews (Wagner & Heyward, 1999).
            </p>
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
                <h2 className="text-2xl font-semibold text-white">
                  Statistical Validation Data
                </h2>
                <div className="mt-8">
                  <p className="mb-6 text-gray-400">
                    Validation metrics from peer-reviewed research comparing
                    field methods against hydrostatic weighing:
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
                            SEE
                          </th>
                          <th className="border-b border-white/10 px-6 py-3 text-left text-sm font-semibold text-white">
                            Source
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            7-Site Jackson-Pollock
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3.5-4.0%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3.4%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Jackson & Pollock (1978)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin-Womersley
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3.5-5.0%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3.8%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Durnin & Womersley (1974)
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            US Navy
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            ±3-6%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            3.9%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Hodgdon & Beckett (1984)
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-400">
                    SEE = Standard Error of Estimate, validated against
                    hydrostatic weighing
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
                <h2 className="text-2xl font-semibold text-white">
                  Sources of Measurement Error
                </h2>
                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Technical Errors
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>
                        Site location and landmarking (Perini et al., 2005)
                      </li>
                      <li>
                        Caliper pressure standardization (Ulijaszek & Kerr,
                        1999)
                      </li>
                      <li>Equipment calibration (Gore et al., 1996)</li>
                      <li>Inter-observer variation (Norton & Olds, 1996)</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Impact:</strong> Technical error of measurement
                        (TEM) ranges from 3-7% for novice practitioners to 1-2%
                        for experienced anthropometrists (Perini et al., 2005).
                      </p>
                    </div>
                  </article>
                  <article>
                    <h3 className="text-lg font-semibold text-white">
                      Biological Factors
                    </h3>
                    <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-[#FF0000]">
                      <li>Hydration status (Heyward & Wagner, 2004)</li>
                      <li>Diurnal variation (Norton & Olds, 1996)</li>
                      <li>Exercise effects (Lohman et al., 2000)</li>
                      <li>Age and gender differences (Jackson et al., 2002)</li>
                    </ul>
                    <div className="mt-4 rounded-lg bg-black/20 p-4">
                      <p className="text-sm text-gray-300">
                        <strong>Impact:</strong> Biological factors can affect
                        measurements by 2-3% based on time of day and
                        physiological state (Heyward & Wagner, 2004).
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
                      Modern reference method for body composition assessment
                      (Prior et al., 1997):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Accuracy: ±1-2% body fat (Lohman et al., 2000)</li>
                      <li>Precision: CV = 1-2% (Prior et al., 1997)</li>
                      <li>Scan time: 5-20 minutes</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Hydrostatic Weighing
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Traditional reference method (Siri, 1961; Brozek et al.,
                      1963):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Accuracy: ±2.5% body fat (Siri, 1961)</li>
                      <li>Precision: CV = 1.5-2% (Brozek et al., 1963)</li>
                      <li>Test duration: 20-30 minutes</li>
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
                <h2 className="text-2xl font-semibold text-white">
                  Skinfold Methods Validation
                </h2>
                <div className="mt-6 space-y-6">
                  {/* Jackson & Pollock Studies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Jackson & Pollock Validation Studies
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Comprehensive validation across multiple studies
                        (1978-2020):
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            7-Site Protocol
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Original validation (n=1,500+)</li>
                            <li>Correlation with HW: r = 0.94</li>
                            <li>SEE: ±3.0% body fat</li>
                            <li>Test-retest reliability: r = 0.98</li>
                            <li>DEXA cross-validation (2010-2020)</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            3-Site Protocol
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Validation sample (n=900+)</li>
                            <li>Correlation with HW: r = 0.91</li>
                            <li>SEE: ±3.9% body fat</li>
                            <li>Test-retest reliability: r = 0.96</li>
                            <li>Population-specific validations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Durnin & Womersley Studies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Durnin & Womersley Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Age-specific validation studies (1974-2020):
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Original Research
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Sample size: 481 subjects</li>
                            <li>Age range: 16-72 years</li>
                            <li>Correlation with HW: r = 0.90</li>
                            <li>SEE: ±3.5-5% body fat</li>
                            <li>Gender-specific equations</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Modern Validation
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>DEXA comparisons (n=2,000+)</li>
                            <li>Ethnic group validations</li>
                            <li>Athletic population studies</li>
                            <li>Age-specific accuracy verified</li>
                            <li>Multiple population studies</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Parrillo Method Studies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Parrillo Method Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Specialized validation for athletic populations:
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Athletic Population
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Correlation with DEXA: r = 0.94</li>
                            <li>SEE: ±1.5-2% body fat</li>
                            <li>Test-retest reliability: r = 0.98</li>
                            <li>Sample: 500+ athletes</li>
                            <li>Bodybuilder-specific validation</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            General Population
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Correlation with HW: r = 0.86</li>
                            <li>SEE: ±3-4% body fat</li>
                            <li>Test-retest reliability: r = 0.95</li>
                            <li>Sample: 300+ individuals</li>
                            <li>Cross-validated with DEXA</li>
                          </ul>
                        </div>
                      </div>
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
                <h2 className="text-2xl font-semibold text-white">
                  Circumference Methods
                </h2>
                <div className="mt-6 space-y-6">
                  {/* US Navy Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      US Navy Method Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Extensive validation in military and civilian
                        populations:
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Military Studies
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Sample size: 1,585 personnel</li>
                            <li>Correlation (men): r = 0.90</li>
                            <li>Correlation (women): r = 0.85</li>
                            <li>SEE: ±3.0% men, ±3.5% women</li>
                            <li>High test-retest reliability</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Civilian Studies
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Sample size: 2,300+ subjects</li>
                            <li>Cross-validated with DEXA</li>
                            <li>Multi-ethnic validation</li>
                            <li>Age range: 17-62 years</li>
                            <li>Updated equations (2020)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* YMCA Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      YMCA Method Studies
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Evolution and validation of original and modified
                        protocols:
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Original Method
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Sample size: 1,200+ subjects</li>
                            <li>Correlation with HW: r = 0.82</li>
                            <li>SEE: ±5-7% body fat</li>
                            <li>Test-retest: r = 0.92</li>
                            <li>General population focus</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Modified Method
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Sample size: 1,500+ subjects</li>
                            <li>Correlation with HW: r = 0.88</li>
                            <li>SEE: ±4-6% body fat</li>
                            <li>Test-retest: r = 0.95</li>
                            <li>Enhanced female accuracy</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Covert Bailey Method */}
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Covert Bailey Validation
                    </h3>
                    <div className="mt-4 space-y-4">
                      <p className="text-gray-300">
                        Validation studies for simplified circumference method:
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Initial Studies
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>Sample size: 800+ subjects</li>
                            <li>Correlation with HW: r = 0.85</li>
                            <li>SEE: ±4-5% body fat</li>
                            <li>Test-retest: r = 0.93</li>
                            <li>Practical field application</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-black/20 p-4">
                          <h4 className="font-medium text-white">
                            Modern Validation
                          </h4>
                          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                            <li>DEXA comparisons</li>
                            <li>Gender-specific studies</li>
                            <li>Age-group analysis</li>
                            <li>Population-based studies</li>
                            <li>Simplified protocol validation</li>
                          </ul>
                        </div>
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
