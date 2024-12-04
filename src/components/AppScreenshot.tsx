'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PhoneFrame } from '@/components/PhoneFrame'

interface AppScreenshotProps {
  src: string
  alt: string
  className?: string
  position?: 'left' | 'right' | 'center'
}

export function AppScreenshot({
  src,
  alt,
  className = '',
  position = 'center',
}: AppScreenshotProps) {
  const positionStyles = {
    left: {
      initial: { opacity: 0, x: -20, rotate: -15 },
      className: 'absolute -left-[160px] top-[300px] w-[220px] -rotate-[15deg]',
      hoverClassName:
        'hover:-translate-x-2 hover:translate-y-2 hover:-rotate-[17deg]',
    },
    right: {
      initial: { opacity: 0, x: 20, rotate: 30 },
      className: 'absolute -right-[160px] top-[100px] w-[220px] rotate-[30deg]',
      hoverClassName:
        'hover:translate-x-2 hover:translate-y-2 hover:rotate-[32deg]',
    },
    center: {
      initial: { opacity: 1, y: 20 },
      className: 'relative z-20',
      hoverClassName: 'hover:scale-[1.02]',
      scale: 1.1,
    },
  }

  const styles = positionStyles[position]

  return (
    <motion.div
      initial={styles.initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`${styles.className} ${styles.hoverClassName} transition-transform duration-300 ${className}`}
      style={
        position === 'center'
          ? { transform: `scale(${styles.scale})` }
          : undefined
      }
    >
      <PhoneFrame className="w-full" priority={position === 'center'}>
        <Image
          src={src}
          alt={alt}
          className="object-cover"
          fill
          priority={position === 'center'}
        />
      </PhoneFrame>
    </motion.div>
  )
}
