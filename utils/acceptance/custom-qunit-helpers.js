const { addImport } = require('../imports');

// assert.currentRoute to assert.equal(currentRouteName(), ...)
function transformAssertCurrentRoute(j, code) {
  let internalCode = code;
  let exists;
  internalCode = j(internalCode)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'assert',
        },
        property: {
          name: 'currentRoute',
        },
      },
    })
    .forEach(path => {
      exists = true;
      let currentRouteNameCall = j.callExpression(j.identifier('currentRouteName'), []);
      let argsForAssertEqual = [currentRouteNameCall, ...path.value.arguments];
      let assertEqualExpression = j.memberExpression(j.identifier('assert'), j.identifier('equal'));
      let replacementExpression = j.callExpression(assertEqualExpression, argsForAssertEqual);
      j(path).replaceWith(replacementExpression);
    })
    .toSource();
  if (exists) {
    internalCode = addImport(j, internalCode, 'currentRouteName', '@ember/test-helpers');
  }
  return internalCode;
}

module.exports = {
  transformAssertCurrentRoute,
};
