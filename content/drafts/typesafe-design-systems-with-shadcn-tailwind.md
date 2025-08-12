---
title: 'Type‑Safe Design Systems with shadcn/ui + Tailwind + Radix'
slug: 'typesafe-design-systems-with-shadcn-tailwind'
excerpt: 'How to build a reusable, composable, and type‑safe design system in Next.js without a component zoo.'
category: 'Frontend'
tags: 'shadcn/ui,Tailwind,Radix,TypeScript,Design System,Accessibility'
readingTime: 9
published: false
---

# Type‑Safe Design Systems with shadcn/ui + Tailwind + Radix

> You don’t need 200 components to have a design system. You need the right primitives, strict types, and a theming story that scales.

## Core principles

1. **Start from primitives** (Button, Card, Input, Tooltip), not screens.
2. **Separate tokens from components** (colors/spacing/typography live in CSS variables).
3. **Make state explicit** in types: `variant`, `size`, and `disabled` are not optional opinions.
4. **Accessibility is a feature**, not a task: use Radix for behavior.

## Project setup

- Next.js 15 (App Router)
- Tailwind CSS with design tokens in `:root` and theme css vars
- shadcn/ui as a code‑gen (no installed library lock‑in)
- Radix for a11y behavior (Dialog, Popover, Tooltip)

## A better Button

```tsx
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const button = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base'
      }
    },
    defaultVariants: { variant: 'default', size: 'md' }
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />
}
```

### Why this works

- Uniform API across all buttons.
- Theme‑aware (tokens drive colors; variants just map to classes).
- Fully typed consumer API thanks to `VariantProps`.

## Theming with CSS variables

```css
:root {
  --radius: 0.6rem;
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.theme-light {
  /* override vars */
}
.theme-dark {
  /* override vars */
}
```

Your components never change for light/dark/system. Only tokens do.

## Composable patterns

Build “lego” components: `Card > CardHeader > CardContent > CardFooter` with strict slots. Prefer _composition_ over inheritance. Group complex behavior (e.g., `Dialog`) with Radix and wrap with light styling and typed props.

## Documentation inside the codebase

- Every component lives next to a MDX usage snippet.
- Add Storybook only when you need external consumers; otherwise keep it inside your repo.

## Shipping checklist

- [ ] Tokens defined in CSS vars
- [ ] Primitives with typed variants (CVA)
- [ ] Radix for behavior
- [ ] Theme provider + SSR hydration guard
- [ ] MD/MDX usage docs next to components

Strong systems are invisible to end users and delightful to engineers. This stack keeps you fast, consistent, and future‑proof.
