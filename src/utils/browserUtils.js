'use strict';

import cp from 'child_process'
import { argv } from '../args.js'
import { browserExecutable } from '../consts.js'

export function getBrowser() {
  return argv.browser ? browserExecutable[argv.browser] : {
    linux: getLinuxDefaultBrowser,
    darwin: getMacDefaultBrowser
  }[process.platform]();
}

function getLinuxDefaultBrowser() {
  const browser = cp.spawn('xdg-settings get default-web-browser', [], { shell: true });
  return new Promise(resolve => {
    browser.stdout.on('data', data => {
      data = data.toString().trim();
      resolve(data.substring(0, data.indexOf('.')));
    })
  })
}

//TODO : check the return value of this function
function getMacDefaultBrowser() {
  const browser = cp.spawn(`plutil -p ~/Library/Preferences/com.apple.LaunchServices/com.apple.launchservices.secure.plist | grep 'https' -b3 |awk 'NR==3 {split($4, arr, "\""); print arr[2]}'`, [], { shell: true });
  return new Promise(resolve => {
    browser.stdout.on('data', data => {
      data = data.toString().trim();
      resolve(data); // TODO is here
    })
  })
}
