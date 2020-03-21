/* eslint no-debugger:0 */

const { test } = require('./src');

setTimeout(() => {
  test();
}, 10000);
