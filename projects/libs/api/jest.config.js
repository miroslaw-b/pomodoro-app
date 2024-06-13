module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'],
  moduleDirectories: ['node_modules', 'dist'],
};
