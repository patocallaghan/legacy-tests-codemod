import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import Admin from 'embercom/models/admin';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('find', async function(assert) {
    await visit('/developer-signup');
    //TEST MIGRATION HINT: You have an ambiguous use of `find` here. As you have not imported it you are using `window.find`. Instead you should import `find` to select a single element or `findAll` for multiple elements from `@ember/test-helpers`
    let $someEl = find(selector);
    Admin.find(1);
  });
});
