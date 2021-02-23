'use strict';

const FUNC = '_func';
const NAME = '_name';
const TYPE = '_type';
const configTokens = new Set(
  ['belongsTo', 'func', 'hasMany', 'name', 'type'].map(token => `_${token}`)
);
const relationalTokens = new Set(['hasMany'].map(token => `_${token}`));

module.exports = {
  FUNC,
  NAME,
  TYPE,
  configTokens,
  relationalTokens,
};
