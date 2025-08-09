// ============================================================================
// DATE & TIME TYPES
// ============================================================================

export interface DateRange {
  startDate: Date
  endDate: Date | null
  current: boolean
}

export interface FormattedPeriod {
  period: string
  duration?: string
}

export interface TimeFrame {
  label: string
  value: string
  days: number
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date | null
  allDay?: boolean
  color?: string
}

export type DateFormat = 'short' | 'long' | 'numeric' | 'iso'
export type TimeFormat = '12h' | '24h'