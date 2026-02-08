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
            {/* Selection Guide Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/selection-guide" className="block">
                <div className="group relative overflow-hidden rounded-2xl bg-white/[0.02] transition-colors hover:bg-white/[0.04]">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                  <div className="relative p-6">
                    <h2 className="text-2xl font-semibold text-white">
                      Method Selection Guide
                    </h2>
                    <p className="mt-2 text-gray-400">
                      Find the most suitable method based on your needs,
                      available equipment, and accuracy requirements.
                    </p>
                    <div className="mt-4 text-sm font-medium text-white">
                      View Guide →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* All Methods Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/10"
            >
              <h2 className="text-2xl font-semibold text-white">All Methods</h2>
              <p className="mt-4 text-gray-300">
                Comprehensive list of all available body fat measurement
                methods.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {/* Parrillo Method */}
                <Link href="/methods/parrillo" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Parrillo Method
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <span className="text-[#4CAF50]">±3-4%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      9-site skinfold method used in bodybuilding contexts
                    </p>
                  </div>
                </Link>

                {/* Jackson & Pollock 7-Site */}
                <Link href="/methods/jackson-pollock-7" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Jackson & Pollock 7-Site
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <span className="text-[#4CAF50]">±3-4%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Comprehensive 7-site skinfold protocol
                    </p>
                  </div>
                </Link>

                {/* Jackson & Pollock 4-Site */}
                <Link href="/methods/jackson-pollock-4" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Jackson & Pollock 4-Site
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <span className="text-[#4CAF50]">±3.5-4.5%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Balanced approach between accuracy and efficiency
                    </p>
                  </div>
                </Link>

                {/* Durnin & Womersley */}
                <Link href="/methods/durnin-womersley" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Durnin & Womersley
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <span className="text-[#4CAF50]">±3.5-5%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Age-specific equations
                    </p>
                  </div>
                </Link>

                {/* Jackson & Pollock 3-Site */}
                <Link href="/methods/jackson-pollock-3" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Jackson & Pollock 3-Site
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100/10 px-2 py-1 text-xs font-medium text-gray-400">
                          <Lock size={10} /> PRO
                        </span>
                      </div>
                      <span className="text-[#FFC107]">±4-5%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Quick skinfold method for regular tracking
                    </p>
                  </div>
                </Link>

                {/* Covert Bailey */}
                <Link href="/methods/covert-bailey" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Covert Bailey
                        </h3>
                      </div>
                      <span className="text-[#FFC107]">±4-5%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Multiple circumference measurements for balanced results
                    </p>
                  </div>
                </Link>

                {/* US Navy Method */}
                <Link href="/methods/us-navy" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          US Navy Method
                        </h3>
                      </div>
                      <span className="text-[#FFC107]">±4-6%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Simple circumference-based method, no calipers needed
                    </p>
                  </div>
                </Link>

                {/* Modified YMCA */}
                <Link href="/methods/ymca-modified" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">
                          Modified YMCA
                        </h3>
                      </div>
                      <span className="text-[#FF5722]">±4-6%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Adds extra measurements compared to the YMCA method
                    </p>
                  </div>
                </Link>

                {/* YMCA Method */}
                <Link href="/methods/ymca" className="block">
                  <div className="h-full rounded-lg bg-black/20 p-6 transition-colors duration-200 hover:bg-black/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">YMCA Method</h3>
                      </div>
                      <span className="text-[#FF5722]">±5-7%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Simple basic screening method
                    </p>
                  </div>
                </Link>
              </div>
            </motion.section>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
