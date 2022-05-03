#!/usr/bin/env node
'use strict';

import cp from 'child_process';
import p from 'process';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

const argv = yargs(hideBin(p.argv)).options({
  'b': {
    alias: 'browser',
    describe: 'The browser to use',
    choices: ['chrome', 'google-chrome', 'google-chrome-stable', 'firefox', 'mozilla', 'ff', 'mozilla-firefox', 'chromium', 'opera'],
    // type: 'string',
  },
  's': {
    alias: 'searchWith',
    describe: 'The search engine to use',
    type: 'string',
    choices: ['google', 'bing', 'duckduckgo', 'ddg']
  }
}).argv;


const browser = cp.spawn('xdg-settings get default-web-browser', [], { shell: true });
browser.stdout.on('data', (data) => {
  const browserInput = argv.browser ? argv.browser.toLowerCase() : undefined;
  const query = argv._.join('\\ ');

  let browserName;

  switch (browserInput) {
    case 'google-chrome':
    case 'chrome':
    case 'google-chrome-stable':
      browserName = 'google-chrome-stable';
      break;
    case 'mozilla':
    case 'ff':
    case 'mozilla-firefox':
    case 'firefox':
      browserName = 'firefox';
      break;
    case 'opera':
      browserName = 'opera';
      break;
    case 'chromium':
      browserName = 'chromium';
      break;
    default:
      browserName = data.toString().substring(0, data.toString().indexOf('.')).toLowerCase();
  }
  if (browserName === 'google-chrome') {
    browserName = 'google-chrome-stable';
  }

  const searchEngineInput = argv.searchWith ? argv.searchWith.toLowerCase() : undefined;
  let searchEngine;

  switch (searchEngineInput) {
    case 'duckduckgo':
    case 'ddg':
      searchEngine = 'https://duckduckgo.com/?q=';
      break;
    case 'bing':
      searchEngine = 'https://www.bing.com/search?q=';
      break;
    default:
      searchEngine = 'https://www.google.com/search?q=';
  }

  cp.exec(`${browserName} ${searchEngine}${query}`, (err, _, stderr) => {
    if (err) {
      console.error(`Error : ${err}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
  });
});

