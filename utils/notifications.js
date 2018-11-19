function getNotificationServiceFunctions(j, code) {
  return j(code)
    .find(j.ExpressionStatement, {
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          property: {
            type: 'Identifier',
          },
        },
      },
    })
    .filter(path => {
      return path.value.expression.callee.property.name.match(/assert.*Notification/) != null;
    });
}

module.exports = { getNotificationServiceFunctions };
