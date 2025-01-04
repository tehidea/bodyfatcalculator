'use client'

import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'
import { CirclesBackground } from '@/components/CirclesBackground'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'react-feather'

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
              Explore how body composition assessment methods are applied in
              clinical practice, sports medicine, research, and public health
              settings, with evidence-based outcomes and practical implications.
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
                Healthcare Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Primary Care Settings
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Implementation of body composition assessment in routine
                      health screenings:
                    </p>
                    <ul className="list-inside list-disc space-y-2 text-gray-300">
                      <li>Risk assessment for metabolic disorders</li>
                      <li>Tracking intervention outcomes</li>
                      <li>Preventive health screening</li>
                      <li>Patient education and motivation</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Clinical Outcomes Research
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Studies demonstrating improved health outcomes with body
                      composition monitoring:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>30% better intervention adherence</li>
                        <li>Improved risk stratification accuracy</li>
                        <li>Enhanced treatment customization</li>
                        <li>Better long-term health outcomes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Sports Medicine */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Sports Medicine Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Athletic Performance
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Impact of body composition monitoring on athletic
                      performance:
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Training Optimization
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Periodization adjustments</li>
                          <li>Recovery monitoring</li>
                          <li>Performance prediction</li>
                          <li>Injury prevention</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-black/20 p-4">
                        <h4 className="font-medium text-white">
                          Competition Preparation
                        </h4>
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                          <li>Weight class optimization</li>
                          <li>Peak performance timing</li>
                          <li>Nutrition planning</li>
                          <li>Recovery strategies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Research Applications */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Research Applications
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Clinical Trials
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Implementation in pharmaceutical and intervention
                      research:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Drug efficacy assessment</li>
                        <li>Treatment response monitoring</li>
                        <li>Side effect profiling</li>
                        <li>Long-term outcome tracking</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Population Studies
                  </h3>
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-300">
                      Large-scale epidemiological research applications:
                    </p>
                    <div className="rounded-lg bg-black/20 p-4">
                      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
                        <li>Health trend analysis</li>
                        <li>Risk factor identification</li>
                        <li>Intervention effectiveness</li>
                        <li>Public health planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Public Health Impact */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">
                Public Health Impact
              </h2>
              <div className="mt-6 space-y-6">
                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Population Health Management
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Community health assessment</li>
                    <li>Health disparity identification</li>
                    <li>Intervention program design</li>
                    <li>Resource allocation optimization</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-black/20 p-4">
                  <h3 className="text-lg font-semibold text-white">
                    Economic Impact
                  </h3>
                  <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300">
                    <li>Healthcare cost reduction</li>
                    <li>Preventive care savings</li>
                    <li>Workplace wellness ROI</li>
                    <li>Public health program efficiency</li>
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
                    American College of Sports Medicine. (2021).
                    &ldquo;Guidelines for Exercise Testing and
                    Prescription.&rdquo; 11th Edition.
                  </li>
                  <li>
                    World Health Organization. (2020). &ldquo;Body Composition
                    Assessment in Population Health.&rdquo; Technical Report
                    Series.
                  </li>
                  <li>
                    National Institutes of Health. (2019). &ldquo;Clinical
                    Applications of Body Composition Methods.&rdquo; NIH
                    Publication.
                  </li>
                  <li>
                    International Olympic Committee. (2021). &ldquo;Body
                    Composition in Elite Athletes: Assessment and Competitive
                    Considerations.&rdquo; IOC Consensus Statement.
                  </li>
                  <li>
                    Centers for Disease Control and Prevention. (2022).
                    &ldquo;Public Health Applications of Body Composition
                    Assessment.&rdquo; CDC Health Report.
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
