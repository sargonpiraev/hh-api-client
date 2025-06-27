# HeadHunter API Client

A TypeScript client for the HeadHunter API, generated from the official OpenAPI specification.

## Features

- 🔥 **TypeScript first** - Full type safety with generated types
- 🚀 **Modern SDK** - Built with `@hey-api/openapi-ts`
- 📝 **Complete API coverage** - All HeadHunter API endpoints
- 🛡️ **Built-in validation** - Request/response validation
- 🎯 **Tree-shakeable** - Import only what you need
- 📚 **Well documented** - JSDoc comments for all methods

## Installation

```bash
npm install hh-api-client
```

## Quick Start

```typescript
import { createHeadHunterClient, getVacancies, getAreas, type GetVacanciesData } from 'hh-api-client'

// Create a configured client
const client = createHeadHunterClient({
  userAgent: 'MyApp/1.0.0 (contact@example.com)',
  accessToken: 'your-access-token', // optional
})

// Search for vacancies
const searchParams: GetVacanciesData = {
  query: {
    text: 'JavaScript developer',
    area: '1', // Moscow
    per_page: 50,
  },
}

const vacancies = await getVacancies({
  client,
  ...searchParams,
})

console.log(`Found ${vacancies.data.found} vacancies`)

// Get dictionaries
const areas = await getAreas({ client })
console.log('Available areas:', areas.data)
```

## Usage Examples

### Search Vacancies

```typescript
import { getVacancies, type GetVacanciesData } from 'hh-api-client'

const searchParams: GetVacanciesData = {
  query: {
    text: 'Frontend Developer',
    area: '1', // Moscow
    professional_role: '96', // Developer role
    experience: 'between1And3',
    employment: 'full',
    schedule: 'remote',
    salary_from: 100000,
    currency: 'RUR',
    only_with_salary: true,
  },
}

const result = await getVacancies({ client, ...searchParams })
```

### Get Vacancy Details

```typescript
import { getVacancy } from 'hh-api-client'

const vacancy = await getVacancy({
  client,
  path: { vacancy_id: '12345' },
})

console.log(vacancy.data.name)
console.log(vacancy.data.description)
```

### Apply to Vacancy

```typescript
import { applyToVacancy } from 'hh-api-client'

await applyToVacancy({
  client,
  path: { vacancy_id: '12345' },
  body: {
    resume_id: 'resume-id',
    message: 'I am interested in this position...',
  },
})
```

### Work with Dictionaries

```typescript
import { getAreas, getIndustries, getSkills, getProfessionalRolesDictionary } from 'hh-api-client'

// Get all areas (cities/regions)
const areas = await getAreas({ client })

// Get industries
const industries = await getIndustries({ client })

// Get skills
const skills = await getSkills({ client })

// Get professional roles
const roles = await getProfessionalRolesDictionary({ client })
```

### User Information

```typescript
import { getCurrentUserInfo, editCurrentUserInfo } from 'hh-api-client'

// Get current user info
const user = await getCurrentUserInfo({ client })

// Update user info
await editCurrentUserInfo({
  client,
  body: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
  },
})
```

## Configuration

### Required User-Agent

HeadHunter API requires a specific User-Agent format:

```
ApplicationName/Version (contact@example.com)
```

Example:

```typescript
const client = createHeadHunterClient({
  userAgent: 'JobSearchApp/1.0.0 (support@jobsearch.com)',
})
```

### Authentication

For protected endpoints, provide an access token:

```typescript
const client = createHeadHunterClient({
  userAgent: 'MyApp/1.0.0 (contact@example.com)',
  accessToken: 'your-oauth-token',
})
```

### Custom Base URL

For testing or custom environments:

```typescript
const client = createHeadHunterClient({
  userAgent: 'MyApp/1.0.0 (contact@example.com)',
  baseURL: 'https://api.hh.ru', // default
})
```

## API Reference

### Most Used Functions

- `getVacancies()` - Search vacancies
- `getVacancy()` - Get vacancy details
- `getAreas()` - Get areas/cities
- `getIndustries()` - Get industries
- `getCurrentUserInfo()` - Get user info
- `applyToVacancy()` - Apply to vacancy

### All Available Functions

The client exports all generated SDK functions. See the [HeadHunter API documentation](https://api.hh.ru/openapi/redoc) for complete reference.

```typescript
// Import everything
import * as HHApi from 'hh-api-client'

// Or import specific functions
import {
  getVacancies,
  getNegotiations,
  createResume,
  // ... etc
} from 'hh-api-client'
```

## TypeScript Support

Full TypeScript support with generated types:

```typescript
import type { GetVacanciesData, GetVacanciesResponses, Vacancy, Area, Industry } from 'hh-api-client'

const handleVacancy = (vacancy: Vacancy) => {
  console.log(vacancy.name)
  console.log(vacancy.salary?.from)
}
```

## Error Handling

```typescript
try {
  const result = await getVacancies({ client, query: { text: 'Developer' } })
  console.log(result.data)
} catch (error) {
  if (error.status === 400) {
    console.error('Bad request:', error.data)
  } else if (error.status === 403) {
    console.error('Forbidden:', error.data)
  } else {
    console.error('Unexpected error:', error)
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Generate types from OpenAPI spec
npm run openapi-ts

# Build
npm run build

# Test
npm run test

# Lint
npm run lint
```

## License

MIT
