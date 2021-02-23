'use strict';
const TypeGenerators = require('./type-generators');
const _isPlainObject = require('lodash.isplainobject');

const defaultOptions = {
  hasManyMax: 10,
  hasManyMin: 1,
  schema: { types: {} },
};
function scaffold(options) {
  if (!_isPlainObject(options)) {
    throw new TypeError(
      `\u001b[31m options must be a plain old javascript object with your types config\u001b[0m`
    );
  }
  return new TypeGenerators(Object.assign(defaultOptions, options));
}

module.exports = scaffold;
