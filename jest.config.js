/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // Only look for tests inside the /api subtree
  roots: ['<rootDir>/src/api'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }]
  },
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  collectCoverage: true,
  // Only collect coverage for API sources
  collectCoverageFrom: ['src/api/**/*.ts', '!src/api/**/__tests__/**'],
  coverageDirectory: 'coverage'
};
