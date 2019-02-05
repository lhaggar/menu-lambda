/* eslint-disable no-console */
const got = require('got');

const { getContent } = require('./get-content');
const { buildPayload } = require('./slack');

const run = slackUrl =>
  getContent()
    .then(content => buildPayload(new Date(), content))
    .then(payload => {
      console.log('Posting payload:', JSON.stringify(payload, null, 2));
      return got(slackUrl, { method: 'POST', body: JSON.stringify(payload) });
    });

const test = () =>
  getContent()
    .then(content => buildPayload(new Date(), content))
    .then(payload => {
      console.log(
        'Slack payload (not posting):',
        JSON.stringify(payload, null, 2),
      );
    });

module.exports = {
  run,
  test,
};
