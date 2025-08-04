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
      '.pnp.*'
    ]
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
]

export default eslintConfig