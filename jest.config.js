module.exports = {
  testEnvironment: 'node',
  roots: ['./src'],
	preset: 'ts-jest',
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['text'],
  coverageThreshold: {
    global: {
      lines: 98
    }
  },
  silent: false,
  verbose: true,
};