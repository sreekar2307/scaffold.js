'use strict';
const validate = require('./validate');
const { CustomType, PrimitiveType } = require('./types');
const { primitiveTypes } = require('./primitives');
const { NAME, TYPE, relationalTokens, configTokens } = require('./tokens');
const { plural } = require('pluralize');
const { camelCase } = require('camel-case');
const _isPlainObject = require('lodash.isplainobject');
const { ParseError, parseAjvErrors } = require('./errors');

/* =================PARSER CLASS================= */

class Parser {
  constructor(options) {
    const schema = options.schema;
    if (!validate(schema)) {
      throw new ParseError(
        `\u001b[31m ${parseAjvErrors(validate.errors)}\u001b[0m`
      );
    }

    this._configFileTypes = schema.types;
    this.assignTypesToUserConfig();
    this.checkIfRelationalTypesAreValid();
  }

  assignTypesToUserConfig() {
    const typedefs = this._configFileTypes;
    this.types = {};

    /* =================ITERATING THROUGH CLASSES================= */

    for (const [klassName, klass] of Object.entries(typedefs)) {
      const klassType = this.createCustomType(klassName, {
        [NAME]: camelCase(klassName),
        [TYPE]: klassName,
      });
      this.types[klassName] = klassType;

      /* =================ITERATING THROUGH FIELDS OF A CLASS================= */

      for (let [fieldName, fieldValue] of Object.entries(klass)) {
        if (configTokens.has(fieldName)) {
          if (relationalTokens.has(fieldName)) {
            /* =================WHEN FIELD IS A RELATIONAL TOKEN================= */
            this.createRelationalType(fieldName, fieldValue, klassName);
          } else {
            throw new ParseError(
              `\u001b[31mCannot contain FIELD: "${fieldName}" on Class: "${klassName}"\u001b[0m`
            );
          }
        } else {
          if (typeof fieldValue === 'string') {
            klassType[fieldName] = this.createTypeFormTypeToken(
              fieldValue,
              `${klassName}::${fieldName}`,
              {
                [NAME]: camelCase(fieldName),
                [TYPE]: fieldValue,
              }
            );
          } else {
            // creating a primitive type
            klassType[fieldName] = this.createPrimitiveType(
              `${klassName}::${fieldName}`,
              {
                [NAME]: camelCase(fieldName),
                ...fieldValue,
              }
            );
          }
        }
      }
    }
  }

  createPrimitiveType(position, kwargs) {
    this.primitiveTypes = this.primitiveTypes || {};
    this.primitiveTypes[position] = new PrimitiveType(position, kwargs);
    return this.primitiveTypes[position];
  }

  createCustomType(position, kwargs) {
    this.customTypes = this.customTypes || {};
    this.customTypes[position] = new CustomType(position, kwargs);
    return this.customTypes[position];
  }

  createTypeFormTypeToken(token, position, kwargs) {
    if (primitiveTypes.has(token)) {
      return this.createPrimitiveType(position, kwargs);
    }
    return this.createCustomType(position, kwargs);
  }

  createRelationalType(fieldName, fieldValue, klassName) {
    const klassType = this.types[klassName];
    klassType[fieldName] = [];
    if (_isPlainObject(fieldValue)) {
      for (const [hasManyField, hasManyFieldValue] of Object.entries(
        fieldValue
      )) {
        klassType[fieldName].push(
          this.createCustomType(`${klassName}::${hasManyField}`, {
            [NAME]: plural(camelCase(hasManyField)),
            [TYPE]: hasManyFieldValue,
          })
        );
      }
    } else {
      if (!Array.isArray(fieldValue)) {
        fieldValue = [fieldValue];
      }
      fieldValue.forEach(hasManyValue => {
        klassType[fieldName].push(
          this.createCustomType(
            `${klassName}::${plural(camelCase(hasManyValue))}`,
            {
              [NAME]: plural(camelCase(hasManyValue)),
              [TYPE]: hasManyValue,
            }
          )
        );
      });
    }
  }

  checkIfRelationalTypesAreValid() {
    for (let [typePosition, klassDefinition] of Object.entries(
      this.customTypes
    )) {
      if (this.customTypes[klassDefinition[TYPE]] === undefined)
        throw new ParseError(
          `\u001b[31mCannot find TYPE: "${klassDefinition[TYPE]}" for FIELD: "${typePosition}"\u001b[0m`
        );
    }
  }
}

module.exports = Parser;
