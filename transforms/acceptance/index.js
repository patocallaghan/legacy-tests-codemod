const { getParser } = require('codemod-cli').jscodeshift;
const { exampleTransform } = require('../../utils/acceptance/example-transform');
const {
  removeImport,
} = require('../../utils/imports');
const {
  findCallExpression,
} = require('../../utils/function');
const { replaceIdentifier } = require('../../utils/identifier');

export default function transformer(file, api) {
  const j = getParser(api);
  let code = file.source;

  // containerLookup to this.owner.lookup
  code = removeImport(j, code, 'embercom/lib/container-lookup');
  code = replaceIdentifier(j, code, 'containerLookup', 'this.owner.lookup');

  // fetching store
  code = removeImport(j, code, 'embercom/lib/container-lookup');
  code = findCallExpression(j, code, "getEmberDataStore")
    .forEach(path => {
      j(path).replaceWith(j.identifier("this.owner.lookup('service:store')"))
    })
    .toSource();



  return code;
};
