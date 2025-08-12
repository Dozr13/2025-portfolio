import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ============================================================================
// UI UTILITIES
// ============================================================================

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate consistent component class names
 */
export function createVariantClasses(
  base: string,
  variants: Record<string, Record<string, string>>,
  selectedVariants: Record<string, string>
): string {
  const variantClasses = Object.entries(selectedVariants)
    .map(([key, value]) => variants[key]?.[value])
    .filter(Boolean)
    .join(' ')

  return cn(base, variantClasses)
}

/**
 * Debounce function for search inputs and other UI interactions
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function for scroll events and other high-frequency events
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
