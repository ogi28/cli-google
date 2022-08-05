#!/usr/bin/env node
'use strict';

import { argv } from '../src/args.js';
import { getBrowser } from '../src/utils/browserUtils.js';
import { getSearchEngine, buildSearchURL, performSearch } from '../src/utils/searchUtils.js';

async function main() {
  const query = argv._.join('\\ ');
  const browser = await getBrowser();
  const searchEngine = getSearchEngine();
  const URL = buildSearchURL(searchEngine, query);

  performSearch(browser, URL);
}

main();
