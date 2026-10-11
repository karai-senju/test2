// Run: node test.js
const assert = require('assert');
const { evaluate, format } = require('./calc.js');

const calc = (s) => format(evaluate(s));
const cases = {
  '1+2*3': '7',
  '(1+2)*3': '9',
  '10/4': '2.5',
  '2^3^2': '512',
  '-2^2': '-4',
  '(-2)^2': '4',
  '3--2': '5',
  '0.1+0.2': '0.3',
  '.5*4': '2',
  '7 × 6 ÷ 2 − 1': '20',
};
for (const [input, want] of Object.entries(cases)) assert.strictEqual(calc(input), want, input);

const errors = {
  '1/0': 'Cannot divide by zero',
  '1/(2-2)': 'Cannot divide by zero',
  '': 'Invalid input',
  '2+': 'Invalid input',
  '(1+2': 'Missing )',
  '1+2)': 'Invalid input',
  'alert(1)': 'Invalid input',
  '1..2': 'Invalid input',
  '10^400': 'Result out of range',
};
for (const [input, msg] of Object.entries(errors)) assert.throws(() => evaluate(input), { message: msg }, input);

console.log('all tests passed');
