import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import Admin from 'embercom/models/admin';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('find', async function(assert) {
    await visit('/developer-signup');
    let $someEl = find(selector);
    Admin.find(1);
  });
});
