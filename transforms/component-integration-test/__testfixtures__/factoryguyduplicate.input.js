import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, manualSetup } from 'ember-data-factory-guy';

module('some module', function(hook) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(function() {
    manualSetup(this);
  });

  test('test', function(assert) {
    assert.ok('true');
  });
});
