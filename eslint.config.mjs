import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      '*.min.js',
      '*.min.css',
      '.env.local',
      '.env.production',
      '.env',
      '.yarn/**',
      '.pnp.*',
      'generated/**',
      'prisma/generated/**'
    ]
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Yarn PnP compatibility overrides
  {
    files: ['lib/prisma.ts', 'scripts/seed-blog.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off'
    }
  },
  // Admin-specific overrides
  {
    files: ['app/admin/**/*', 'app/api/admin/**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
]

export default eslintConfig