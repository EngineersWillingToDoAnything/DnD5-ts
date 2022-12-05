/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from 'jest';

const config: Config = {
  coverageThreshold: {
    global: {
      lines: 100
    }
  },
  preset: 'ts-jest',       // A preset that is used as a base for Jest's configuration
  // verbose: true,           // Indicates whether each individual test should be reported during the run
};

export default config;