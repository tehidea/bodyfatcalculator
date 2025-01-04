'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePlausible } from 'next-plausible'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCodeApple from '@/images/qr-code-apple.svg'
import qrCodeGoogle from '@/images/qr-code-google.svg'

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V1h16M95 17V1H79M1 79v16h16M95 79v16H79"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-white/40 transition-colors group-hover:stroke-[#FF0000]"
      />
    </svg>
  )
}

export function Footer() {
  const plausible = usePlausible()

  const handleAppStoreClick = () => {
    plausible('App Store Click', {
      props: {
        location: 'footer',
        platform: 'ios',
      },
    })
  }

  const handleGooglePlayClick = () => {
    plausible('Google Play Click', {
      props: {
        location: 'footer',
        platform: 'android',
      },
    })
  }

  return (
    <footer className="border-t border-gray-200 bg-[#333333]">
      <Container>
        <div className="flex flex-col items-center gap-y-8 py-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="flex h-8 items-center text-4xl">
              <span className="font-extralight tracking-tighter text-white">
                BODY
              </span>
              <span className="font-light tracking-tighter text-white">
                FAT
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link href="/methods" className="hover:text-white">
              Methods
            </Link>
            <Link href="/formulas" className="hover:text-white">
              Formulas
            </Link>
            <Link href="/guides" className="hover:text-white">
              Guides
            </Link>
            <Link href="/research" className="hover:text-white">
              Research
            </Link>
            <Link href="/faq" className="hover:text-white">
              FAQ
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </nav>

          {/* QR Codes */}
          <div className="hidden sm:block">
            <div className="flex gap-4">
              <div className="group relative flex items-center self-stretch p-4 transition-colors sm:self-auto sm:rounded-2xl lg:self-auto lg:p-6">
                <div className="relative flex h-24 w-24 flex-none items-center justify-center">
                  <QrCodeBorder className="absolute inset-0 h-full w-full" />
                  <Image
                    src={qrCodeApple}
                    alt="Download app QR code"
                    unoptimized
                  />
                </div>
                <div className="ml-8 text-left lg:w-64">
                  <p className="text-base font-semibold text-white">
                    <Link
                      href="https://apps.apple.com/us/app/body-fat-calculator-pro/id6738918673"
                      onClick={handleAppStoreClick}
                    >
                      <span className="absolute inset-0 sm:rounded-2xl" />
                      Download from App Store
                    </Link>
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Scan the QR code to download the app from the App Store.
                  </p>
                </div>
              </div>
              <div className="group relative flex items-center self-stretch p-4 transition-colors sm:self-auto sm:rounded-2xl lg:self-auto lg:p-6">
                <div className="mr-8 text-right lg:w-64">
                  <p className="text-base font-semibold text-white">
                    <Link
                      href="https://play.google.com/store/apps/details?id=com.tehidea.bodyfatcalculator"
                      onClick={handleGooglePlayClick}
                    >
                      <span className="absolute inset-0 sm:rounded-2xl" />
                      Get it on Google Play
                    </Link>
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Scan the QR code to download the app from Google Play.
                  </p>
                </div>
                <div className="relative flex h-24 w-24 flex-none items-center justify-center">
                  <QrCodeBorder className="absolute inset-0 h-full w-full" />
                  <Image
                    src={qrCodeGoogle}
                    alt="Download app QR code"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Download Links */}
          <div className="flex flex-col items-center gap-4 sm:hidden">
            <Link
              href="https://apps.apple.com/us/app/body-fat-calculator-pro/id6738918673"
              className="text-sm text-gray-400 hover:text-white"
            >
              Download from App Store
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.tehidea.bodyfatcalculator"
              className="text-sm text-gray-400 hover:text-white"
            >
              Get it on Google Play
            </Link>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700/50 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BodyFat Calculator. All rights
              reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
