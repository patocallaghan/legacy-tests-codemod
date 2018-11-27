const { addImport, removeImport } = require('../../utils/imports');

function replaceEmberTestHelpers(j, code) {
  return (code = j(code)
    .find(j.Literal, { value: 'ember-test-helpers' })
    .forEach(path => {
      j(path).replaceWith(j.literal('@ember/test-helpers'));
    })
    .toSource());
}

function convertEmberTestHelpers(j, code) {
  code = j(code)
    .find(j.ImportDeclaration, { source: { value: 'ember-native-dom-helpers' } })
    .forEach(path => {
      path.value.specifiers.forEach(specifier => {
        code = addImport(j, code, specifier.local.name, '@ember/test-helpers');
      });
    })
    .toSource();
  return removeImport(j, code, 'ember-native-dom-helpers');
}

module.exports = { replaceEmberTestHelpers, convertEmberTestHelpers };
