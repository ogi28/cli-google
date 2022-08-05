'use strict';

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

export const argv = yargs(hideBin(process.argv)).options({
  'b': {
    alias: 'browser',
    describe: 'The browser to use',
    type: 'string',
    choices: ['chrome', 'firefox', 'chromium', 'opera', 'safari'],
  },
  's': {
    alias: 'searchWith',
    describe: 'The search engine to use',
    type: 'string',
    choices: ['google', 'bing', 'ddg', 'ud', 'wiki', 'walmart']
  },
  'p': {
    alias: 'private',
    describe: 'Use private mode',
    type: 'boolean',
  }
}).argv;

