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