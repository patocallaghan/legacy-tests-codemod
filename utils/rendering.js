function getRenderingCollection(j, code) {
  return j(code).find(j.ExpressionStatement, {
    expression: {
      type: 'CallExpression',
      callee: {
        property: {
          type: 'Identifier',
          name: 'render',
        },
      },
    },
  });
}

function replaceSurroundingContext(j, code) {
  return j(code)
    .find(j.ExpressionStatement, {
      expression: {
        type: 'AwaitExpression',
        argument: {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'surroundingContext',
            },
          },
        },
      },
    })
    .forEach(path => {
      j(path).replaceWith(
        j.returnStatement(
          j.callExpression(j.identifier('render'), path.value.expression.argument.arguments),
        ),
      );
    })
    .toSource();
}

module.exports = {
  getRenderingCollection,
  replaceSurroundingContext,
};
