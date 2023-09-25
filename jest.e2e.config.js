var config = require('./jest.config')
config.testMatch= [
  "**/tests/**/e2e/**/*.[jt]s?(x)",
  "**.e2e.[jt]s?(x)",
],
config.displayName= "e2e",
console.log('RUNNING E2E TESTS');
module.exports = config
