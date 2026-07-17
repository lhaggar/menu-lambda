/* eslint import/no-dynamic-require: 0 no-console:0 */

const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const { getContent } = require('../src/get-content');

const cafeFixturePath = '../fixtures/cafe-menu-html';
const mainFixturePath = '../fixtures/main-menu-html';

const cafeFixtures = require(cafeFixturePath);
const mainFixtures = require(mainFixturePath);

const writeFixtures = (fixtures, fixturePath) => {
  const filePath = path.join(__dirname, `${fixturePath}.json`);
  console.log('Saving updated file: ', filePath);
  return promisify(fs.writeFile)(filePath, JSON.stringify(fixtures, null, 2));
};

const addUnique = (fixtures, contents) => {
  const existing = new Set(fixtures);
  const additions = contents.filter(content => {
    if (!content || existing.has(content)) {
      return false;
    }
    existing.add(content);
    return true;
  });

  fixtures.push(...additions);
  return additions.length;
};

const getMonday = date => {
  const monday = new Date(date);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
};

(async () => {
  const monday = getMonday(new Date());
  const dates = Array.from({ length: 5 }, (_, offset) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + offset);
    return date;
  });
  const menus = await Promise.all(dates.map(date => getContent(date, false)));

  const mainAdded = addUnique(
    mainFixtures,
    menus.map(menu => menu.mainMenuContent),
  );
  const cafeAdded = addUnique(
    cafeFixtures,
    menus.map(menu => menu.cafeMenuContent),
  );

  if (mainAdded) {
    await writeFixtures(mainFixtures, mainFixturePath);
  }
  if (cafeAdded) {
    await writeFixtures(cafeFixtures, cafeFixturePath);
  }

  console.log(`DONE! Added ${mainAdded} main and ${cafeAdded} cafe fixtures.`);
})().catch(e => {
  console.error('🚨 Error!! 🚨', e.stack);
  process.exitCode = 1;
});
