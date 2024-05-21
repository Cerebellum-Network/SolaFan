const fs = require('fs');
const {resolveApp} = require('./utils');

if (!process.env.NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

const dotenv = resolveApp('.env');

const dotenvFiles = [
  `${dotenv}.${process.env.NODE_ENV}.local`,
  process.env.NODE_ENV !== 'test' && `${dotenv}.local`,
  `${dotenv}.${process.env.NODE_ENV}`,
  dotenv,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      }),
    );
  }
});
