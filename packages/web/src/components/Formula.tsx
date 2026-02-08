'use client'

import 'katex/dist/katex.min.css'
import { BlockMath, InlineMath } from 'react-katex'

interface FormulaProps {
  formula: string
  inline?: boolean
}

export function Formula({ formula, inline = false }: FormulaProps) {
  if (inline) {
    return <InlineMath math={formula} />
  }

  return (
    <div className="overflow-x-auto" role="math" aria-label="Mathematical formula">
      <div className="min-w-fit">
        <BlockMath math={formula} />
      </div>
    </div>
  )
}
