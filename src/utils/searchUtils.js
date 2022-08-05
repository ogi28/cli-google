'use strict';

import cp from 'child_process'
import { argv } from '../args.js'
import { privateFlag, searchEngineURL } from '../consts.js'

export function getSearchEngine() {
  return argv.searchWith || 'google';
}

export function buildSearchURL(searchEngine, query) {
  return searchEngineURL[searchEngine] + query;
}

export function performSearch(browser, searchUrl) {
  const incognito = argv.private ? privateFlag[browser] : '';
  cp.exec(`${browser} ${incognito} ${searchUrl} `)
}
