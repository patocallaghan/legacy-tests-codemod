function removeEmptyBlock(j, code) {
  return j(code)
    .find(j.ExpressionStatement, {
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'hooks',
          },
        },
      },
    })
    .forEach(path => {
      if (path.value.expression && path.value.expression.arguments[0].body.body.length === 0) {
        j(path).remove();
      }
    })
    .toSource();
}

function findRunFunctions(j, code) {
  return j(code).find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: {
        name: 'run',
      },
    },
  });
}

module.exports = {
  removeEmptyBlock,
  findRunFunctions,
};
