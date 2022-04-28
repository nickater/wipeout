#!/usr/bin/env node

import os from 'os';
import fs from 'fs/promises';
import { emptyDir } from 'fs-extra';
import inquirer from 'inquirer';

const wipeout = async (dir) => {
  return await emptyDir(dir);
};

const done = () => {
  console.log('All done');
};

const main = async () => {
  const { directory } = await inquirer.prompt({
    name: 'directory',
    type: 'list',
    choices: [
      {
        name: 'desktop',
      },
      {
        name: 'downloads',
      },
    ],
  });

  switch (directory) {
    case 'desktop': {
      const homeDir = os.homedir();
      await wipeout(`${homeDir}/Desktop`);
      break;
    }
    case 'downloads':
      await wipeout(`${os.homedir}/Downloads`, done);
      break;
    default:
      console.log("Can't wipe that one out");
      break;
  }
};

main();
