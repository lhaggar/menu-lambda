const { GetParameterCommand, SSMClient } = require('@aws-sdk/client-ssm');

const PARAMETER_ENV_BY_DESTINATION = {
  main: 'SLACK_MAIN_PARAMETER_NAME',
  presend: 'SLACK_PRESEND_PARAMETER_NAME',
};

const client = new SSMClient({});

const getSlackUrl = destination => {
  const envName = PARAMETER_ENV_BY_DESTINATION[destination];

  if (!envName) {
    return Promise.reject(new Error(`Unknown destination: ${destination}`));
  }

  const parameterName = process.env[envName];

  if (!parameterName) {
    return Promise.reject(
      new Error(`Missing environment variable: ${envName}`),
    );
  }

  return client
    .send(
      new GetParameterCommand({ Name: parameterName, WithDecryption: true }),
    )
    .then(result => {
      if (!result.Parameter || !result.Parameter.Value) {
        throw new Error(`Parameter has no value: ${envName}`);
      }

      return result.Parameter.Value;
    });
};

module.exports = {
  getSlackUrl,
};
