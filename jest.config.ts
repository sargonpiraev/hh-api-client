import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  transform: { 
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }] 
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts', '!src/__tests__/**/*.ts'],
  coverageDirectory: 'coverage',
  reporters: ['default', 'jest-junit'],
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'cobertura'],
  testMatch: ['**/__tests__/**/*.test.ts'],
}

export default config
