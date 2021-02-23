'use strict';

const Parser = require('./parser');
const random = require('./random');
const { ParseError } = require('./errors');
const { CustomType, PrimitiveType } = require('./types');
const { FUNC, NAME, TYPE, relationalTokens } = require('./tokens');
const { primitivesToFuncMap, primitiveTypes } = require('./primitives');

/*
  for a custom type func should return a random values to the primitive type
  whereas return a func for has_one and has_many types
 */

function TypeGenerators(options) {
  const parser = new Parser(options);

  options.hasManyMax = options.hasManyMax || 10;
  Object.values(parser.types).forEach(Type => {
    Object.defineProperty(this, Type[NAME], {
      configurable: false,
      enumerable: true,
      get: function cb() {
        return generate.bind(null, Type);
      },
    });
  });

  function generateRelationalType(Type) {
    const noOfElements = random.general.integer(1, options.hasManyMax);
    const values = [];
    for (let i = 0; i < noOfElements; i++) {
      values.push(generate(parser.types[Type[TYPE]]));
    }
    return values;
  }

  function createPrimitiveFunction(Type) {
    if (Array.isArray(Type[FUNC])) {
      return prepareFunction(Type, [...Type[FUNC]]);
    }
    let primitiveToFunc = primitivesToFuncMap[Type[TYPE]];
    if (typeof primitiveToFunc === 'undefined')
      throw new ParseError(
        `\u001b[31mRequired any one of [${[...primitiveTypes]}] but given "${
          Type[TYPE]
        }" at ${Type._position}\u001b[0m`
      );

    let [func, params] = primitiveToFunc;

    if (typeof params === 'undefined') params = [];
    else if (!Array.isArray(params)) {
      params = [params];
    }
    return [func, params];
  }

  function generate(Type) {
    const serializer = {};
    for (const [field, fieldType] of Object.entries(Type)) {
      if (fieldType instanceof PrimitiveType) {
        const [func, params] = createPrimitiveFunction(fieldType);
        serializer[fieldType[NAME]] = func(...params);
      } else if (fieldType instanceof CustomType) {
        serializer[fieldType[NAME]] = generate.bind(
          null,
          parser.types[fieldType[TYPE]]
        );
      } else if (relationalTokens.has(field) && Type[field]) {
        Type[field].forEach(relationalType => {
          serializer[relationalType[NAME]] = generateRelationalType.bind(
            null,
            relationalType
          );
        });
      }
    }
    return serializer;
  }
}

function prepareFunction(Type, inputArray) {
  const func = inputArray.shift();
  if (typeof func !== 'function') {
    throw new ParseError(
      `\u001b[31m Check function definition given for FIELD: "${Type._position}" \u001b[0m`
    );
  }
  return [func, inputArray];
}

module.exports = TypeGenerators;
