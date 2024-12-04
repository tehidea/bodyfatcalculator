'use client'

import { useId } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { motion } from 'framer-motion'

import { AppStoreLink } from '@/components/AppStoreLink'
import { Container } from '@/components/Container'

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#333333] py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Dynamic animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-20 top-20 h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-[#ff4694]/30 to-[#776fff]/30 opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-[#FF0000]/20 to-[#FF5722]/20 opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-[#FF0000]/10 px-6 py-2 text-sm font-medium text-[#FF0000] ring-1 ring-inset ring-[#FF0000]/20"
            >
              <span className="mr-2">★★★★★</span> Brand New Body Fat Calculator
              on the App Store
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="mt-8">
                <span className="block text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Professional
                </span>
                <span className="mt-2 block text-4xl font-bold tracking-tight sm:text-6xl">
                  <span className="text-[#FF0000]">Body Fat</span> Analysis
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-300">
                Get lab-grade accuracy with 9 scientifically validated methods.
                Perfect for trainers, athletes, and fitness enthusiasts who
                demand precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10">
                <span className="mr-2 text-[#4CAF50]">✓</span> ±3-4% Accuracy
              </div>
              <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10">
                <span className="mr-2 text-[#4CAF50]">✓</span> 6 Pro Methods
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <AppStoreLink size="large" color="white" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4CAF50] text-xs font-medium text-white">
                  5.0
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC107] text-xs font-medium text-white">
                  ★
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5722] text-xs font-medium text-white">
                  β
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Early Access • First Reviews: &quot;Exactly what I needed&quot;
                - PT Alex
              </p>
            </motion.div>
          </div>

          <div className="relative mt-16 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            {/* Animated background gradients for screenshots */}
            <motion.div
              className="absolute -right-20 top-1/2 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-gradient-to-tr from-[#FF0000] to-[#FF5722] opacity-[0.15] blur-[64px]"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 45, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute -left-20 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gradient-to-br from-[#FF5722] to-[#FF0000] opacity-[0.1] blur-[96px]"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [45, 0, 45],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div className="relative mx-auto w-full max-w-[366px]">
              {/* Left screenshot */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -left-[160px] top-[300px] aspect-[366/729] w-[220px] -rotate-[15deg] transition-transform duration-300 hover:-translate-x-2 hover:translate-y-2 hover:-rotate-[17deg]"
              >
                <div className="relative h-full overflow-hidden rounded-[38px] bg-[#1a1a1a] p-3.5 shadow-2xl ring-1 ring-gray-900/10">
                  <div className="absolute left-1/2 top-[12px] h-1 w-[60px] -translate-x-1/2 rounded-full bg-gray-800" />
                  <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-black">
                    <Image
                      src="/screenshots/app-method.png"
                      alt="Body Fat Calculator method selection"
                      className="rounded-[32px] object-cover"
                      fill
                    />
                  </div>
                  <div className="absolute inset-0 rounded-[38px] ring-1 ring-white/10" />
                </div>
              </motion.div>

              {/* Right screenshot */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -right-[160px] top-[100px] aspect-[366/729] w-[220px] rotate-[30deg] transition-transform duration-300 hover:translate-x-2 hover:translate-y-2 hover:rotate-[32deg]"
              >
                <div className="relative h-full overflow-hidden rounded-[38px] bg-[#1a1a1a] p-3.5 shadow-2xl ring-1 ring-gray-900/10">
                  <div className="absolute left-1/2 top-[12px] h-1 w-[60px] -translate-x-1/2 rounded-full bg-gray-800" />
                  <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-black">
                    <Image
                      src="/screenshots/app-results.png"
                      alt="Body Fat Calculator results screen"
                      className="rounded-[32px] object-cover"
                      fill
                    />
                  </div>
                  <div className="absolute inset-0 rounded-[38px] ring-1 ring-white/10" />
                </div>
              </motion.div>

              {/* Main screenshot */}
              <motion.div
                initial={{ opacity: 1, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-20 aspect-[366/729] rounded-[38px] bg-[#1a1a1a] p-3.5 shadow-2xl ring-1 ring-gray-900/10 transition-transform duration-300 hover:scale-[1.02]"
                style={{ transform: 'scale(1.1)' }}
              >
                <div className="absolute left-1/2 top-[12px] h-1 w-[100px] -translate-x-1/2 rounded-full bg-gray-800" />
                <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-black">
                  <Image
                    src="/screenshots/app-main.png"
                    alt="Body Fat Calculator PRO app interface"
                    className="object-cover"
                    priority
                    fill
                  />
                </div>
                <div className="absolute inset-0 rounded-[38px] ring-1 ring-white/10" />
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
