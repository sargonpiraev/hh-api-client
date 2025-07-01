// HeadHunter API Client
// Main entry point following standard API client structure

// === Export custom client creation function ===
export { createHeadHunterClient } from './client.js'
export type { HeadHunterClientConfig } from './client.js'

// === Export custom types ===
export * from './types.js'

// === Re-export all generated types and functions ===
export * from './generated/index.js'

// === Export commonly used functions for convenience ===
export {
  getVacancies,
  getVacancy,
  getFavoriteVacancies,
  addVacancyToFavorite,
  deleteVacancyFromFavorite,
  applyToVacancy,
  getAreas,
  getIndustries,
  getLanguages,
  getSkills,
  getProfessionalRolesDictionary,
  getCurrentUserInfo,
  editCurrentUserInfo,
  getMineResumes,
  getResume,
  createResume,
  editResume,
  deleteResume,
  publishResume,
  getNegotiations,
  getNegotiationItem,
  sendNegotiationMessage,
} from './generated/index.js'

// === Export core client functionality ===
export { client } from './generated/client.gen.js'
export { createClient } from './generated/client/index.js'
export type { Client, Options } from './generated/client/index.js'

// === Constants ===
export { HH_API_BASE_URL, HH_REQUIRED_USER_AGENT_FORMAT } from './client.js'
