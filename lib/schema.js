'use strict';
let { primitiveTypes } = require('./primitives');
primitiveTypes = [...primitiveTypes.values()];

module.exports = {
  additionalProperties: {
    errorMessage: 'extra property ${0#} is not allowed',
    not: true,
  },
  definitions: {
    arrayOfString: {
      items: {
        type: 'string',
      },
      type: 'array',
    },
    classSchema: {
      additionalProperties: {
        oneOf: [
          { $ref: '#/definitions/fieldSchemaWithFunc' },
          { $ref: '#/definitions/fieldSchemaAsObject' },
          {
            type: 'string',
          },
        ],
      },
      properties: {
        _hasMany: {
          oneOf: [
            { $ref: '#/definitions/arrayOfString' },
            { $ref: '#/definitions/keyValuePairs' },
            {
              type: 'string',
            },
          ],
        },
      },
      type: 'object',
    },
    fieldSchemaAsObject: {
      additionalProperties: {
        errorMessage:
          'extra property ${0#} is not allowed here when a _type property is already given',
        not: true,
      },
      errorMessage: {
        required: {
          _type: `_type should have value as string or any one of [${primitiveTypes}] given "\${/_type}"`,
        },
      },
      properties: {
        _type: {
          type: 'string',
        },
      },
      required: ['_type'],
      type: 'object',
    },
    fieldSchemaWithFunc: {
      additionalProperties: {
        errorMessage:
          'extra property ${0#} is not allowed here when a _func property is already given',
        not: true,
      },
      errorMessage: {
        required: {
          _func:
            '_func should be of type array with 1st argument as function reference given "${/_func}"',
        },
      },
      properties: {
        _func: {
          minItems: 1,
          type: 'array',
        },
      },
      required: ['_func'],
      type: 'object',
    },
    keyValuePairs: {
      additionalProperties: {
        type: 'string',
      },
      type: 'object',
    },
  },
  errorMessage: {
    required: {
      types:
        'Types property on configuration object is required and must be a plain old javascript object',
    },
    type: 'schema must be a plain old javascript object',
  },
  properties: {
    types: {
      additionalProperties: {
        $ref: '#/definitions/classSchema',
      },
      type: 'object',
    },
  },
  required: ['types'],
  type: 'object',
};
