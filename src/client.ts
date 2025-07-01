import { createClient, type Client } from '@hey-api/client-axios'

export interface HeadHunterClientConfig {
  userAgent: string
  accessToken?: string
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}

/**
 * Create a pre-configured HeadHunter API client
 * @param config Configuration options
 * @returns Configured client instance
 */
export function createHeadHunterClient(config: HeadHunterClientConfig): Client {
  const { userAgent, accessToken, baseURL = 'https://api.hh.ru', timeout = 30000, headers = {} } = config

  if (!userAgent) {
    throw new Error('userAgent is required for HeadHunter API. Format: "AppName/Version (contact@example.com)"')
  }

  const client = createClient({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    },
  })

  return client
}

// Constants for HeadHunter API
export const HH_API_BASE_URL = 'https://api.hh.ru'
export const HH_REQUIRED_USER_AGENT_FORMAT = 'AppName/Version (contact@example.com)'
