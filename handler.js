// eslint-disable no-console
const { run } = require('./src');
const { getSlackUrl } = require('./src/parameters');

module.exports.run = event =>
  getSlackUrl(event.destination).then(slackUrl => run(slackUrl));
