import { setupApplicationTest } from 'ember-qunit';
import { visit, click } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('findWithAssert', async function(assert) {
    await visit('/developer-signup');
    // TEST MIGRATION TIP: Remove all uses of `findWithAssert`. We can't codemod this as it can return one or many elements. Use `find` for a single element or `findAll` (from @ember/test-helpers) if you are retrieving multiple elements
    let $someEl = findWithAssert(selector);
    // TEST MIGRATION TIP: Remove all uses of `findWithAssert`. We can't codemod this as it can return one or many elements. Use `find` for a single element or `findAll` (from @ember/test-helpers) if you are retrieving multiple elements
    click(findWithAssert(selector));
  });
});
