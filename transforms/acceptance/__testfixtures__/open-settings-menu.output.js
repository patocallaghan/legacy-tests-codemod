import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { openSettingsMenu } from 'embercom/tests/helpers/settings-menu';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('test', async function(assert) {
    visit('/some/route');
    await openSettingsMenu();
  });
});
