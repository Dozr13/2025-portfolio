// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

/**
 * Validate required fields
 */
export function validateRequired(value: unknown, fieldName: string): string | null {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`
  }
  return null
}

/**
 * Validate email format
 */
export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }
  return null
}

/**
 * Validate string length
 */
export function validateLength(
  value: string, 
  min: number, 
  max: number, 
  fieldName: string
): string | null {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters`
  }
  if (value.length > max) {
    return `${fieldName} must be no more than ${max} characters`
  }
  return null
}

/**
 * Validate URL format
 */
export function validateUrl(url: string): string | null {
  if (!url) return null // URLs are often optional
  try {
    new URL(url)
    return null
  } catch {
    return 'Please enter a valid URL'
  }
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): string | null {
  if (!phone) return null // Phone is often optional
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  if (!phoneRegex.test(phone.replace(/\s|-|\(|\)/g, ''))) {
    return 'Please enter a valid phone number'
  }
  return null
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required'
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter'
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter'
  if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number'
  return null
}

/**
 * Validate that passwords match
 */
export function validatePasswordMatch(password: string, confirmPassword: string): string | null {
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return null
}

/**
 * Generic form validation
 */
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  rules: Record<keyof T, ((value: T[keyof T]) => string | null)[]>
): Record<keyof T, string | null> {
  const errors = {} as Record<keyof T, string | null>
  
  for (const [field, validators] of Object.entries(rules)) {
    const value = data[field as keyof T]
    let error: string | null = null
    
    for (const validator of validators) {
      error = validator(value)
      if (error) break // Stop at first error
    }
    
    errors[field as keyof T] = error
  }
  
  return errors
}

/**
 * Check if form has any errors
 */
export function hasValidationErrors(errors: Record<string, string | null>): boolean {
  return Object.values(errors).some(error => error !== null)
}