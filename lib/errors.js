'use strict';

const ERR_INVALID_CONFIG_OBJECT = 'ERR_INVALID_CONFIG_OBJECT';

class ParseError extends Error {
  constructor(message) {
    super(message);
    this.code = ERR_INVALID_CONFIG_OBJECT;
  }
}
function parseAjvErrors(errors) {
  var messages = [];
  var i = 0;
  for (const err of errors) {
    let message = err.dataPath === '' ? '/' : err.dataPath;
    messages.push(`${++i}. ${err.message} at ${message}`);
  }
  return messages.join('\n');
}

module.exports = {
  ParseError,
  parseAjvErrors,
};
