var config = require('./jest.config')
config.testMatch= [
  "**/tests/**/integration/**/*.[jt]s?(x)",
  "**.integration.[jt]s?(x)",
],
config.displayName= "integration",
console.log('RUNNING INTEGRATION TESTS');
module.exports = config
