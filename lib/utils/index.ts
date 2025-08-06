// ============================================================================
// UTILS INDEX - CLEAN IMPORT BARREL
// ============================================================================

// UI Utilities
export { cn, createVariantClasses, debounce, throttle } from './ui'

// Date & Time Utilities
export {
    calculateDuration,
    formatDate, formatPeriod, getRelativeTime, isDateInRange
} from './date'

// Formatting Utilities
export {
    formatCurrency,
    formatFileSize, formatNumber,
    formatPercentage, formatPhoneNumber, truncateText
} from './formatting'

// Data Utilities
export {
    chunk, deepClone, groupBy, isEqual, parseTechnologies, safeJsonParse, unique
} from './data'

// String Utilities
export {
    camelToKebab, camelToSnake, capitalize, generateSlug, getInitials, isValidEmail,
    isValidUrl, kebabToCamel, normalizeText, randomString, snakeToCamel, toTitleCase
} from './string'

// Validation Utilities
export {
    hasValidationErrors, validateEmail, validateForm, validateLength, validatePassword,
    validatePasswordMatch, validatePhone, validateRequired, validateUrl
} from './validation'
