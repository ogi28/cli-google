#!/usr/bin/env node
'use strict';

import cp from 'child_process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

const argv = yargs(hideBin(process.argv)).options({
  'b': {
    alias: 'browser',
    describe: 'The browser to use',
    choices: ['chrome', 'firefox', 'chromium', 'opera'],
    // type: 'string',
  },
  's': {
    alias: 'searchWith',
    describe: 'The search engine to use',
    type: 'string',
    choices: ['google', 'bing', 'duckduckgo']
  }
}).argv;

const browserExecutable = {
  google: "google-chrome-stable",
  opera: "opera",
  firefox: "firefox",
  chromium: "chromium"
}

const searchEngine = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q='
}

const browser = cp.spawn('xdg-settings get default-web-browser', [], { shell: true });

browser.stdout.on('data', (data) => {
  data = data.toString().trim();
  const browserName = argv.browser || data.substring(0, data.indexOf('.')).toLowerCase();
  const searchWith = argv.searchWith || 'google';
  const query = argv._.join('\\ ');
  cp.exec(`${browserExecutable[browserName]} ${searchEngine[searchWith]}${query}`)
})
