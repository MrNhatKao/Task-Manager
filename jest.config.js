module.exports = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Set the test environment to Node.js
  testMatch: ['**/__tests__/**/*.test.ts'], // Specify the test file patterns
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize these file extensions
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', // Path to your tsconfig.json
    },
  },
};
