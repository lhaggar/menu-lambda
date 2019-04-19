/* eslint import/no-dynamic-require: 0 no-console:0 */

const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const { getContent } = require('../src/get-content');

const cafeFixturePath = '../fixtures/cafe-menu-html';
const mainFixturePath = '../fixtures/main-menu-html';

const cafeFixture = require(cafeFixturePath);
const mainFixture = require(mainFixturePath);

const pushAndWrite = (fixture, content, fixturePath) => {
  fixture.push(content);
  const filePath = path.join(__dirname, `${fixturePath}.json`);
  console.log('Saving updated file: ', filePath);
  return promisify(fs.writeFile)(filePath, JSON.stringify(fixture, null, 2));
};

(async () => {
  const html = await getContent(new Date(), false);
  await pushAndWrite(cafeFixture, html.cafeMenuContent, cafeFixturePath);
  await pushAndWrite(mainFixture, html.mainMenuContent, mainFixturePath);
})().then(
  () => {
    console.log('DONE!');
  },
  e => {
    console.log('🚨 Error!! 🚨', e.stack);
  },
);
