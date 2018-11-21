import { setupApplicationTest } from 'ember-qunit';
import { visit, currentRouteName } from '@ember/test-helpers';
import containerLookup from 'embercom/lib/container-lookup';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('containerLookup', async function(assert) {
    await visit('/developer-signup');
    let eventService = containerLookup('service:realTimeEventService');
    let model = containerLookup('controller:apps/app').get('model');
    let controller = containerLookup(`controller:${currentRouteName()}`);
  });
});
