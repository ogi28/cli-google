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
  },
  's': {
    alias: 'searchWith',
    describe: 'The search engine to use',
    type: 'string',
    choices: ['google', 'bing', 'duckduckgo']
  },
  'p': {
    alias: 'private',
    describe: 'Use private mode',
    type: 'boolean',
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
const privateFlag = {
  google: "--incognito",
  opera: "--private",
  firefox: "--private-window",
  chromium: "--incognito"
}

const browser = cp.spawn('xdg-settings get default-web-browser', [], { shell: true });

browser.stdout.on('data', (data) => {
  data = data.toString().trim();
  let browserName = argv.browser || data.substring(0, data.indexOf('.')).toLowerCase();
  const searchWith = argv.searchWith || 'google';
  const query = argv._.join('\\ ');
  //for browsers with more than one word for its name
  for (const key in browserExecutable) {
    if (browserName.startsWith(key)) {
      browserName = browserExecutable[key];
      break;
    }
  }
  if (argv.private) {
    console.log("Opening in private mode");
    cp.exec(`${browserExecutable[browserName]} ${privateFlag[browserName]} ${searchEngine[searchWith]}${query}`)
  }
  else if (!argv.private) cp.exec(`${browserExecutable[browserName]} ${searchEngine[searchWith]}${query}`)
})
