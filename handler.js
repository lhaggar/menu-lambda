// eslint-disable no-console
const { run } = require('./src');

module.exports.run = (event, context, callback) => {
  run(event.slackUrl)
    .then(() => callback())
    .catch(err => callback(err));
};
