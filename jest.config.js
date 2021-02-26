module.exports = {
    rootDir: './',
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/src/**/*.spec.ts'],
    collectCoverageFrom: ['**/src/**/*.{ts,js}', '!**/src/**/*.spec.{ts,js}', '!**/node_modules/**'],
    collectCoverage: true,
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
};
