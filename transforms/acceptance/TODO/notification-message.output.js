import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import {
  assertSuccessNotification,
  setupNotificationsService,
} from 'embercom/tests/helpers/services/notifications';

module('some module', function(hooks) {
  setupApplicationTest(hooks);
  setupNotificationsService(hooks);

  test('Visiting developer sign up tracks an event', async function(assert) {
    await visit('/developer-signup');
    await click(selectors.saveNameOrEmail);
    //TEST MIGRATION HINT: If the notification isn't a success notification try `assertErrorNotification` or `assertWarningNotification` instead
    assertSuccessNotification(assert, 'Your settings were successfully updated');
  });
});
