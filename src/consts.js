'use strict';

export const browserExecutable = {
  chrome: "google-chrome-stable",
  opera: "opera",
  firefox: "firefox",
  chromium: "chromium"
}

export const privateFlag = {
  'google-chrome-stable': "--incognito",
  opera: "--private",
  firefox: "--private-window",
  chromium: "--incognito"
}

export const searchEngineURL = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  ddg: 'https://duckduckgo.com/?q=',
  ud: 'https://www.urbandictionary.com/define.php?term=',
  wiki: 'https://en.wikipedia.org/w/index.php?search=',
  walmart: 'https://www.walmart.ca/search?q='
}
