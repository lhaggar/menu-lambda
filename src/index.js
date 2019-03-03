/* eslint-disable no-console */
const got = require('got');

const { isWeekend } = require('./utils');
const { getContent } = require('./get-content');
const { buildPayload } = require('./slack');

const getPayload = date => {
  if (isWeekend(date)) {
    return Promise.reject(
      new Error(
        'Provided date is a weekend. Weekend menus not currently supported.',
      ),
    );
  }
  return getContent(date).then(content => buildPayload(date, content));
};

const run = (slackUrl, date = new Date()) =>
  getPayload(date).then(payload => {
    console.log('Posting payload:', JSON.stringify(payload, null, 2));
    return got(slackUrl, { method: 'POST', body: JSON.stringify(payload) });
  });

const test = (date = new Date()) =>
  getPayload(date).then(payload => {
    console.log(
      'Slack payload (not posting):',
      JSON.stringify(payload, null, 2),
    );
  });

module.exports = {
  run,
  test,
};
