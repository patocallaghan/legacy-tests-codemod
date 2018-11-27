const { addImport, removeSpecificImport } = require('./imports');
const { findExpressionStatementCallExpression } = require('./function');

function setupFactoryGuy(j, code, testType) {
  if (j(code).find(j.Literal, { value: 'ember-data-factory-guy' }).length) {
    code = addImport(j, code, 'setupFactoryGuy', 'ember-data-factory-guy');
    code = removeSpecificImport(j, code, 'manualSetup');
    code = findExpressionStatementCallExpression(j, code, 'manualSetup')
      .remove()
      .toSource();
    code = findExpressionStatementCallExpression(j, code, 'setupFactoryGuy')
      .remove()
      .toSource();
    return j(code)
      .find(j.ExpressionStatement, {
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: testType,
          },
        },
      })
      .forEach(path => {
        // hacky way to avoid https://github.com/facebook/jscodeshift/issues/185
        j(path).replaceWith(
          j.expressionStatement(j.identifier(`${testType}(hooks);\nsetupFactoryGuy(hooks)`)),
        );
      })
      .toSource();
  }
  return code;
}

module.exports = {
  setupFactoryGuy,
};
