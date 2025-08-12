import { cva } from 'class-variance-authority'

export const levelDot = cva('w-2 h-2 rounded-full', {
  variants: {
    level: {
      BEGINNER: 'bg-gray-500',
      INTERMEDIATE: 'bg-yellow-500',
      ADVANCED: 'bg-blue-500',
      EXPERT: 'bg-green-500'
    }
  }
})

export const featuredDot = 'w-2 h-2 bg-primary rounded-full'
