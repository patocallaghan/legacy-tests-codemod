import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import {
  assertNoErrorNotification,
  setupNotificationsService,
} from 'embercom/tests/helpers/services/notifications';

module('some module', function(hooks) {
  setupApplicationTest(hooks);
  setupNotificationsService(hooks);

  test('Visiting developer sign up tracks an event', async function(assert) {
    await visit('/developer-signup');
    assertNoErrorNotification(assert);
  });
});
