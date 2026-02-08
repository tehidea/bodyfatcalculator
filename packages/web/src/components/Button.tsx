import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm transition-colors',
}

const variantStyles = {
  solid: {
    red: 'relative overflow-hidden bg-primary text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-primary/90 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-background hover:bg-white/90 active:bg-white/90 active:text-background/70',
    dark: 'bg-background text-white hover:bg-background/90 active:bg-background/80 active:text-white/80',
  },
  outline: {
    red: 'border-primary text-white hover:border-primary/80 active:bg-primary/10 active:text-white/80',
    white:
      'border-white text-white hover:border-white/80 active:bg-white/10 active:text-white/80',
    dark: 'border-background text-white hover:border-background/80 active:bg-background/10 active:text-white/80',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({
  variant = 'solid',
  color = 'red',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][
      color as keyof (typeof variantStyles)[typeof variant]
    ],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
