import { setupApplicationTest } from 'ember-qunit';
import { find, visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('find', async function(assert) {
    await visit('/developer-signup');
    let $someEl = find(selector);
  });
});
