'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

export function NavLinks() {
  return (
    <div className="flex items-center gap-8">
      <Link
        href="#features"
        className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
      >
        Features
      </Link>
      <Link
        href="#get-pro-version"
        className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
      >
        Pricing
      </Link>
      <Link
        href="#faqs"
        className="text-base font-medium leading-7 tracking-tight text-white hover:text-[#FF0000]"
      >
        FAQs
      </Link>
    </div>
  )
}
