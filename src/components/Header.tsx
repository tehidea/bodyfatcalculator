'use client'

import Link from 'next/link'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  )
}

function ChevronUpIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  )
}

function MobileNavLink({
  children,
  sectionId,
  ...props
}: {
  children: React.ReactNode
  sectionId: string
}) {
  const scrollToSection = () => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <PopoverButton
      className="block px-4 text-base font-medium leading-7 tracking-tight text-[#333333] hover:text-[#FF0000]"
      onClick={scrollToSection}
      {...props}
    >
      {children}
    </PopoverButton>
  )
}

export function Header() {
  return (
    <header className="bg-[#333333]">
      <nav>
        <Container className="relative z-50 flex items-center justify-between py-8">
          <Link
            href="/"
            aria-label="Home"
            className="flex flex-1 items-center gap-3"
          >
            <Logo className="h-10 w-auto" />
            <div className="flex h-8 items-center text-3xl">
              <span className="font-extralight tracking-tighter text-white">
                BODY
              </span>
              <span className="font-light tracking-tighter text-white">
                FAT
              </span>
            </div>
          </Link>
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <NavLinks />
          </div>
          <div className="flex flex-1 items-center justify-end gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <PopoverButton
                    className="relative z-50 -m-2 inline-flex items-center rounded-lg stroke-white p-2 hover:bg-white/10 hover:stroke-[#FF0000] active:stroke-[#FF0000] ui-not-focus-visible:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {open ? (
                      <ChevronUpIcon className="h-6 w-6 text-black" />
                    ) : (
                      <MenuIcon className="h-6 w-6" />
                    )}
                  </PopoverButton>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <PopoverBackdrop
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-40 bg-[#333333]/90 backdrop-blur"
                        />
                        <PopoverPanel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-[-2rem] z-40 origin-top rounded-b-2xl bg-white px-4 pb-6 pt-16 shadow-2xl shadow-gray-200/50 sm:px-6 lg:px-8"
                        >
                          <div className="flex flex-col space-y-6">
                            <div className="flex items-center gap-3">
                              <Logo className="h-10 w-auto [&>path]:fill-[#333333]" />
                              <div className="flex h-8 items-center text-3xl">
                                <span className="font-extralight tracking-tighter text-[#333333]">
                                  BODY
                                </span>
                                <span className="font-light tracking-tighter text-[#333333]">
                                  FAT
                                </span>
                              </div>
                            </div>

                            <MobileNavLink sectionId="features">
                              Features
                            </MobileNavLink>
                            <MobileNavLink sectionId="get-pro-version">
                              Pricing
                            </MobileNavLink>
                            <MobileNavLink sectionId="faqs">FAQs</MobileNavLink>
                            <div className="pt-4">
                              <Button href="#" color="red" className="w-full">
                                Download
                              </Button>
                            </div>
                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
            <Button
              href="https://apps.apple.com/us/app/body-fat-calculator-pro/id6738918673"
              color="red"
              className="hidden lg:block"
            >
              Download on App Store
            </Button>
            <Button
              href="https://play.google.com/store/apps/details?id=com.tehidea.bodyfatcalculator"
              color="red"
              className="hidden lg:block"
            >
              Get it on Google Play
            </Button>
          </div>
        </Container>
      </nav>
    </header>
  )
}
