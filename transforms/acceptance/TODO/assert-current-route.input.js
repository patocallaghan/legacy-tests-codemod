import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.currentRoute', async function(assert) {
    await visit('/developer-signup');
    assert.currentRoute('apps.app.billing.details.index');
    assert.currentRoute('apps.app.billing.details.index', 'some message');
  });
});
