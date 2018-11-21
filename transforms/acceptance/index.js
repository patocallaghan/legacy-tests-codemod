const { getParser } = require('codemod-cli').jscodeshift;
const { exampleTransform } = require('../../utils/acceptance/example-transform');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  let code = file.source;

  // =================
  // ADD TRANSFORMS HERE
  code = exampleTransform(j, code, 'embercom/tests/helpers/component-integration-testing');
  code = j(file.source)
    .find(j.MemberExpression, {
      object: {
        object: {
          type: 'ThisExpression',
        },
        property: {
          name: 'application',
        },
      },
    })
    .forEach(path => {
      if (path.value.property.name === 'register') {
        path.value.object.property.name = 'owner';
      } else if (path.value.property.name === 'inject') {
        j(path.parent).remove();
      }
    })
    .toSource();
  // =================
  return code;
};
