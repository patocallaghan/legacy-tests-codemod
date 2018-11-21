import { setupApplicationTest } from 'ember-qunit';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('clickIgnoreTimers', function(assert) {
    clickIgnoreTimers(selector);
  });
});
