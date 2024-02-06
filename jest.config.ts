export default {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/test/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/mock/mocks/fileMock.js',
    '\\.(css)$': '<rootDir>/mock/mocks/styleMock.js',
  },
};
