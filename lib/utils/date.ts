// ============================================================================
// DATE & TIME UTILITIES
// ============================================================================

/**
 * Format a period between two dates with proper handling of current/ongoing periods
 */
export const formatPeriod = (startDate: Date, endDate: Date | null, current: boolean): string => {
  const start = startDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  })
  
  if (current) {
    return `${start} - Present`
  }
  
  if (endDate) {
    const end = endDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
    return `${start} - ${end}`
  }
  
  return start
}

/**
 * Calculate duration between two dates in human-readable format
 */
export function calculateDuration(startDate: Date, endDate: Date): string {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffMonths = Math.round(diffDays / 30)
  
  if (diffDays <= 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'}`
  } else if (diffMonths < 1) {
    const weeks = Math.round(diffDays / 7)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'}`
  } else if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`
  } else {
    const years = Math.round(diffMonths / 12)
    return `${years} ${years === 1 ? 'year' : 'years'}`
  }
}

/**
 * Format date for display in various formats
 */
export function formatDate(date: Date, format: 'short' | 'long' | 'numeric' | 'iso' = 'short'): string {
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    case 'long':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    case 'numeric':
      return date.toLocaleDateString('en-US')
    case 'iso':
      return date.toISOString().split('T')[0]
    default:
      return date.toLocaleDateString('en-US')
  }
}

/**
 * Check if a date is within a specific range
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate
}

/**
 * Get relative time string (e.g., "2 hours ago", "3 days ago")
 */
export function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`
    }
  }
  
  return 'just now'
}