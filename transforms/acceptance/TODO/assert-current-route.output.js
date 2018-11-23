import { setupApplicationTest } from 'ember-qunit';
import { visit, currentRouteName } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.currentRouteName', async function(assert) {
    await visit('/developer-signup');
    assert.equal(currentRouteName(), 'apps.app.billing.details.index');
    assert.equal(currentRouteName(), 'apps.app.billing.details.index', 'some message');
  });
});
