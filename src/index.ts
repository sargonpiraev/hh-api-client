// HeadHunter API Client
// Re-exports from generated SDK with organized structure

// === Core Client & Configuration ===
export { client } from './generated/client.gen.js';
export { createClient } from './generated/client/index.js';
export type { Client, Options } from './generated/client/index.js';

// === Most Used Functions ===
// Vacancy search and management
export {
  getVacancies,
  getVacancy,
  getFavoriteVacancies,
  addVacancyToFavorite,
  deleteVacancyFromFavorite,
  getVacanciesSimilarToResume,
  applyToVacancy,
} from './generated/index.js';

// Dictionaries and references
export {
  getDictionaries,
  getAreas,
  getIndustries,
  getLanguages,
  getSkills,
  getProfessionalRolesDictionary,
  getMetroStations,
  getMetroStationsInCity,
} from './generated/index.js';

// User and authentication
export {
  getCurrentUserInfo,
  editCurrentUserInfo,
  authorize,
  invalidateToken,
} from './generated/index.js';

// Resume management
export {
  getMineResumes,
  getResume,
  createResume,
  editResume,
  deleteResume,
  publishResume,
  searchForResumes,
  getResumeConditions,
} from './generated/index.js';

// Negotiations
export {
  getNegotiations,
  getNegotiationItem,
  getNegotiationMessages,
  sendNegotiationMessage,
  changeNegotiationAction,
} from './generated/index.js';

// === All Types ===
export type {
  // Vacancy types
  GetVacanciesData,
  GetVacanciesResponses,
  GetVacancyData,
  GetVacancyResponses,
  ApplyToVacancyData,
  ApplyToVacancyResponses,
  
  // Dictionary types
  GetDictionariesResponses,
  GetAreasResponses,
  GetIndustriesResponses,
  GetLanguagesResponses,
  GetSkillsResponses,
  
  // User types
  GetCurrentUserInfoResponses,
  AuthorizeData,
  AuthorizeResponses,
  
  // Resume types
  GetMineResumesResponses,
  GetResumeData,
  GetResumeResponses,
  CreateResumeData,
  CreateResumeResponses,
  EditResumeData,
  EditResumeResponses,
  SearchForResumesData,
  SearchForResumesResponses,
  
  // Negotiation types
  GetNegotiationsData,
  GetNegotiationsResponses,
  GetNegotiationItemData,
  GetNegotiationItemResponses,
  SendNegotiationMessageData,
  SendNegotiationMessageResponses,
  ChangeNegotiationActionData,
  ChangeNegotiationActionResponses,
} from './generated/index.js';

// === All Functions (for advanced usage) ===
export * from './generated/index.js';

// === Helper Configuration ===
import { createClient } from './generated/client/index.js';

/**
 * Create a pre-configured HeadHunter API client
 * @param config Configuration options
 * @returns Configured client instance
 */
export function createHeadHunterClient(config: {
  userAgent: string;
  accessToken?: string;
  baseURL?: string;
}) {
  return createClient({
    baseUrl: config.baseURL || 'https://api.hh.ru',
    headers: {
      'User-Agent': config.userAgent,
      ...(config.accessToken && { 'Authorization': `Bearer ${config.accessToken}` }),
    },
  });
}

// === Constants ===
export const HH_API_BASE_URL = 'https://api.hh.ru';
export const HH_REQUIRED_USER_AGENT_FORMAT = 'AppName/Version (contact@example.com)';