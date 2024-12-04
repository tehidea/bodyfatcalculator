'use client'

import { Fragment, useEffect, useId, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import {
  type MotionProps,
  type Variant,
  type Variants,
  AnimatePresence,
  motion,
} from 'framer-motion'
import { useDebouncedCallback } from 'use-debounce'
import { CheckIcon } from '@heroicons/react/24/solid'

import { AppScreen } from '@/components/AppScreen'
import { CircleBackground } from '@/components/CircleBackground'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'
import { FORMULA_REQUIREMENTS } from '@/FORMULA_REQUIREMENTS'
import { BodyWeightScalesIcon } from '@/images/icons/BodyWeightScalesIcon'
import { MeasuringTapeIcon } from '@/images/icons/MeasuringTapeIcon'
import { SkinfoldIcon } from '@/images/icons/SkinfoldIcon'
import { MeasurementVerticalIcon } from '@/images/icons/MeasurementVerticalIcon'
import { CalendarIcon } from '@/images/icons/CalendarIcon'

// Helper function to check if formula needs specific measurements
function getRequiredMeasurements(formula: keyof typeof FORMULA_REQUIREMENTS) {
  const fields = FORMULA_REQUIREMENTS[formula].fields
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
    name: 'Caliper Measurements',
    description:
      'Get the most accurate body fat measurements using the industry-standard Jackson & Pollock methods with 3, 4, or 7 sites. Perfect for fitness professionals and serious athletes.',
    icon: DeviceUserIcon,
    screen: InviteScreen,
  },
  {
    name: 'US Navy Method',
    description:
      "Quick and reliable measurements using the US Navy circumference method. Ideal for tracking progress when calipers aren't available.",
    icon: DeviceNotificationIcon,
    screen: StocksScreen,
  },
  {
    name: 'Advanced Analytics',
    description:
      'Track your progress over time with detailed charts, trends, and comprehensive body composition analysis. Export your data for professional analysis.',
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
      <path
        d="M9 8a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H11a2 2 0 01-2-2V8z"
        fill="#737373"
      />
    </svg>
  )
}

function DeviceTouchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  let id = useId()

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
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom: CustomAnimationProps) => ({
      y: '0%',
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: 'blur(0px)',
      transition: { duration: 0.4 },
    }),
    exit: (custom: CustomAnimationProps, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
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
        <AppScreen.Title>Invite people</AppScreen.Title>
        <AppScreen.Subtitle>
          Get tips <span className="text-white">5s sooner</span> for every
          invite.
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="px-4 py-6">
          <div className="space-y-6">
            {[
              { label: 'Full name', value: 'Albert H. Wiggin' },
              { label: 'Email address', value: 'awiggin@chase.com' },
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
            Invite person
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
        <AppScreen.Title>Stocks</AppScreen.Title>
        <AppScreen.Subtitle>March 9, 2022</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="divide-y divide-gray-100">
          {[
            {
              name: 'Laravel',
              price: '4,098.01',
              change: '+4.98%',
              color: '#F9322C',
              logo: LaravelLogo,
            },
            {
              name: 'Tuple',
              price: '5,451.10',
              change: '-3.38%',
              color: '#5A67D8',
              logo: TupleLogo,
            },
            {
              name: 'Transistor',
              price: '4,098.41',
              change: '+6.25%',
              color: '#2A5B94',
              logo: TransistorLogo,
            },
            {
              name: 'Diageo',
              price: '250.65',
              change: '+1.25%',
              color: '#3320A7',
              logo: DiageoLogo,
            },
            {
              name: 'StaticKit',
              price: '250.65',
              change: '-3.38%',
              color: '#2A3034',
              logo: StaticKitLogo,
            },
            {
              name: 'Statamic',
              price: '5,040.85',
              change: '-3.11%',
              color: '#0EA5E9',
              logo: StatamicLogo,
            },
            {
              name: 'Mirage',
              price: '140.44',
              change: '+9.09%',
              color: '#16A34A',
              logo: MirageLogo,
            },
            {
              name: 'Reversable',
              price: '550.60',
              change: '-1.25%',
              color: '#8D8D8D',
              logo: ReversableLogo,
            },
          ].map((stock) => (
            <div key={stock.name} className="flex items-center gap-4 px-4 py-3">
              <div
                className="flex-none rounded-full"
                style={{ backgroundColor: stock.color }}
              >
                <stock.logo className="h-10 w-10" />
              </div>
              <div className="flex-auto text-sm text-gray-900">
                {stock.name}
              </div>
              <div className="flex-none text-right">
                <div className="text-sm font-medium text-gray-900">
                  {stock.price}
                </div>
                <div
                  className={clsx(
                    'text-xs leading-5',
                    stock.change.startsWith('+')
                      ? 'text-cyan-500'
                      : 'text-gray-500',
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
        <AppScreen.Title>Buy $LA</AppScreen.Title>
        <AppScreen.Subtitle>
          <span className="text-white">$34.28</span> per share
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="px-4 py-6">
          <div className="space-y-4">
            {[
              { label: 'Number of shares', value: '100' },
              {
                label: 'Current market price',
                value: (
                  <div className="flex">
                    $34.28
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                      <path
                        d="M17 15V7H9M17 7 7 17"
                        stroke="#06B6D4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ),
              },
              { label: 'Estimated cost', value: '$3,428.00' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between border-b border-gray-100 pb-4"
              >
                <div className="text-sm text-gray-500">{item.label}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {item.value}
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-cyan-500 px-3 py-2 text-center text-sm font-semibold text-white">
              Buy shares
            </div>
          </div>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  )
}

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

function FeaturesDesktop() {
  let [changeCount, setChangeCount] = useState(0)
  let [selectedIndex, setSelectedIndex] = useState(0)
  let prevIndex = usePrevious(selectedIndex)
  let isForwards = prevIndex === undefined ? true : selectedIndex > prevIndex

  let onChange = useDebouncedCallback(
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
              <p className="mt-2 text-sm text-gray-400">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </TabList>
      <div className="relative col-span-6">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <CircleBackground color="#13B5C8" className="animate-spin-slower" />
        </div>
        <PhoneFrame className="z-10 mx-auto w-full max-w-[366px]">
          <TabPanels as={Fragment}>
            <AnimatePresence
              initial={false}
              custom={{ isForwards, changeCount }}
            >
              {features.map((feature, featureIndex) =>
                selectedIndex === featureIndex ? (
                  <TabPanel
                    static
                    key={feature.name + changeCount}
                    className="col-start-1 row-start-1 flex focus:outline-offset-[32px] ui-not-focus-visible:outline-none"
                  >
                    <feature.screen
                      animated
                      custom={{ isForwards, changeCount }}
                    />
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

function FeaturesMobile() {
  let [activeIndex, setActiveIndex] = useState(0)
  let slideContainerRef = useRef<React.ElementRef<'div'>>(null)
  let slideRefs = useRef<Array<React.ElementRef<'div'>>>([])

  useEffect(() => {
    let observer = new window.IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
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

    for (let slide of slideRefs.current) {
      if (slide) {
        observer.observe(slide)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [slideContainerRef, slideRefs])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="-mb-4 flex snap-x snap-mandatory -space-x-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] sm:-space-x-6 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            ref={(ref) => ref && (slideRefs.current[featureIndex] = ref)}
            className="w-full flex-none snap-center px-4 sm:px-6"
          >
            <div className="relative transform overflow-hidden rounded-2xl bg-gray-800 px-5 py-6">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <CircleBackground
                  color="#13B5C8"
                  className={featureIndex % 2 === 1 ? 'rotate-180' : undefined}
                />
              </div>
              <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
                <feature.screen />
              </PhoneFrame>
              <div className="absolute inset-x-0 bottom-0 bg-gray-800/95 p-6 backdrop-blur sm:p-10">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 text-sm font-semibold text-white sm:text-lg">
                  {feature.name}
                </h3>
                <p className="mt-2 text-sm text-gray-400">
                  {feature.description}
                </p>
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
            Choose Your Perfect
            <span className="relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-[#FF0000]/20"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative ml-4">Method</span>
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-400">
            From quick estimates to gold-standard measurements, we offer the
            most comprehensive selection of scientifically validated formulas.
            Each method is{' '}
            <span className="text-white">optimized for different needs</span>{' '}
            and equipment availability.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center rounded-lg bg-white/10 px-4 py-2">
              <span className="font-medium text-[#4CAF50]">±3-4%</span>
              <span className="ml-2 text-sm text-gray-300">Pro Accuracy</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-4 py-2">
              <span className="font-medium text-[#FFC107]">6</span>
              <span className="ml-2 text-sm text-gray-300">Pro Methods</span>
            </div>
            <div className="flex items-center rounded-lg bg-white/10 px-4 py-2">
              <span className="font-medium text-[#FF5722]">3</span>
              <span className="ml-2 text-sm text-gray-300">Free Methods</span>
            </div>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Jackson & Pollock 7-Site */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Jackson & Pollock 7-Site
              </h3>
              <span className="text-sm text-[#4CAF50]">±3-4%</span>
            </div>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#FF0000] px-2 py-0.5 text-xs text-white">
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
                  {measurements.needsAge && <CalendarIcon size={24} />}
                  {measurements.needsSkinfold && <SkinfoldIcon size={24} />}
                </div>
              )
            })()}
          </div>

          {/* Jackson & Pollock 4-Site */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Jackson & Pollock 4-Site
              </h3>
              <span className="text-sm text-[#4CAF50]">±3-4%</span>
            </div>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#FF0000] px-2 py-0.5 text-xs text-white">
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
                  {measurements.needsAge && <CalendarIcon size={24} />}
                  {measurements.needsSkinfold && <SkinfoldIcon size={24} />}
                </div>
              )
            })()}
          </div>

          {/* Jackson & Pollock 3-Site */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Jackson & Pollock 3-Site
              </h3>
              <span className="text-sm text-[#4CAF50]">±3-4%</span>
            </div>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#FF0000] px-2 py-0.5 text-xs text-white">
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
                  {measurements.needsAge && <CalendarIcon size={24} />}
                  {measurements.needsSkinfold && <SkinfoldIcon size={24} />}
                </div>
              )
            })()}
          </div>

          {/* Durnin & Womersley */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Durnin & Womersley
              </h3>
              <span className="text-sm text-[#4CAF50]">±3-4%</span>
            </div>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#FF0000] px-2 py-0.5 text-xs text-white">
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
                  {measurements.needsAge && <CalendarIcon size={24} />}
                  {measurements.needsSkinfold && <SkinfoldIcon size={24} />}
                </div>
              )
            })()}
          </div>

          {/* Parrillo */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Parrillo</h3>
              <span className="text-sm text-[#4CAF50]">±3-4%</span>
            </div>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#FF0000] px-2 py-0.5 text-xs text-white">
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
                  {measurements.needsWeight && (
                    <BodyWeightScalesIcon size={24} />
                  )}
                  {measurements.needsSkinfold && <SkinfoldIcon size={24} />}
                </div>
              )
            })()}
          </div>

          {/* Covert Bailey */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Covert Bailey
              </h3>
              <span className="text-sm text-[#4CAF50]">±3-4%</span>
            </div>
            <div className="mt-2">
              <span className="inline-block rounded bg-[#FF0000] px-2 py-0.5 text-xs text-white">
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
                  {measurements.needsWeight && (
                    <BodyWeightScalesIcon size={24} />
                  )}
                  {measurements.needsAge && <CalendarIcon size={24} />}
                  {measurements.needsCircumference && (
                    <MeasuringTapeIcon size={24} />
                  )}
                </div>
              )
            })()}
          </div>

          {/* US Navy */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
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
                  {measurements.needsWeight && (
                    <BodyWeightScalesIcon size={24} />
                  )}
                  {measurements.needsHeight && (
                    <MeasurementVerticalIcon size={24} />
                  )}
                  {measurements.needsCircumference && (
                    <MeasuringTapeIcon size={24} />
                  )}
                </div>
              )
            })()}
          </div>

          {/* YMCA */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
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
                  {measurements.needsWeight && (
                    <BodyWeightScalesIcon size={24} />
                  )}
                  {measurements.needsCircumference && (
                    <MeasuringTapeIcon size={24} />
                  )}
                </div>
              )
            })()}
          </div>

          {/* Modified YMCA */}
          <div className="rounded-2xl border border-[#FF0000]/10 bg-[#333333] p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Modified YMCA
              </h3>
              <span className="text-sm text-[#FF5722]">±5-7%</span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Enhanced YMCA method with additional measurements for women
            </p>
            {(() => {
              const measurements = getRequiredMeasurements('mymca')
              return (
                <div className="mt-4 flex gap-3">
                  {measurements.needsWeight && (
                    <BodyWeightScalesIcon size={24} />
                  )}
                  {measurements.needsCircumference && (
                    <MeasuringTapeIcon size={24} />
                  )}
                </div>
              )
            })()}
          </div>
        </div>
      </Container>
    </section>
  )
}
