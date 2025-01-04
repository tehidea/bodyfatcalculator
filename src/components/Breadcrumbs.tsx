import Link from 'next/link'
import { motion } from 'framer-motion'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-12 flex justify-center"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-800">
        <li>
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href}>
            <span className="ml-1 mr-2">/</span>
            {index === items.length - 1 ? (
              <span className="text-gray-600">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-gray-400">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  )
}
