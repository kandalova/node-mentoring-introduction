var config = require('./jest.config')
config.testMatch= [
  "**/tests/**/unit/**/*.[jt]s?(x)",
  "**.unit.[jt]s?(x)",
],
config.displayName= "unit",
console.log('RUNNING UNIT TESTS');
module.exports = config
