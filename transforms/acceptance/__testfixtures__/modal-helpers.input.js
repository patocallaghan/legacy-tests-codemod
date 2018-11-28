import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function (hooks) {
  setupApplicationTest(hooks);

  test('test', async function (assert) {
    visit('/some/route');
    await closeModal();
    assertModalHeader(assert, 'Delete Intercom workspace');
  });
});
