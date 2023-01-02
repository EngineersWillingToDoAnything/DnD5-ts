/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from 'jest';

const config: Config = {
  moduleNameMapper: {          // A map from regular expressions to module names easily
    '^@/errors/(.*)$': '<rootDir>/src/errors/$1',
  },
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  preset: 'ts-jest',       // A preset that is used as a base for Jest's configuration
  // verbose: true,           // Indicates whether each individual test should be reported during the run
};

export default config;