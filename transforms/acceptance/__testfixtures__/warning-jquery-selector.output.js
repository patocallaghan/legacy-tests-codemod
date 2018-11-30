import { setupApplicationTest } from 'ember-qunit';
import { find, click } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  let selectors = {
    regularSelector: '.another-class',
    //TEST MIGRATION HINT: Refactor jQuery-specific selectors, e.g. `:first`, `:contains()`, `:eq()`, as these are not valid when using helpers from `@ember/test-helpers`. Query the element differently or use an ember-test-selector instead
    someSelector: '.some-class:contains("Text")',
    title: 'tr:first-child td:first-child a span',
    heading: 'tr:last-child',
  };

  test('jquery selector', async function(assert) {
    //TEST MIGRATION HINT: Refactor jQuery-specific selectors, e.g. `:first`, `:contains()`, `:eq()`, as these are not valid when using helpers from `@ember/test-helpers`. Query the element differently or use an ember-test-selector instead
    let $someEl = find('.specific-item:eq(4)');
    //TEST MIGRATION HINT: Refactor jQuery-specific selectors, e.g. `:first`, `:contains()`, `:eq()`, as these are not valid when using helpers from `@ember/test-helpers`. Query the element differently or use an ember-test-selector instead
    let $otherEl = find(`${selectors.regularSelector}:last`);
    //TEST MIGRATION HINT: Refactor jQuery-specific selectors, e.g. `:first`, `:contains()`, `:eq()`, as these are not valid when using helpers from `@ember/test-helpers`. Query the element differently or use an ember-test-selector instead
    click(':visible');
    //TEST MIGRATION HINT: Refactor jQuery-specific selectors, e.g. `:first`, `:contains()`, `:eq()`, as these are not valid when using helpers from `@ember/test-helpers`. Query the element differently or use an ember-test-selector instead
    click(find('.specific-item:first'));
    click(selectors.regularSelector);
  });
});
