'use strict';
const TypeGenerators = require('./type-generators');
const _isPlainObject = require('lodash.isplainobject');
const { OptionsError } = require('./errors');

const defaultOptions = {
  hasManyMax: 10,
  hasManyMin: 0,
  schema: {
    types: {},
  },
};

function scaffold(options) {
  if (!_isPlainObject(options)) {
    throw new OptionsError(
      `\u001b[31m options must be a plain old javascript object with your types config\u001b[0m`
    );
  }
  options.hasManyMin = options.hasManyMin || defaultOptions.hasManyMin;
  options.hasManyMax =
    options.hasManyMax || options.hasManyMin + defaultOptions.hasManyMax;
  if (options.hasManyMin > options.hasManyMax) {
    throw new OptionsError(
      `\u001b[31m option hasManyMin must be lesser than or equal to hasManyMax\u001b[0m`
    );
  }
  return new TypeGenerators(options);
}

module.exports = scaffold;
