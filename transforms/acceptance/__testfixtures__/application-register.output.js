import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('test', async function(assert) {
    visit('/some/route');
    this.owner.register('service:mockPaywall', paywallServiceMock);

    this.owner.register('service:mockPermissionsService', permissionsServiceMock);
  });
});
