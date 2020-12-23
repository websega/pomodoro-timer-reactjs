/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const resources = [
  'utils/_variables.scss',
  'utils/_functions.scss',
  'utils/_mixins.scss',
];

module.exports = resources.map((file) => path.resolve(__dirname, file));
