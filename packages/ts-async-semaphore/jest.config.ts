/* eslint-disable */
export default {
    displayName: 'ts-async-semaphore',
    preset: '../../jest.preset.js',
    globals: {},
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
            },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/packages/ts-async-semaphore',
    testEnvironment: 'node',
};
