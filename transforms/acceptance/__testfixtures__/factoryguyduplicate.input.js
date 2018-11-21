import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy, manualSetup } from 'ember-data-factory-guy';

module('some module', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(function() {
    manualSetup(this);
  });

  test('test', function(assert) {
    assert.ok('true');
  });
});
