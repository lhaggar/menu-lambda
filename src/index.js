/* eslint-disable no-console */
const { isWeekend } = require('./utils');
const { getContent } = require('./get-content');
const { buildPayload } = require('./slack');

const MAX_ERROR_BODY_LENGTH = 500;

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
  getPayload(date).then(async payload => {
    console.log('Posting payload:', JSON.stringify(payload, null, 2));
    const response = await global.fetch(slackUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const responseBody = await response.text();

    if (!response.ok) {
      const detail = responseBody
        ? `: ${responseBody.slice(0, MAX_ERROR_BODY_LENGTH)}`
        : '';
      throw new Error(
        `Slack request failed with HTTP ${response.status}${detail}`,
      );
    }

    return response;
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
