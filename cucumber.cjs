const common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require src/support/**/*.ts',
  '--require features/step_definitions/**/*.ts',
  '--format progress',
].join(' ');

module.exports = { default: common };
