import { setupApplicationTest } from 'ember-qunit';
import { openSettingsMenu } from "embercom/tests/helpers/settings-menu";
import { visit } from '@ember/test-helpers';

module('some module', function (hooks) {
  setupApplicationTest(hooks);

  test('test', async function (assert) {
    visit('/some/route');
    await openSettingsMenu();
  });
});
