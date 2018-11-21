import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('findWithAssert', async function(assert) {
    await visit('/developer-signup');
    // TEST MIGRATION TIP: You have an ambiguous use of `find` here. As you have not imported it you are using `window.find`. You should import `find`, to select a single element or `findAll`, for multiple elements from `@ember/test-helpers`
    let $someEl = find(selector);
  });
});
