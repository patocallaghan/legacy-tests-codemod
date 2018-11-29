const { addImport } = require('../imports');

// eg. assert.dom(selector).someDomAssertion(..args);
function domAssertionExpression(j, selector, domAssertionName, args) {
  let assertDomExpression = j.callExpression(
    j.memberExpression(j.identifier('assert'), j.identifier('dom')),
    [selector],
  );

  let domAssertionMemberExpression = j.memberExpression(
    assertDomExpression,
    j.identifier(domAssertionName),
  );

  return j.callExpression(domAssertionMemberExpression, args);
}

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
        object: { name: 'assert' },
        property: { name: 'elementCount' },
      },
    })
    .forEach(path => {
      let selector = path.value.arguments[0];
      let countProperty = j.property('init', j.identifier('count'), path.value.arguments[1]);
      let additionalArgs = path.value.arguments.slice(2);

      j(path).replaceWith(
        domAssertionExpression(j, selector, 'exists', [
          j.objectExpression([countProperty]),
          ...additionalArgs,
        ]),
      );
    })
    .toSource();
}

// assert.visible to assert.dom(selector).isVisible();
function transformAssertVisible(j, code) {
  return j(code)
    .find(j.CallExpression, {
      callee: {
        object: { name: 'assert' },
        property: { name: 'visible' },
      },
    })
    .forEach(path => {
      let selector = path.value.arguments[0];
      let textArg = path.value.arguments[1] ? [path.value.arguments[1]] : [];
      j(path).replaceWith(domAssertionExpression(j, selector, 'isVisible', textArg));
    })
    .toSource();
}

// assert.hasText to assert.dom(...).hasText(..
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
      let selector = path.value.arguments[1];
      let failureMessage = path.value.arguments[2];
      let hasTextArgs = failureMessage ? [expectedText, failureMessage] : [expectedText];
      j(path).replaceWith(domAssertionExpression(j, selector, 'hasText', hasTextArgs));
    })
    .toSource();
}

// assert.notPresent to assert.dom(...).doesNotExist(...
function transformAssertNotPresent(j, code) {
  return j(code)
    .find(j.CallExpression, {
      callee: {
        object: { name: 'assert' },
        property: { name: 'notPresent' },
      },
    })
    .forEach(path => {
      let selector = path.value.arguments[0];
      let failureMessageArg = path.value.arguments[1] ? [path.value.arguments[1]] : [];
      j(path).replaceWith(domAssertionExpression(j, selector, 'doesNotExist', failureMessageArg));
    })
    .toSource();
}

module.exports = {
  domAssertionExpression,
  transformAssertCurrentRoute,
  transformAssertElementCount,
  transformAssertVisible,
  transformAssertHasText,
  transformAssertNotPresent,
};
