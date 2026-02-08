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
              Analysis of systematic reviews and meta-analyses in body composition assessment, from
              foundational research to recent military standards.
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
              <h2 className="text-2xl font-semibold text-white">Recent Systematic Reviews</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Military Standards Review</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Systematic review by Friedl et al. (2020) on body composition standards in the
                      U.S. Military (DOI: 10.1093/milmed/usaa029):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Review of military body composition standards</li>
                      <li>Analysis of field method accuracy in military settings</li>
                      <li>Evaluation of operational requirements</li>
                      <li>Assessment of service-specific standards</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Topics covered:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Military body composition standards</li>
                        <li>Field method use in operational settings</li>
                        <li>Standardization and service-specific requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">Clinical Assessment Methods</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Meta-analysis by Silva et al. (2013) on body composition assessment methods
                      (DOI: 10.1038/ejcn.2013.124):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Systematic review of assessment methods</li>
                      <li>Comparison of field vs laboratory techniques</li>
                      <li>Analysis of measurement error sources</li>
                      <li>Clinical application guidelines</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Topics covered:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Field vs laboratory techniques</li>
                        <li>Sources of measurement error</li>
                        <li>Clinical application considerations</li>
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

                <div>
                  <h3 className="text-lg font-semibold text-white">Pediatric Applications</h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Systematic review by Wells (2014) on body composition reference data (DOI:
                      10.3945/an.113.005371):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Analysis of pediatric assessment methods</li>
                      <li>Reference data compilation</li>
                      <li>Age-specific considerations</li>
                    </ul>
                    <div className="rounded-lg bg-black/20 p-4">
                      <h4 className="font-medium text-white">Topics covered:</h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Age-specific reference data and considerations</li>
                        <li>Method selection criteria</li>
                        <li>Growth and development considerations</li>
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
                    Silva, A.M., et al. (2013). &ldquo;Body composition assessment methods: a
                    systematic review and meta-analysis.&rdquo; European Journal of Clinical
                    Nutrition, 67(11), 1097-1105. DOI: 10.1038/ejcn.2013.124
                  </li>
                  <li>
                    Wells, J.C.K. (2014). &ldquo;Toward body composition reference data for infants,
                    children, and adolescents.&rdquo; Advances in Nutrition, 5(3), 320S-329S. DOI:
                    10.3945/an.113.005371
                  </li>
                  <li>
                    Wagner, D.R., & Heyward, V.H. (1999). &ldquo;Techniques of body composition
                    assessment: a review of laboratory and field methods.&rdquo; Research Quarterly
                    for Exercise and Sport, 70(2), 135-149.
                  </li>
                  <li>
                    Friedl, K.E., et al. (2020). &ldquo;Body Composition Standards and Assessment in
                    the U.S. Military.&rdquo; Military Medicine, 185(9), e1472-e1479. DOI:
                    10.1093/milmed/usaa029
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
