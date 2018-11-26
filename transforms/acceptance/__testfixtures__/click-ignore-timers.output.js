import { click } from "@ember/test-helpers";
import { setupApplicationTest } from 'ember-qunit';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('clickIgnoreTimers', async function(assert) {
    await click(selector);
  });
});
