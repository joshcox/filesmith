module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleDirectories: ['src', 'node_modules'],
    rootDir: 'src',
    testRegex: '.spec.ts$',
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: '../coverage',
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 0,
      },
    },
    testEnvironment: 'node',
  };