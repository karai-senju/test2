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
  '10^21': '1e+21',
  '0.0000001': '1e-7',
  '1e+21+1': '1e+21',
  '1e-7*2': '2e-7',
  '2.5e-7': '2.5e-7',
  '1e5': '100000',
  '1.5e3-500': '1000',
  '50%': '0.5',
  '200*10%': '20',
  '(50)%': '0.5',
  '-50%': '-0.5',
  '2(3)': '6',
  '(1+1)(2+2)': '8',
  '(2)3': '6',
  '-2(3)': '-6',
  '1+2(3)': '7',
  '6/2(3)': '9',
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
  '(-8)^(1/3)': 'Undefined result',
  'e5': 'Invalid input',
  '2e': 'Invalid input',
  '1e': 'Invalid input',
  '1e+': 'Invalid input',
  '%': 'Invalid input',
  '5%%': 'Invalid input',
  '1.2.3': 'Invalid input',
  '1e5.5': 'Invalid input',
  '50%(2)': 'Invalid input',
};
for (const [input, msg] of Object.entries(errors)) assert.throws(() => evaluate(input), { message: msg }, input);

console.log('all tests passed');
