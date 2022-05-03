#!/usr/bin/env node

import cp from 'child_process';
import p from 'process';

let browser = cp.spawn('xdg-settings get default-web-browser', [], { shell: true });

let argv = p.argv.slice(2);
let query = argv.join('\\ ');

browser.stdout.on('data', (data) => {
  let browserName = data.toString().substring(0, data.toString().indexOf('.'));
  cp.exec(`${browserName} https://www.google.com/search?q=${query}`, (err, _, stderr) => {
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


