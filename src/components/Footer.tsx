import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLinks } from '@/components/NavLinks'
import qrCode from '@/images/qr-code.svg'

function QrCodeBorder(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-white/40 transition-colors group-hover:stroke-[#FF0000]"
      />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#333333]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-y-8 pb-4 pt-12 lg:flex-row lg:items-center lg:py-2">
          <div className="w-full text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
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
          </div>
          <div className="hidden sm:block">
            <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
              <div className="mr-8 text-right lg:w-64">
                <p className="text-base font-semibold text-white">
                  <Link href="#">
                    <span className="absolute inset-0 sm:rounded-2xl" />
                    Download the app
                  </Link>
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Scan the QR code to download the app from the App Store.
                </p>
              </div>
              <div className="relative flex h-24 w-24 flex-none items-center justify-center">
                <QrCodeBorder className="absolute inset-0 h-full w-full" />
                <Image
                  src={qrCode}
                  alt="Download app QR code"
                  unoptimized
                  className="brightness-0 invert"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-gray-700/50 pb-8 pt-6 md:flex-row md:items-center md:pt-4">
          <p className="order-2 text-sm text-gray-400 md:order-1">
            &copy; {new Date().getFullYear()} BodyFat Calculator. All rights
            reserved.
          </p>
          <div className="order-1 mb-4 flex space-x-6 text-sm text-gray-400 md:order-2 md:mb-0">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
