// Custom types not covered by generated types

export interface PaginationParams {
  page?: number
  per_page?: number
}

export interface SearchParams {
  query?: string
  text?: string
  area?: string
  professional_role?: string
  experience?: string
  employment?: string
  schedule?: string
}

export interface SalaryParams {
  salary_from?: number
  salary_to?: number
  currency?: string
  only_with_salary?: boolean
}

export interface VacancySearchParams extends PaginationParams, SearchParams, SalaryParams {
  industry?: string
  employer_id?: string
  order_by?: 'publication_time' | 'salary_desc' | 'salary_asc' | 'relevance'
  date_from?: string
  date_to?: string
}

export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    per_page?: number
    found?: number
  }
}

export interface HeadHunterApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  description?: string
}

// Common parameter combinations
export type GetVacanciesParams = VacancySearchParams
export type GetResumesParams = PaginationParams & {
  status?: 'not_published' | 'published' | 'blocked' | 'hidden'
  order_by?: 'creation_time' | 'update_time'
}

// HeadHunter specific types
export interface UserAgentConfig {
  appName: string
  version: string
  contact: string
}

export interface HeadHunterCredentials {
  accessToken?: string
  userAgent: string
}

export interface VacancyFilters {
  area?: string | string[]
  industry?: string | string[]
  professional_role?: string | string[]
  experience?: 'noExperience' | 'between1And3' | 'between3And6' | 'moreThan6'
  employment?: 'full' | 'part' | 'project' | 'volunteer' | 'probation'
  schedule?: 'fullDay' | 'shift' | 'flexible' | 'remote' | 'flyInFlyOut'
}

// Helper types for strongly typed API calls
export type HHVacancyId = string
export type HHResumeId = string
export type HHNegotiationId = string
export type HHAreaId = string
export type HHIndustryId = string
export type HHEmployerId = string

// Response wrapper types
export type VacancySearchResponse = ApiResponse<{
  items: Array<unknown>
  found: number
  pages: number
  page: number
  per_page: number
}>

export type VacancyDetailsResponse = ApiResponse<{
  id: string
  name: string
  description: string
  salary?: {
    from?: number
    to?: number
    currency: string
  }
  employer: {
    id: string
    name: string
    url?: string
  }
  area: {
    id: string
    name: string
  }
  published_at: string
  created_at: string
  archived: boolean
  premium: boolean
  accept_handicapped: boolean
  accept_kids: boolean
}>
