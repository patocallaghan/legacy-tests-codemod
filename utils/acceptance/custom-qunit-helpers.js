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

function transformAssertElementCount(j, code) {
  let internalCode = code;
  let exists;
  internalCode = j(internalCode)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'assert',
        },
        property: {
          name: 'elementCount',
        },
      },
    })
    .forEach(path => {
      exists = true;
      let selectorArg = path.value.arguments[0];
      let countProperty = j.property('init', j.identifier('count'), path.value.arguments[1]);
      let additionalArgs = path.value.arguments.slice(2);
      let assertDomExpression = j.memberExpression(j.identifier('assert'), j.identifier('dom'));
      let selectorExpression = j.callExpression(assertDomExpression, [selectorArg]);
      let existsExpression = j.memberExpression(selectorExpression, j.identifier('exists'));
      let wholeStatement = j.callExpression(existsExpression, [
        j.objectExpression([countProperty]),
        ...additionalArgs,
      ]);
      j(path).replaceWith(wholeStatement);
    })
    .toSource();
  return internalCode;
}

module.exports = {
  transformAssertCurrentRoute,
  transformAssertElementCount,
};
