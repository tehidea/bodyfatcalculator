'use client'
import { motion } from 'framer-motion'

import { AppStoreLink } from '@/components/AppStoreLink'
import { GooglePlayLink } from '@/components/GooglePlayLink'
import { Container } from '@/components/Container'
import { AppScreenshot } from '@/components/AppScreenshot'

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
              className="inline-flex flex-wrap items-center rounded-full bg-[#FF0000]/10 px-4 py-2 text-sm font-medium text-[#FF0000] ring-1 ring-inset ring-[#FF0000]/20 sm:px-6"
            >
              <span className="mr-2 whitespace-nowrap">★★★★★</span>
              <span className="whitespace-nowrap">
                Available on App Store & Google Play!
              </span>
            </motion.div>

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
              Perfect for trainers, athletes, and fitness enthusiasts who demand
              precision.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10">
                <span className="mr-2 text-[#4CAF50]">✓</span> ±3-4% Accuracy
              </div>
              <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/10">
                <span className="mr-2 text-[#4CAF50]">✓</span> 6 Professional
                Methods
              </div>
            </motion.div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <AppStoreLink size="large" color="white" />
              <GooglePlayLink size="large" color="white" />
            </div>

            <div className="mt-10 flex animate-fade-in items-center gap-4">
              <div className="flex -space-x-2">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#4CAF50] text-xs font-medium text-white">
                  5.0
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC107] text-xs font-medium text-white">
                  ★
                </div>
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#FF5722] text-[10px] font-bold text-white">
                  PRO
                </div>
              </div>
              <p className="text-sm text-gray-400">
                &quot;Exactly what I needed!&quot; - Michał
              </p>
            </div>
          </div>

          <div className="relative mt-16 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            {/* Starburst badge in top right */}
            <motion.div
              className="absolute -right-6 -top-12 z-50"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: 'easeOut',
              }}
            >
              <div className="relative h-52 w-52">
                {/* Starburst background */}
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 h-full w-full"
                  fill="rgb(253 224 71)"
                >
                  <path d="m19.064 10.109l1.179-2.387a.5.5 0 0 0-.416-.72l-2.656-.172l-.172-2.656a.5.5 0 0 0-.721-.416l-2.385 1.18l-1.477-2.215c-.186-.278-.646-.278-.832 0l-1.477 2.215l-2.385-1.18a.5.5 0 0 0-.721.416L6.83 6.83l-2.657.171a.5.5 0 0 0-.416.721l1.179 2.386l-2.214 1.477a.501.501 0 0 0 0 .832l2.215 1.477l-1.18 2.386a.498.498 0 0 0 .416.72l2.656.171L7 19.828a.5.5 0 0 0 .721.416l2.386-1.179l1.477 2.214a.501.501 0 0 0 .832 0l1.477-2.214l2.386 1.179a.5.5 0 0 0 .721-.416l.171-2.656L19.827 17a.5.5 0 0 0 .416-.721l-1.179-2.385l2.214-1.478a.501.501 0 0 0 0-.832z" />
                </svg>

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center text-yellow-900">
                    <p className="text-xs font-bold leading-tight">
                      <span className="mb-1/2 block text-[10px]">
                        Start for FREE
                      </span>
                      <span className="text-md -mb-2 block text-sm font-extrabold">
                        ONE TIME
                      </span>
                      <span className="text-md -mb-2 block text-sm font-extrabold">
                        PURCHASE
                      </span>
                      <span className="text-md mb-1/2 block text-sm font-extrabold">
                        FOR PRO
                      </span>
                      <span className="mb-0 block text-[10px]">
                        FOREVER Yours
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

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
              <AppScreenshot
                src="/screenshots/app-main.png"
                alt="Body Fat Calculator (PRO) app interface"
                position="center"
              />

              <AppScreenshot
                src="/screenshots/app-method.png"
                alt="Body Fat Calculator method selection"
                position="left"
              />

              <AppScreenshot
                src="/screenshots/app-results.png"
                alt="Body Fat Calculator results screen"
                position="right"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
