export type {
  AnalyticsCountryData,
  AnalyticsData,
  AnalyticsEventData,
  AnalyticsPageData,
  AnalyticsReferrerData,
  AnalyticsResponse,
  AnalyticsTimeSeriesData,
  StatsData,
  UseAnalyticsOptions
} from './analytics'
export type { BlogPost, BlogPostFormData } from './blog'
export type { Contact } from './contact'
export type { Project, ProjectFormData } from './project'
export type { Skill, SkillFormData } from './skills'

// Admin page states
export interface AdminPageState<T> {
  data: T[]
  loading: boolean
  error: string | null
  deleting: string | null
}

// Admin form states
export interface AdminFormState<T> {
  formData: T
  loading: boolean
  error: string | null
  submitting: boolean
}