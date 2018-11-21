import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('test', async function(assert) {
    visit('/some/route');
    this.application.register('service:mockPaywall', paywallServiceMock);
    this.application.inject('route', 'paywallService', 'service:mockPaywall');
    this.application.inject('controller', 'paywallService', 'service:mockPaywall');
    this.application.inject('component', 'paywallService', 'service:mockPaywall');

    this.application.register('service:mockPermissionsService', permissionsServiceMock);
    this.application.inject('route', 'permissionsService', 'service:mockPermissionsService');
  });
});
