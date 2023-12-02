export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    globals: {
        fetch: global.fetch,
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest"
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    },
}