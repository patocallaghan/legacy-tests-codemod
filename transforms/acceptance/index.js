const { getParser } = require('codemod-cli').jscodeshift;
const { exampleTransform } = require('../../utils/acceptance/example-transform');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  let code = file.source;

  // =================
  // ADD TRANSFORMS HERE
  code = exampleTransform(j, code, 'embercom/tests/helpers/component-integration-testing');
  // =================
  return code;
};
