// const execa = require('execa').default;
import { execa } from 'execa';
import path from 'path';
import lodash from 'lodash';

import watch from 'watch';

const __dirname = path.resolve();
// const ohm = require('@ohm-js/cli/src/cli');
watch.watchTree(path.join(__dirname, './src/ohm/'), function (f, curr, prev) {
  // console.log(path.parse(f.toString()).name, '--');
  if (f && path.parse(f.toString()).name !== 'bks-template') {
    return;
  }
  runnderThrottle();

  // if (typeof f == 'object' && prev === null && curr === null) {
  //   // Finished walking the tree
  // } else if (prev === null) {
  //   // f is a new file
  //   runnderThrottle();
  // } else if (curr.nlink === 0) {
  //   // f was removed
  //   runnderThrottle();
  // } else {
  //   // f was changed
  // }
});
const runnder = async () => {
  const { stdout } = await execa('npm run inner-gen-ohm', [], {
    cwd: path.join(__dirname, './'),
    preferLocal: true,
  });
  console.log(stdout);
};
const runnderThrottle = lodash.throttle(runnder, 2000, {
});
runnderThrottle();
