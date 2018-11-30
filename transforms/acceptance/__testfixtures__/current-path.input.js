import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('currentPath', async function(assert) {
    await visit('/developer-signup');
    assert.equal(currentPath(), 'some.route');
  });
});
