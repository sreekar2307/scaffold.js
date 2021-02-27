'use strict';

const words = [
  'adipiscing',
  'aenean',
  'aliquam',
  'aliquet',
  'amet',
  'ante',
  'arcu',
  'commodo',
  'congue',
  'consectetur',
  'convallis',
  'cras',
  'dignissim',
  'dolor',
  'donec',
  'duis',
  'egestas',
  'eget',
  'eleifend',
  'elementum',
  'elit',
  'enim',
  'est',
  'etiam',
  'ex',
  'facilisis',
  'faucibus',
  'felis',
  'fermentum',
  'fusce',
  'hendrerit',
  'iaculis',
  'id',
  'imperdiet',
  'in',
  'ipsum',
  'lacus',
  'laoreet',
  'lectus',
  'leo',
  'libero',
  'lorem',
  'massa',
  'mauris',
  'maximus',
  'nec',
  'nibh',
  'nisi',
  'non',
  'nunc',
  'odio',
  'orci',
  'ornare',
  'pellentesque',
  'pharetra',
  'placerat',
  'porttitor',
  'quam',
  'quis',
  'quisque',
  'sapien',
  'scelerisque',
  'sed',
  'sem',
  'sit',
  'sollicitudin',
  'tempor',
  'tincidunt',
  'ullamcorper',
  'ut',
  'varius',
  'vehicula',
  'vel',
  'vestibulum',
  'vitae',
  'volutpat',
];

function lorem(random) {
  this.word = function () {
    let index = random.general.integer(words.length);
    return words[index];
  };
  this.words = function (num) {
    if (typeof num === 'undefined') num = random.general.integer(1, 10);
    let _words = [];
    for (let i = 0; i < num; i++) {
      _words.push(random.lorem.word());
    }
    return _words;
  };
  this.text = function (length) {
    if (typeof length === 'undefined') length = random.general.integer(1, 10);
    let words = random.lorem.words(length);
    let sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };
}

module.exports = lorem;
