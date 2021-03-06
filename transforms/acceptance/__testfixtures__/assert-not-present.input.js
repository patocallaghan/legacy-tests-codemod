import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.notPresent', async function(assert) {
    await visit('/developer-signup');
    assert.notPresent(selectors.banner.title);
    assert.notPresent(selectors.banner.title, 'message');
  });
});
