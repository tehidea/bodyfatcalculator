'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavLinks() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex items-center gap-8">
      {isHomePage ? (
        <>
          <button
            onClick={() => scrollToSection('features')}
            className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
          >
            FAQs
          </button>
        </>
      ) : (
        <>
          <Link
            href="/#features"
            className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
          >
            Pricing
          </Link>
          <Link
            href="/#faqs"
            className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
          >
            FAQs
          </Link>
        </>
      )}
    </div>
  )
}
