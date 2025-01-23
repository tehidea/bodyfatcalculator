'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export default function ClinicalApplications() {
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
              Clinical Applications
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Evidence-based applications of body composition assessment in
              clinical practice, based on research by Ellis (2000), Heymsfield
              et al. (2005), and recent systematic reviews.
            </p>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            {/* Healthcare Settings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Clinical Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Primary Care Assessment
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Clinical applications of body composition assessment
                      (Ellis, 2000):
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Nutritional status evaluation</li>
                      <li>Growth and development monitoring</li>
                      <li>Disease state assessment</li>
                      <li>Treatment response tracking</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Clinical Validation
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Validation studies in clinical settings (Heymsfield et
                      al., 2005):
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Multi-component model validation</li>
                        <li>Field method accuracy assessment</li>
                        <li>Population-specific equations</li>
                        <li>Method standardization protocols</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Research Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Research Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Clinical Research
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Applications in clinical trials and research (Wang et al.,
                      1992):
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">Study Design</h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Method selection criteria</li>
                          <li>Protocol standardization</li>
                          <li>Quality control measures</li>
                          <li>Data validation procedures</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Outcome Assessment
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Treatment effect monitoring</li>
                          <li>Longitudinal tracking</li>
                          <li>Intervention evaluation</li>
                          <li>Clinical endpoint assessment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Population Studies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Population Studies
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Epidemiological Research
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Applications in population health research (Gallagher et
                      al., 2000):
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Reference data development</li>
                        <li>Population norms establishment</li>
                        <li>Health risk assessment</li>
                        <li>Demographic analysis</li>
                      </ul>
                    </div>
                  </div>
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
                    Ellis, K.J. (2000). &ldquo;Human body composition: in vivo
                    methods.&rdquo; Physiological Reviews, 80(2), 649-680.
                  </li>
                  <li>
                    Heymsfield, S.B., et al. (2005). &ldquo;Human Body
                    Composition.&rdquo; Human Kinetics.
                  </li>
                  <li>
                    Wang, Z.M., et al. (1992). &ldquo;The five-level model: a
                    new approach to organizing body-composition research.&rdquo;
                    American Journal of Clinical Nutrition, 56(1), 19-28.
                  </li>
                  <li>
                    Gallagher, D., et al. (2000). &ldquo;Healthy percentage body
                    fat ranges: an approach for developing guidelines based on
                    body mass index.&rdquo; American Journal of Clinical
                    Nutrition, 72(3), 694-701.
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
                  label: 'Clinical Applications',
                  href: '/research/clinical-applications',
                },
              ]}
            />
          </div>
        </div>
      </Container>
    </Layout>
  )
}
