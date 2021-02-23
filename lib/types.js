'use strict';
const { configTokens } = require('./tokens');

class Type {
  constructor(position, kwargs) {
    configTokens.forEach(token => (this[token] = undefined));
    this._position = position;
    Object.assign(this, kwargs);
  }
}

class PrimitiveType extends Type {
  constructor(position, kwargs) {
    super(position, kwargs);
  }
}

class CustomType extends Type {
  constructor(position, kwargs) {
    super(position, kwargs);
  }
}
module.exports = {
  CustomType,
  PrimitiveType,
};
