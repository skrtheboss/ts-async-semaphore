module.exports = {
    ...require('./jest.config'),
    coverageReporters: ['json'],
    reporters: [
        ['jest-junit', {output: 'reports/junit/js-test-results.xml'}],
        ['jest-silent-reporter', {useDots: true}],
    ],
};
