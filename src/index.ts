import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Базовые типы данных для HeadHunter API
export interface Area {
  id: string;
  name: string;
  parent_id?: string;
  areas?: Area[];
}

export interface ProfessionalRole {
  id: string;
  name: string;
}

export interface MetroStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  line: MetroLine;
}

export interface MetroLine {
  id: string;
  name: string;
  hex_color: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface Industry {
  id: string;
  name: string;
  industries?: Industry[];
}

export interface EducationalInstitution {
  id: string;
  name: string;
  acronym?: string;
  site?: string;
  area: Area;
}

export interface Faculty {
  id: string;
  name: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Dictionary {
  currency?: DictionaryItem[];
  employment?: DictionaryItem[];
  schedule?: DictionaryItem[];
  experience?: DictionaryItem[];
  education_level?: DictionaryItem[];
  [key: string]: DictionaryItem[] | undefined;
}

export interface DictionaryItem {
  id: string;
  name: string;
}

// Конфигурация клиента
export interface HeadHunterClientConfig {
  baseURL?: string;
  timeout?: number;
  userAgent?: string;
}

// Основной класс HeadHunter API клиента
export class HeadHunterClient {
  private client: AxiosInstance;

  constructor(config: HeadHunterClientConfig = {}) {
    this.client = axios.create({
      baseURL: config.baseURL || 'https://api.hh.ru',
      timeout: config.timeout || 10000,
      headers: {
        'User-Agent': config.userAgent || 'HH-API-Client/1.0.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  // СПРАВОЧНИКИ (DICTIONARIES)

  /**
   * Получение справочника регионов
   * @returns Список регионов
   */
  async getAreas(): Promise<Area[]> {
    const response: AxiosResponse<Area[]> = await this.client.get('/areas');
    return response.data;
  }

  /**
   * Получение конкретного региона по ID
   * @param areaId ID региона
   * @returns Информация о регионе
   */
  async getArea(areaId: string): Promise<Area> {
    const response: AxiosResponse<Area> = await this.client.get(`/areas/${areaId}`);
    return response.data;
  }

  /**
   * Получение справочника профессиональных ролей
   * @returns Список профессиональных ролей
   */
  async getProfessionalRoles(): Promise<ProfessionalRole[]> {
    const response: AxiosResponse<ProfessionalRole[]> = await this.client.get('/professional_roles');
    return response.data;
  }

  /**
   * Получение станций метро для указанного города
   * @param cityId ID города
   * @returns Список станций метро
   */
  async getMetroStations(cityId: string): Promise<MetroStation[]> {
    const response: AxiosResponse<MetroStation[]> = await this.client.get(`/metro/${cityId}`);
    return response.data;
  }

  /**
   * Получение всех станций метро
   * @returns Объект со станциями метро по городам
   */
  async getAllMetroStations(): Promise<{ [cityId: string]: MetroStation[] }> {
    const response: AxiosResponse<{ [cityId: string]: MetroStation[] }> = await this.client.get('/metro');
    return response.data;
  }

  /**
   * Получение справочника языков
   * @returns Список языков
   */
  async getLanguages(): Promise<Language[]> {
    const response: AxiosResponse<Language[]> = await this.client.get('/languages');
    return response.data;
  }

  /**
   * Получение справочника отраслей компаний
   * @returns Список отраслей
   */
  async getIndustries(): Promise<Industry[]> {
    const response: AxiosResponse<Industry[]> = await this.client.get('/industries');
    return response.data;
  }

  /**
   * Получение справочника учебных заведений
   * @param areaId ID региона (опционально)
   * @param text Текст для поиска (опционально)
   * @returns Список учебных заведений
   */
  async getEducationalInstitutions(areaId?: string, text?: string): Promise<EducationalInstitution[]> {
    const params = new URLSearchParams();
    if (areaId) params.append('area', areaId);
    if (text) params.append('text', text);
    
    const url = `/educational_institutions${params.toString() ? `?${params.toString()}` : ''}`;
    const response: AxiosResponse<EducationalInstitution[]> = await this.client.get(url);
    return response.data;
  }

  /**
   * Получение факультетов учебного заведения
   * @param institutionId ID учебного заведения
   * @returns Список факультетов
   */
  async getFaculties(institutionId: string): Promise<Faculty[]> {
    const response: AxiosResponse<Faculty[]> = await this.client.get(`/educational_institutions/${institutionId}/faculties`);
    return response.data;
  }

  /**
   * Получение справочника ключевых навыков
   * @returns Список ключевых навыков
   */
  async getSkills(): Promise<Skill[]> {
    const response: AxiosResponse<Skill[]> = await this.client.get('/skills');
    return response.data;
  }

  /**
   * Получение всех справочников
   * @returns Объект со всеми справочниками
   */
  async getDictionaries(): Promise<Dictionary> {
    const response: AxiosResponse<Dictionary> = await this.client.get('/dictionaries');
    return response.data;
  }

  /**
   * Получение справочника валют
   * @returns Список валют
   */
  async getCurrencies(): Promise<DictionaryItem[]> {
    const response: AxiosResponse<Dictionary> = await this.client.get('/dictionaries');
    return response.data.currency || [];
  }

  /**
   * Получение справочника типов занятости
   * @returns Список типов занятости
   */
  async getEmploymentTypes(): Promise<DictionaryItem[]> {
    const response: AxiosResponse<Dictionary> = await this.client.get('/dictionaries');
    return response.data.employment || [];
  }

  /**
   * Получение справочника графиков работы
   * @returns Список графиков работы
   */
  async getScheduleTypes(): Promise<DictionaryItem[]> {
    const response: AxiosResponse<Dictionary> = await this.client.get('/dictionaries');
    return response.data.schedule || [];
  }

  /**
   * Получение справочника опыта работы
   * @returns Список вариантов опыта работы
   */
  async getExperienceTypes(): Promise<DictionaryItem[]> {
    const response: AxiosResponse<Dictionary> = await this.client.get('/dictionaries');
    return response.data.experience || [];
  }

  /**
   * Получение справочника типов образования
   * @returns Список типов образования
   */
  async getEducationLevels(): Promise<DictionaryItem[]> {
    const response: AxiosResponse<Dictionary> = await this.client.get('/dictionaries');
    return response.data.education_level || [];
  }

  // УТИЛИТАРНЫЕ МЕТОДЫ

  /**
   * Выполнение произвольного GET запроса к API
   * @param endpoint Эндпоинт API
   * @param params Параметры запроса
   * @returns Ответ API
   */
  async get<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(endpoint, { params });
    return response.data;
  }

  /**
   * Получение информации о статусе API
   * @returns Статус API
   */
  async getApiStatus(): Promise<any> {
    const response: AxiosResponse<any> = await this.client.get('/');
    return response.data;
  }
}

// Экспорт для удобного использования
export default HeadHunterClient;