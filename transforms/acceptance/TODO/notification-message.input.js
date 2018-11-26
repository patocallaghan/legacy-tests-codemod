import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('Visiting developer sign up tracks an event', async function(assert) {
    await visit('/developer-signup');
    await expectNotificationMessage(
      assert,
      async function() {
        await click(selectors.saveNameOrEmail);
      },
      'Your settings were successfully updated',
    );
  });
});
