'use strict';
const Lorem = require('./lorem');

var Random = function () {
  this.helpers = new Helpers();
  this.lorem = new Lorem(this);
  this.general = new General(this);
};

var General = function (random) {
  var idCounter = 1;
  const booleans = [true, false];
  this.integer = function (arg1, arg2) {
    var [min, max] = random.helpers.setArgsForNumbers(arg1, arg2);
    return min + Math.floor((max - min) * Math.random());
  };
  this.uniqueId = function () {
    return idCounter++;
  };
  this.date = function () {
    var year = 365 * 24 * 60 * 60;
    var dateNow = +Date.now();
    return new Date(dateNow + random.general.integer(-year, year));
  };
  this.boolean = function () {
    return booleans[random.general.integer(0, booleans.length)];
  };
  this.float = function (arg1, arg2) {
    var [min, max] = random.helpers.setArgsForNumbers(arg1, arg2);
    return min + (max - min) * Math.random();
  };
};

var Helpers = function () {
  this.setArgsForNumbers = function (arg1, arg2) {
    if (typeof arg1 === 'undefined' && typeof arg2 === 'undefined') {
      arg1 = 0;
      arg2 = 10000;
    } else if (typeof arg2 === 'undefined') {
      arg2 = arg1;
      arg1 = 0;
    }

    return [Math.min(arg1, arg2), Math.max(arg1, arg2)];
  };
};

module.exports = new Random();
