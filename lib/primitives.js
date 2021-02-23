'use strict';
const random = require('./random');

const primitivesToFuncMap = {
  boolean: [random.general.boolean],
  date: [random.general.date],
  float: [random.general.float],
  id: [random.general.uniqueId],
  number: [random.general.integer],
  string: [random.lorem.word],
  text: [random.lorem.text, 10],
};

module.exports = {
  primitiveTypes: new Set(Object.keys(primitivesToFuncMap)),
  primitivesToFuncMap,
};
