export default {
  roots: ['<rootDir>/src'],

  clearMocks: true,

  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!**/protocols/**',
    '!**/usecases/**',
    '!**/entities/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  testEnvironment: 'node',

  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.spec.ts'],

  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
