import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('findWithAssert', async function(assert) {
    await visit('/developer-signup');
    let $someEl = find(selector);
  });
});
