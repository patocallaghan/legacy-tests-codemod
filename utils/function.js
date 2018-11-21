const { addImport } = require('./imports');

function hasFunctionCalled(j, code, functionName) {
  return findExpressionStatementCallExpression(j, code, functionName).length;
}

function findExpressionStatementCallExpression(j, code, functionName) {
  return j(code).find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: functionName,
      },
    },
  });
}

function findCallExpression(j, code, functionName) {
  return j(code).find(j.CallExpression, {
      callee: {
        type: 'Identifier',
        name: functionName,
      },
    });
}

function replaceContextualFunctionWithExplicitlyImportedFunction(
  j,
  code,
  functionName,
  functionArguments,
  importSource,
) {
  var code = j(code)
    .find(j.ExpressionStatement, {
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'ThisExpression',
          },
          property: {
            name: functionName,
          },
        },
      },
    })
    .forEach(path => {
      j(path).replaceWith(
        j.expressionStatement(j.callExpression(j.identifier(functionName), functionArguments)),
      );
    })
    .toSource();
  if (j(code).find(j.Identifier, { name: functionName }).length) {
    code = addImport(j, code, functionName, importSource);
  }
  return code;
}

module.exports = {
  hasFunctionCalled,
  findCallExpression,
  findExpressionStatementCallExpression,
  replaceContextualFunctionWithExplicitlyImportedFunction,
};
