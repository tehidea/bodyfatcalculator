'use client'

import { FORMULA_DEFINITIONS } from '@bodyfat/shared/definitions'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import {
  AnimatePresence,
  type MotionProps,
  motion,
  type Variant,
  type Variants,
} from 'framer-motion'
import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Lock } from 'react-feather'
import { useDebouncedCallback } from 'use-debounce'
import { AppScreen } from '@/components/AppScreen'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'
import { BodyWeightScalesIcon } from '@/images/icons/BodyWeightScalesIcon'
import { CalendarIcon } from '@/images/icons/CalendarIcon'
import { MeasurementVerticalIcon } from '@/images/icons/MeasurementVerticalIcon'
import { MeasuringTapeIcon } from '@/images/icons/MeasuringTapeIcon'
import { SkinfoldIcon } from '@/images/icons/SkinfoldIcon'

// Helper function to check if formula needs specific measurements
function getRequiredMeasurements(formula: keyof typeof FORMULA_DEFINITIONS) {
  const fields = FORMULA_DEFINITIONS[formula].fields
  return {
    needsWeight: fields.some((f) => f.key === 'weight'),
    needsHeight: fields.some((f) => f.key === 'height'),
    needsCircumference: fields.some((f) => f.key.includes('Circumference')),
    needsSkinfold: fields.some((f) => f.key.includes('Skinfold')),
    needsAge: fields.some((f) => f.key === 'age'),
  }
}

const MotionAppScreenHeader = motion(AppScreen.Header)
const MotionAppScreenBody = motion(AppScreen.Body)

interface CustomAnimationProps {
  isForwards: boolean
  changeCount: number
}

const features = [
  {
    name: 'Guided Measurements',
    description: 'Enter weight, waist, or skinfolds with clear inputs and units.',
    icon: DeviceUserIcon,
    screen: InviteScreen,
  },
  {
    name: 'Method Selection',
    description: 'Choose between YMCA, U.S. Navy, Jackson & Pollock, Durnin, and more.',
    icon: DeviceNotificationIcon,
    screen: StocksScreen,
  },
  {
    name: 'Results Breakdown',
    description: 'See body fat percentage with fat and lean mass. PRO unlocks decimal precision.',
    icon: DeviceTouchIcon,
    screen: InvestScreen,
  },
]

function DeviceUserIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 23a3 3 0 100-6 3 3 0 000 6zm-1 2a4 4 0 00-4 4v1a2 2 0 002 2h6a2 2 0 002-2v-1a4 4 0 00-4-4h-2z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v24a4.002 4.002 0 01-3.01 3.877c-.535.136-.99-.325-.99-.877s.474-.98.959-1.244A2 2 0 0025 28V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 001.041 1.756C8.525 30.02 9 30.448 9 31s-.455 1.013-.99.877A4.002 4.002 0 015 28V4z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

function DeviceNotificationIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#A3A3A3"
      />
      <path d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z" fill="#737373" />
    </svg>
  )
}

function DeviceTouchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  const id = useId()

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          x1={14}
          y1={14.5}
          x2={7}
          y2={17}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#737373" />
          <stop offset={1} stopColor="#D4D4D4" stopOpacity={0} />
        </linearGradient>
      </defs>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v13h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h4v2H9a4 4 0 01-4-4V4z"
        fill="#A3A3A3"
      />
      <path
        d="M7 22c0-4.694 3.5-8 8-8"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20l.217-5.513a1.431 1.431 0 00-2.85-.226L17.5 21.5l-1.51-1.51a2.107 2.107 0 00-2.98 0 .024.024 0 00-.005.024l3.083 9.25A4 4 0 0019.883 32H25a4 4 0 004-4v-5a3 3 0 00-3-3h-5z"
        fill="#A3A3A3"
      />
    </svg>
  )
}

const headerAnimation: Variants = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const maxZIndex = 2147483647

const bodyVariantBackwards: Variant = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: 'blur(4px)',
  transition: { duration: 0.4 },
}

const bodyVariantForwards: Variant = (custom: CustomAnimationProps) => ({
  y: '100%',
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
})

const bodyAnimation: MotionProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
  variants: {
    initial: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards ? bodyVariantForwards(custom, ...props) : bodyVariantBackwards,
    animate: (custom: CustomAnimationProps) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards ? bodyVariantBackwards : bodyVariantForwards(custom, ...props),
  },
}

type ScreenProps =
  | {
      animated: true
      custom: CustomAnimationProps
    }
  | { animated?: false }

