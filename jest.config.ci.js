module.exports = {
    ...require('./jest.config'),
    coverageReporters: ['text-lcov'],
    reporters: [
        ['jest-junit', {outputDirectory: 'reports/jest', outputName: 'results.xml'}],
        ['jest-silent-reporter', {useDots: true}],
    ],
};
