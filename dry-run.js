/* eslint no-debugger:0 */

const { test } = require('./src');

debugger;

setTimeout(() => {
  test();
}, 10000);