function InviteScreen(props: ScreenProps) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Measurements</AppScreen.Title>
        <AppScreen.Subtitle>Enter your measurements to calculate body fat.</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}>
        <div className="px-4 py-6">
          <div className="space-y-6">
            {[
              { label: 'Weight', value: '72 kg' },
              { label: 'Waist circumference', value: '84 cm' },
            ].map((field) => (
              <div key={field.label}>
                <div className="text-sm text-gray-500">{field.label}</div>
                <div className="mt-2 border-b border-gray-200 pb-2 text-sm text-gray-900">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white">
            Calculate
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function StocksScreen(props: ScreenProps) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Methods</AppScreen.Title>
        <AppScreen.Subtitle>Select a protocol</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}>
        <div className="divide-y divide-gray-100">
          {[
            {
              name: 'YMCA',
              change: '±5-7%',
              color: '#F9322C',
            },
            {
              name: 'Modified YMCA',
              change: '±4-6%',
              color: '#5A67D8',
            },
            {
              name: 'U.S. Navy',
              change: '±4-6%',
              color: '#2563EB',
            },
            {
              name: 'Jackson & Pollock 3-Site',
              change: '±4-5%',
              color: '#16A34A',
            },
          ].map((stock) => (
            <div key={stock.name} className="flex items-center gap-4 px-4 py-3">
              <div className="flex-none rounded-full" style={{ backgroundColor: stock.color }}>
                <BodyWeightScalesIcon size="20" className="text-gray-600" />
              </div>
              <div className="flex-auto text-sm text-gray-900">{stock.name}</div>
              <div className="flex-none text-right">
                <div className="text-sm font-medium text-gray-900">{stock.change}</div>
                <div
                  className={clsx(
                    'text-xs leading-5',
                    stock.change.startsWith('+') ? 'text-cyan-500' : 'text-gray-500',
                  )}
                >
                  {stock.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function InvestScreen(props: ScreenProps) {
  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Results</AppScreen.Title>
        <AppScreen.Subtitle>
          <span className="text-white">Body fat</span> overview
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}>
        <div className="px-4 py-6">
          <div className="space-y-4">
            {[
              {
                label: 'Body fat',
                value: '18.5%',
              },
              { label: 'Fat mass', value: '13.2 kg' },
              { label: 'Lean mass', value: '58.8 kg' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between border-b border-gray-100 pb-4">
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-sm font-semibold text-gray-900">{item.value}</div>
              </div>
            ))}
            <div className="rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white">
              View details
            </div>
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious<T>(value: T) {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function _FeaturesDesktop() {
  const [changeCount, setChangeCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const prevIndex = usePrevious(selectedIndex)
  const isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  const onChange = useDebouncedCallback(
    (selectedIndex) => {
      setSelectedIndex(selectedIndex)
      setChangeCount((changeCount) => changeCount + 1)
    },
    100,
    { leading: true },
  )

  return (
    <TabGroup
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <TabList className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => (
          <div
            key={feature.name}
            className="relative rounded-2xl transition-colors hover:bg-gray-800/30"
          >
            {featureIndex === selectedIndex && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gray-800"
                initial={{ borderRadius: 16 }}
              />
            )}
            <div className="relative z-10 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 text-lg font-semibold text-white">
                <Tab className="text-left ui-not-focus-visible:outline-none">
                  <span className="absolute inset-0 rounded-2xl" />
                  {feature.name}
                </Tab>
              </h3>
              <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </TabList>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]" priority={true}>
          <TabPanels as={Fragment}>
            <AnimatePresence initial={false} custom={{ isForwards, changeCount }}>
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <TabPanel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                  >
                    <feature.screen animated custom={{ isForwards, changeCount }} />
                  </TabPanel>
                ) : null,
              )}
            </AnimatePresence>
          </TabPanels>
        </PhoneFrame>
      </div>
    </TabGroup>
  )
}

function _FeaturesMobile() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideContainerRef = useRef<React.ElementRef<'div'>>(null)
  const slideRefs = useRef<Array<React.ElementRef<'div'>>>([])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      {
        root: slideContainerRef.current,
        threshold: 0.6,
      },
    )

    for (const slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => {
              if (ref) {
                slideRefs.current[featureIndex] = ref
              }
            }}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]" priority={true}>
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">{feature.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, featureIndex) => (
          <button
            type="button"
            key={featureIndex}
            className={clsx(
              'relative h-0.5 w-4 rounded-full',
              featureIndex === activeIndex ? 'bg-gray-300' : 'bg-gray-500',
            )}
            aria-label={`Go to slide ${featureIndex + 1}`}
            onClick={() => {
              slideRefs.current[featureIndex].scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
              })
            }}
          >
            <span className="absolute -inset-x-1.5 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Professional body fat measurement features"
      className="bg-[#000000] py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#FF0000]/10 px-4 py-1 text-sm font-medium text-[#FF0000]">
              9 Professional Methods
            </div>
            <div className="h-px flex-auto bg-[#FF0000]/10"></div>
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose Your Perfect Method
          </h2>
          <p className="mt-6 text-xl text-gray-400">
            From quick estimates to gold-standard measurements, we offer the most comprehensive
            selection of scientifically validated formulas. Each method is{' '}
            <span className="text-white">optimized for different needs</span> and equipment
            availability.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center rounded-lg bg-white/10 px-4 py-2">
              <span className="font-medium text-[#4CAF50]">±3-5%</span>
              <span className="ml-2 text-sm text-gray-300">PRO Accuracy</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-4 py-2">
              <span className="font-medium text-[#FFC107]">6</span>
              <span className="ml-2 text-sm text-gray-300">PRO Methods</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-4 py-2">
              <span className="font-medium text-[#FF5722]">3</span>
              <span className="ml-2 text-sm text-gray-300">Free Methods</span>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Parrillo */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Parrillo</h3>
                <span className="text-sm text-[#4CAF50]">±3-4%</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                  <Lock size={12} />
                  PRO
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Bodybuilding-focused method using nine skinfold sites
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('parrillo')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsSkinfold && (
                      <SkinfoldIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Jackson & Pollock 7-Site */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Jackson & Pollock 7-Site</h3>
                <span className="text-sm text-[#4CAF50]">±3-4%</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                  <Lock size={12} />
                  PRO
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Most thorough method with seven skinfold measurements
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('jack7')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsAge && <CalendarIcon size="20" className="text-gray-600" />}
                    {measurements.needsSkinfold && (
                      <SkinfoldIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Jackson & Pollock 4-Site */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Jackson & Pollock 4-Site</h3>
                <span className="text-sm text-[#4CAF50]">±3.5-4.5%</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                  <Lock size={12} />
                  PRO
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Uses age and four strategic skinfold measurements
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('jack4')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsAge && <CalendarIcon size="20" className="text-gray-600" />}
                    {measurements.needsSkinfold && (
                      <SkinfoldIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Durnin & Womersley */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Durnin & Womersley</h3>
                <span className="text-sm text-[#4CAF50]">±3.5-5%</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                  <Lock size={12} />
                  PRO
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Scientific method using four skinfold measurements
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('durnin')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsAge && <CalendarIcon size="20" className="text-gray-600" />}
                    {measurements.needsSkinfold && (
                      <SkinfoldIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Jackson & Pollock 3-Site */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Jackson & Pollock 3-Site</h3>
                <span className="text-sm text-[#FFC107]">±4-5%</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                  <Lock size={12} />
                  PRO
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Quick but accurate method using three skinfold sites
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('jack3')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsAge && <CalendarIcon size="20" className="text-gray-600" />}
                    {measurements.needsSkinfold && (
                      <SkinfoldIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Covert Bailey */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Covert Bailey</h3>
                <span className="text-sm text-[#FFC107]">±4-5%</span>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100/10 px-2.5 py-1 text-xs font-medium text-gray-400">
                  <Lock size={12} />
                  PRO
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Comprehensive method using multiple body measurements
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('covert')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsAge && <CalendarIcon size="20" className="text-gray-600" />}
                    {measurements.needsCircumference && (
                      <MeasuringTapeIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* US Navy */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">US Navy</h3>
                <span className="text-sm text-[#FFC107]">±4-6%</span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Military method using height and circumference measurements
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('navy')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsHeight && (
                      <MeasurementVerticalIcon size="20" className="text-gray-600" />
                    )}
                    {measurements.needsCircumference && (
                      <MeasuringTapeIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* Modified YMCA */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Modified YMCA</h3>
                <span className="text-sm text-[#FFC107]">±4-6%</span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Enhanced YMCA method with additional measurements for women
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('mymca')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsCircumference && (
                      <MeasuringTapeIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>

          {/* YMCA */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all duration-300 hover:bg-[#222]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">YMCA</h3>
                <span className="text-sm text-[#FF5722]">±5-7%</span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Simple method using weight and waist measurements
              </p>
              {(() => {
                const measurements = getRequiredMeasurements('ymca')
                return (
                  <div className="mt-4 flex gap-3">
                    <BodyWeightScalesIcon size="20" className="text-gray-600" />
                    {measurements.needsCircumference && (
                      <MeasuringTapeIcon size="20" className="text-gray-600" />
                    )}
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
