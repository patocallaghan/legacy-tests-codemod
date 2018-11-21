const { getParser } = require('codemod-cli').jscodeshift;
const { exampleTransform } = require('../../utils/acceptance/example-transform');
const { replaceIdentifier } = require('../../utils/identifier');
const { removeImport, addImport } = require('../../utils/imports');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  let code = file.source;

  // =================
  // ADD TRANSFORMS HERE
  code = exampleTransform(j, code, 'embercom/tests/helpers/component-integration-testing');
  // =================

  // containerLookup to this.owner.lookup
  code = removeImport(j, code, 'embercom/lib/container-lookup');
  code = replaceIdentifier(j, code, 'containerLookup', 'this.owner.lookup');

  // import path for openSettingsMenu
  code = addImport(j, code, 'openSettingsMenu', 'embercom/tests/helpers/settings-menu');

  return code;
};
