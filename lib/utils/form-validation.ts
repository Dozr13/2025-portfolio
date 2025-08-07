/**
 * Common form validation utilities for admin forms
 */

export interface ValidationRule<T> {
  validate: (value: T) => boolean
  message: string
}

export function createValidator<T>(rules: ValidationRule<T>[]) {
  return (value: T): string | null => {
    for (const rule of rules) {
      if (!rule.validate(value)) {
        return rule.message
      }
    }
    return null
  }
}

// Common validation rules
export const validationRules = {
  required: <T>(fieldName: string): ValidationRule<T> => ({
    validate: (value: T) => {
      if (typeof value === 'string') {
        return value.trim().length > 0
      }
      return value != null && value !== ''
    },
    message: `${fieldName} is required`
  }),

  minLength: (min: number, fieldName: string): ValidationRule<string> => ({
    validate: (value: string) => value.trim().length >= min,
    message: `${fieldName} must be at least ${min} characters`
  }),

  maxLength: (max: number, fieldName: string): ValidationRule<string> => ({
    validate: (value: string) => value.trim().length <= max,
    message: `${fieldName} must be no more than ${max} characters`
  }),

  url: (fieldName: string): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value.trim()) return true // Allow empty
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },
    message: `${fieldName} must be a valid URL`
  }),

  slug: (fieldName: string): ValidationRule<string> => ({
    validate: (value: string) => /^[a-z0-9-]+$/.test(value),
    message: `${fieldName} must contain only lowercase letters, numbers, and hyphens`
  }),

  positiveNumber: (fieldName: string): ValidationRule<string> => ({
    validate: (value: string) => {
      if (!value.trim()) return true // Allow empty
      const num = parseInt(value)
      return !isNaN(num) && num > 0
    },
    message: `${fieldName} must be a positive number`
  })
}

// Common validation schemas
export const skillValidation = {
  name: createValidator([
    validationRules.required('Skill name'),
    validationRules.minLength(2, 'Skill name'),
    validationRules.maxLength(50, 'Skill name')
  ])
}

export const projectValidation = {
  title: createValidator([
    validationRules.required('Project title'),
    validationRules.minLength(3, 'Project title'),
    validationRules.maxLength(100, 'Project title')
  ]),
  slug: createValidator([
    validationRules.required('Slug'),
    validationRules.slug('Slug')
  ]),
  description: createValidator([
    validationRules.required('Description'),
    validationRules.minLength(10, 'Description'),
    validationRules.maxLength(500, 'Description')
  ]),
  demoUrl: createValidator([
    validationRules.url('Demo URL')
  ]),
  githubUrl: createValidator([
    validationRules.url('GitHub URL')
  ])
}
