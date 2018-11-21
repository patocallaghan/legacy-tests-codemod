import { setupApplicationTest } from 'ember-qunit';
import { visit, currentRouteName } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('containerLookup', async function(assert) {
    await visit('/developer-signup');
    let eventService = this.owner.lookup('service:realTimeEventService');
    let model = this.owner.lookup('controller:apps/app').get('model');
    let controller = this.owner.lookup(`controller:${currentRouteName()}`);
  });
});
