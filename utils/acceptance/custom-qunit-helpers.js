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

// assert.elementCount to assert.dom(selector).exists(count);
function transformAssertElementCount(j, code) {
  return j(code)
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
}

// assert.visible to assert.dom(selector).isVisible();
function transformAssertVisible(j, code) {
  return j(code)
    .find(j.CallExpression, {
      callee: {
        object: {
          name: 'assert',
        },
        property: {
          name: 'visible',
        },
      },
    })
    .forEach(path => {
      let selectorArg = [path.value.arguments[0]];
      let textArg = path.value.arguments[1] ? [path.value.arguments[1]] : [];
      let assertDomExpression = j.callExpression(
        j.memberExpression(j.identifier('assert'), j.identifier('dom')),
        selectorArg,
      );
      let isVisibleExpression = j.memberExpression(assertDomExpression, j.identifier('isVisible'));
      let wholeStatement = j.callExpression(isVisibleExpression, textArg);
      j(path).replaceWith(wholeStatement);
    })
    .toSource();
}

function transformAssertHasText(j, code) {
  return j(code)
    .find(j.CallExpression, {
      callee: {
        object: { name: 'assert' },
        property: { name: 'hasText' },
      },
    })
    .forEach(path => {
      let expectedText = path.value.arguments[0];
      let selectorArg = [path.value.arguments[1]];
      let failureMessage = path.value.arguments[2];
      let assertDomExpression = j.callExpression(
        j.memberExpression(j.identifier('assert'), j.identifier('dom')),
        selectorArg,
      );
      let hasTextExpression = j.memberExpression(assertDomExpression, j.identifier('hasText'));
      let hasTextArgs = failureMessage ? [expectedText, failureMessage] : [expectedText];
      let wholeStatement = j.callExpression(hasTextExpression, hasTextArgs);
      j(path).replaceWith(wholeStatement);
    })
    .toSource();
}

module.exports = {
  transformAssertCurrentRoute,
  transformAssertElementCount,
  transformAssertVisible,
  transformAssertHasText,
};
