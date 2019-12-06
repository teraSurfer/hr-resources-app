module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  modulePathIgnorePatterns: ["amplify"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
}
