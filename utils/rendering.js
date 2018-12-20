function removeRenderWrapping(j, code, runFunctions) {
  return runFunctions
    .forEach(path => {
      let runMethods = path.value.expression.arguments[0].body.body;
      if (runMethods === undefined) {
        return;
      }
      let rendersComponent = runMethods.some(method => {
        if ((method.type != 'ExpressionStatement') || !method.expression.callee) {
          return false;
        }

        if (method.expression.callee.type === 'MemberExpression') {
          return method.expression.callee.property.name.includes('render');
        } else {
          return method.expression.callee.name.includes('render');
        }
      });
      j(path).replaceWith(runMethods);
    })
    .toSource();
}

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
  removeRenderWrapping,
  getRenderingCollection,
  replaceSurroundingContext,
};
