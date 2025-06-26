# HeadHunter API Client

API-клиент для работы с HeadHunter API, специально разработанный для получения справочной информации. Построен на TypeScript с использованием Axios.

## Установка

```bash
npm install hh-api-client
```

## Быстрый старт

```typescript
import { HeadHunterClient } from 'hh-api-client';

// Создание экземпляра клиента
const client = new HeadHunterClient();

// Получение списка регионов
const areas = await client.getAreas();
console.log('Регионы:', areas);

// Получение профессиональных ролей
const roles = await client.getProfessionalRoles();
console.log('Профессиональные роли:', roles);
```

## Конфигурация

Вы можете настроить клиент при создании:

```typescript
const client = new HeadHunterClient({
  baseURL: 'https://api.hh.ru',           // Базовый URL API (по умолчанию)
  timeout: 10000,                         // Таймаут запросов в мс (по умолчанию)
  userAgent: 'MyApp/1.0.0 (email@example.com)' // User-Agent заголовок
});
```

## Доступные методы

### Регионы

#### `getAreas(): Promise<Area[]>`
Получение полного списка регионов с иерархической структурой.

```typescript
const areas = await client.getAreas();
// Вернет массив регионов с вложенными областями
```

#### `getArea(areaId: string): Promise<Area>`
Получение информации о конкретном регионе.

```typescript
const moscow = await client.getArea('1'); // Москва
```

### Профессиональные роли

#### `getProfessionalRoles(): Promise<ProfessionalRole[]>`
Получение списка всех профессиональных ролей.

```typescript
const roles = await client.getProfessionalRoles();
```

### Станции метро

#### `getMetroStations(cityId: string): Promise<MetroStation[]>`
Получение станций метро для конкретного города.

```typescript
const moscowMetro = await client.getMetroStations('1'); // Метро Москвы
```

#### `getAllMetroStations(): Promise<{ [cityId: string]: MetroStation[] }>`
Получение всех станций метро по городам.

```typescript
const allMetro = await client.getAllMetroStations();
```

### Языки

#### `getLanguages(): Promise<Language[]>`
Получение справочника языков.

```typescript
const languages = await client.getLanguages();
```

### Отрасли

#### `getIndustries(): Promise<Industry[]>`
Получение справочника отраслей компаний.

```typescript
const industries = await client.getIndustries();
```

### Учебные заведения

#### `getEducationalInstitutions(areaId?: string, text?: string): Promise<EducationalInstitution[]>`
Поиск учебных заведений с возможностью фильтрации по региону и тексту.

```typescript
// Все учебные заведения
const allInstitutions = await client.getEducationalInstitutions();

// Учебные заведения в Москве
const moscowInstitutions = await client.getEducationalInstitutions('1');

// Поиск по названию
const mguInstitutions = await client.getEducationalInstitutions(undefined, 'МГУ');
```

#### `getFaculties(institutionId: string): Promise<Faculty[]>`
Получение факультетов конкретного учебного заведения.

```typescript
const faculties = await client.getFaculties('39420');
```

### Навыки

#### `getSkills(): Promise<Skill[]>`
Получение справочника ключевых навыков.

```typescript
const skills = await client.getSkills();
```

### Справочники

#### `getDictionaries(): Promise<Dictionary>`
Получение всех справочников одним запросом.

```typescript
const dictionaries = await client.getDictionaries();
```

#### Специализированные методы для справочников:

- `getCurrencies(): Promise<DictionaryItem[]>` - валюты
- `getEmploymentTypes(): Promise<DictionaryItem[]>` - типы занятости  
- `getScheduleTypes(): Promise<DictionaryItem[]>` - графики работы
- `getExperienceTypes(): Promise<DictionaryItem[]>` - опыт работы
- `getEducationLevels(): Promise<DictionaryItem[]>` - уровни образования

```typescript
const currencies = await client.getCurrencies();
const employmentTypes = await client.getEmploymentTypes();
const schedules = await client.getScheduleTypes();
```

### Утилитарные методы

#### `get<T>(endpoint: string, params?: Record<string, any>): Promise<T>`
Выполнение произвольного GET запроса к API.

```typescript
const customData = await client.get('/custom-endpoint', { param1: 'value1' });
```

#### `getApiStatus(): Promise<any>`
Получение информации о статусе API.

```typescript
const status = await client.getApiStatus();
```

## Типы данных

Клиент предоставляет TypeScript типы для всех ответов API:

```typescript
interface Area {
  id: string;
  name: string;
  parent_id?: string;
  areas?: Area[];
}

interface ProfessionalRole {
  id: string;
  name: string;
}

interface MetroStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  line: MetroLine;
}

interface Language {
  id: string;
  name: string;
}

interface Industry {
  id: string;
  name: string;
  industries?: Industry[];
}

interface EducationalInstitution {
  id: string;
  name: string;
  acronym?: string;
  site?: string;
  area: Area;
}

interface Skill {
  id: string;
  name: string;
}

interface DictionaryItem {
  id: string;
  name: string;
}
```

## Примеры использования

### Поиск IT-компаний в Москве

```typescript
import { HeadHunterClient } from 'hh-api-client';

const client = new HeadHunterClient();

async function findITInMoscow() {
  // Получаем все отрасли
  const industries = await client.getIndustries();
  
  // Ищем IT отрасль
  const itIndustry = industries.find(industry => 
    industry.name.toLowerCase().includes('информационные технологии')
  );
  
  console.log('IT отрасль:', itIndustry);
  
  // Получаем информацию о Москве
  const moscow = await client.getArea('1');
  console.log('Регион:', moscow.name);
}
```

### Получение образовательной информации

```typescript
async function getEducationInfo() {
  // Получаем учебные заведения в Санкт-Петербурге
  const spbInstitutions = await client.getEducationalInstitutions('2');
  
  // Получаем уровни образования
  const educationLevels = await client.getEducationLevels();
  
  console.log(`Учебных заведений в СПб: ${spbInstitutions.length}`);
  console.log('Уровни образования:', educationLevels);
}
```

### Работа с метро

```typescript
async function getMetroInfo() {
  // Получаем все станции метро в Москве
  const moscowMetro = await client.getMetroStations('1');
  
  // Группируем по линиям
  const lineGroups = moscowMetro.reduce((acc, station) => {
    const lineName = station.line.name;
    if (!acc[lineName]) acc[lineName] = [];
    acc[lineName].push(station);
    return acc;
  }, {} as Record<string, typeof moscowMetro>);
  
  console.log('Линии метро:', Object.keys(lineGroups));
}
```

## Обработка ошибок

```typescript
try {
  const areas = await client.getAreas();
  console.log('Регионы получены:', areas.length);
} catch (error) {
  if (error.response) {
    // Ошибка ответа от сервера
    console.error('Статус:', error.response.status);
    console.error('Данные:', error.response.data);
  } else if (error.request) {
    // Запрос был отправлен, но ответ не получен
    console.error('Нет ответа от сервера');
  } else {
    // Ошибка настройки запроса
    console.error('Ошибка:', error.message);
  }
}
```

## Ограничения

- HeadHunter API имеет ограничения по количеству запросов в минуту
- Рекомендуется указывать корректный User-Agent в конфигурации
- Некоторые методы API могут требовать авторизации (в данном клиенте реализованы только публичные методы)

## Документация HeadHunter API

Полная документация доступна по адресу: https://github.com/hhru/api

## Лицензия

MIT

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки  
npm run dev

# Сборка
npm run build

# Линтинг
npm run lint

# Форматирование
npm run format

# Тесты
npm test
```