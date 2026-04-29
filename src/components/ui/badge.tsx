import type { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'outline' | 'subtle' | 'destructive'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-chart-1 text-primary-foreground border-transparent',
  outline: 'border-border text-foreground bg-background/70',
  subtle: 'border-chart-1/10 bg-chart-1/8 text-chart-1',
  destructive: 'border-transparent bg-destructive text-destructive-foreground',
}

export function Badge({
  className = '',
  variant = 'default',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  )
}
