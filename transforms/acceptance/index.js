const { getParser } = require('codemod-cli').jscodeshift;
const { exampleTransform } = require('../../utils/acceptance/example-transform');
const { removeImport, addImport } = require('../../utils/imports');
const {
  findCallExpression,
  findExpressionStatementCallExpression,
} = require('../../utils/function');
const { replaceIdentifier } = require('../../utils/identifier');
const { replaceLiteral } = require('../../utils/literal');
const { trackingPageEventMigration } = require('./tracking_page_event_migration');
const { setupFactoryGuy } = require('../../utils/factoryguy');
const { removeEmptyBlock } = require('../../utils/general');
const { find, findWithAssert } = require('../../utils/acceptance/find');
const { warnjQuerySelector } = require('../../utils/warn-jquery-selector');
const { replaceConst } = require('../../utils/const');
const {
  transformAssertCurrentRoute,
  transformAssertElementCount,
  transformAssertVisible,
  transformAssertHasText,
  transformAssertNotPresent,
} = require('../../utils/acceptance/custom-qunit-helpers');

module.exports = function transformer(file, api) {
  const j = getParser(api);
  let code = file.source;

  // containerLookup to this.owner.lookup
  code = removeImport(j, code, 'embercom/lib/container-lookup');
  code = replaceIdentifier(j, code, 'containerLookup', 'this.owner.lookup');

  // fetching store
  code = removeImport(j, code, 'embercom/lib/container-lookup');
  code = findCallExpression(j, code, 'getEmberDataStore')
    .forEach(path => {
      j(path).replaceWith(j.identifier("this.owner.lookup('service:store')"));
    })
    .toSource();

  // addImport for openSettingsMenu
  if (j(code).find(j.Identifier, { name: 'openSettingsMenu' }).length) {
    code = addImport(j, code, 'openSettingsMenu', 'embercom/tests/helpers/settings-menu');
  }

  // register and inject helpers
  code = j(code)
    .find(j.MemberExpression, {
      object: {
        object: {
          type: 'ThisExpression',
        },
        property: {
          name: 'application',
        },
      },
    })
    .forEach(path => {
      if (path.value.property.name === 'register') {
        path.value.object.property.name = 'owner';
      } else if (path.value.property.name === 'inject') {
        j(path.parent).remove();
      }
    })
    .toSource();

  // click-ignore-timer to await click
  code = (internalCode => {
    let exists;
    internalCode = j(internalCode)
      .find(j.Identifier, { name: 'clickIgnoreTimers' })
      .forEach(path => {
        exists = true;
        j(path).replaceWith(j.identifier('await click'));
      })
      .closest(j.FunctionExpression)
      .forEach(path => {
        path.value.async = true;
      })
      .toSource();
    if (exists) {
      internalCode = addImport(j, internalCode, 'click', '@ember/test-helpers');
    }
    return internalCode;
  })(code);

  // track_page_events.input migration
  code = trackingPageEventMigration(j, code);

  // test helpers
  code = replaceIdentifier(j, code, 'keyEvent', 'triggerKeyEvent');
  code = replaceIdentifier(j, code, 'currentPath', 'currentRouteName');
  if (j(code).find(j.Identifier, { name: 'currentRouteName' }).length) {
    code = addImport(j, code, 'currentRouteName', '@ember/test-helpers');
  }
  code = j(code)
    .find(j.Literal, { value: 'ember-test-helpers' })
    .forEach(path => {
      j(path).replaceWith(j.literal('@ember/test-helpers'));
    })
    .toSource();
  j(code)
    .find(j.ImportDeclaration, { source: { value: 'ember-native-dom-helpers' } })
    .forEach(path => {
      path.value.specifiers.forEach(specifier => {
        code = addImport(j, code, specifier.local.name, '@ember/test-helpers');
      });
    })
    .toSource();
  code = removeImport(j, code, 'ember-native-dom-helpers');

  code = findExpressionStatementCallExpression(j, code, 'andThenIgnoreTimers')
    .forEach(path => {
      j(path).replaceWith(path.value.expression.arguments[0].body.body);
    })
    .toSource();

  // addImport for assertModalHeader
  if (j(code).find(j.Identifier, { name: 'assertModalHeader' }).length) {
    code = addImport(j, code, 'assertModalHeader', 'embercom/tests/helpers/modal');
  }

  // addImport for closeModal
  if (j(code).find(j.Identifier, { name: 'closeModal' }).length) {
    code = addImport(j, code, 'closeModal', 'embercom/tests/helpers/modal');
  }

  // migrate Custom QUnit helpers
  code = transformAssertCurrentRoute(j, code);
  code = transformAssertElementCount(j, code);
  code = transformAssertVisible(j, code);
  code = transformAssertHasText(j, code);
  code = transformAssertNotPresent(j, code);

  code = findWithAssert(j, code);
  code = find(j, code);

  // factory guy
  code = setupFactoryGuy(j, code, 'setupApplicationTest');

  // general
  code = removeEmptyBlock(j, code);
  code = replaceConst(j, code, 'SELECTORS');
  code = replaceLiteral(
    j,
    code,
    'embercom/tests/helpers/acceptance',
    'embercom/tests/helpers/container-helpers',
  );
  code = replaceLiteral(
    j,
    code,
    'embercom/tests/helpers/legacy/acceptance/articles/collections-helpers',
    'embercom/tests/helpers/app/educate/collections-helpers',
  );
  code = replaceLiteral(
    j,
    code,
    'embercom/tests/helpers/legacy/acceptance/async-helpers/acceptance',
    'embercom/tests/helpers/container-helpers',
  );

  code = warnjQuerySelector(j, code);

  return code;
};
