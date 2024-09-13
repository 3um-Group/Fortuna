export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Use TypeScript setup if needed
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Alias for easy imports from src
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript files
    },
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', // Custom regex to find test files in the /test/ folder
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Supported file extensions
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/index.tsx', // Exclude index.tsx from coverage
      '!src/**/*.d.ts',
    ],
    coverageDirectory: 'coverage', // Directory for coverage reports
    testPathIgnorePatterns: ['/node_modules/', '/test/test-utils.tsx'],

  };
  