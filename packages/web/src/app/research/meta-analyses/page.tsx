'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

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
              Systematic reviews and comprehensive analyses of body composition assessment methods,
              from foundational field-vs-laboratory comparisons to military standards.
            </p>
            <p className="mt-2 text-sm text-gray-500">Content last reviewed: February 11, 2026</p>
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
              <h2 className="text-2xl font-semibold text-white">Recent Systematic Reviews</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Military Body Composition Standards
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Review by Harty et al. (2022) on military body composition standards and
                      physical performance (DOI: 10.1519/JSC.0000000000004142), with supporting
                      validation by Friedl & Vogel (1997) on circumference-based prediction (PMID:
                      9121667):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Historical evolution of military body composition standards</li>
                      <li>Validity of circumference-based percent body fat prediction</li>
                      <li>Relationship between body composition and physical performance</li>
                      <li>Implications for field-method selection in operational settings</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Topics covered:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Military standards evolution and current practices</li>
                        <li>Circumference method validity in military populations</li>
                        <li>Performance implications of body composition standards</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Body Composition Measurement Methods
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Comprehensive review by Fosbøl & Zerahn (2015) on contemporary methods of body
                      composition measurement (DOI: 10.1111/cpf.12152, PMID: 24735332):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Review of field and laboratory body composition methods</li>
                      <li>Comparison of technique accuracy, cost, and practicality</li>
                      <li>Analysis of measurement limitations and error sources</li>
                      <li>Practical guidance for clinical and field settings</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Topics covered:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Field vs laboratory measurement techniques</li>
                        <li>Sources of measurement error and mitigation</li>
                        <li>Practical considerations for method selection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Historical Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">Foundational Reviews</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Laboratory and Field Methods</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Systematic review by Wagner & Heyward (1999) on body composition assessment
                      techniques:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Comprehensive method comparison</li>
                      <li>Analysis of measurement errors</li>
                      <li>Practical applications in field settings</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Topics covered:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Method comparisons across settings</li>
                        <li>Standardization and reliability considerations</li>
                        <li>Error sources and mitigation strategies</li>
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
              <h2 className="text-2xl font-semibold text-white">Research Implications</h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">Common Themes</h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Field methods compared against laboratory standards</li>
                    <li>Population-specific equations and accuracy trade-offs</li>
                    <li>Standardized protocols and reliability considerations</li>
                    <li>Operational standards for field use</li>
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
                    Harty, P.S., et al. (2022). &ldquo;Military Body Composition Standards and
                    Physical Performance: Historical Perspectives and Future Directions.&rdquo; J
                    Strength Cond Res, 36(12), 3551-3561. DOI: 10.1519/JSC.0000000000004142
                  </li>
                  <li>
                    Friedl, K.E., & Vogel, J.A. (1997). &ldquo;Validity of percent body fat
                    predicted from circumferences.&rdquo; Military Medicine, 162(3), 194-200. PMID:
                    9121667
                  </li>
                  <li>
                    Fosbøl, M.Ø., & Zerahn, B. (2015). &ldquo;Contemporary methods of body
                    composition measurement.&rdquo; Clinical Physiology and Functional Imaging,
                    35(2), 81-97. DOI: 10.1111/cpf.12152
                  </li>
                  <li>
                    Wagner, D.R., & Heyward, V.H. (1999). &ldquo;Techniques of body composition
                    assessment: a review of laboratory and field methods.&rdquo; Research Quarterly
                    for Exercise and Sport, 70(2), 135-149. DOI: 10.1080/02701367.1999.10608031
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
                  label: 'Meta-Analyses',
                  href: '/research/meta-analyses',
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </Layout>
  )
}
