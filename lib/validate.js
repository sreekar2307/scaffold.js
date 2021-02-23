'use strict';
const Ajv = require('ajv').default;
const schema = require('./schema');
const ajv = new Ajv({
  allErrors: true,
  meta: false,
  useDefaults: true,
  validateSchema: false,
  verbose: true,
});
require('ajv-errors')(ajv, { singleError: false });

module.exports = ajv.compile(schema);
