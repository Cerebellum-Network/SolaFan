const testEnv = process.env.TEST_ENV || 'local';

const baseUrl =
  testEnv === 'local'
    ? 'http://localhost:3004'
    : testEnv === 'prod'
    ? 'https://client-davinci.network.aws.cere.io'
    : `https://client-davinci-${testEnv}.network-${testEnv === 'stg' ? 'stage' : testEnv}.aws.cere.io`;

module.exports = {baseUrl, testEnv};
