// ============================================================================
// DATA PARSING & MANIPULATION UTILITIES
// ============================================================================

/**
 * Safely parse JSON string, fallback to empty array on error
 */
export const safeJsonParse = <T = unknown>(jsonString: string | null, fallback: T = [] as T): T => {
  if (!jsonString) return fallback
  try {
    return JSON.parse(jsonString)
  } catch {
    return fallback
  }
}

/**
 * Parse technologies field that can be JSON array or comma-separated string
 */
export const parseTechnologies = (technologies: string | null): string[] => {
  if (!technologies) return []
  
  if (technologies.startsWith('[')) {
    return safeJsonParse<string[]>(technologies, [])
  }
  
  return technologies.split(',').map(t => t.trim()).filter(Boolean)
}

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const clonedObj = {} as { [key: string]: unknown }
    for (const key in obj) {
      clonedObj[key] = deepClone(obj[key])
    }
    return clonedObj as T
  }
  return obj
}

/**
 * Check if two objects are deeply equal
 */
export function isEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  if (a === null || a === undefined || b === null || b === undefined) return false
  if (a.constructor !== b.constructor) return false
  
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false
    if (!isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) return false
  }
  
  return true
}

/**
 * Group array items by a key
 */
export function groupBy<T>(array: T[], keyFn: (item: T) => string | number): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item).toString()
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * Remove duplicates from array
 */
export function unique<T>(array: T[], keyFn?: (item: T) => unknown): T[] {
  if (!keyFn) return [...new Set(array)]
  
  const seen = new Set()
  return array.filter(item => {
    const key = keyFn(item)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}