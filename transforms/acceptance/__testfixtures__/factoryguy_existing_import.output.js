import { setupApplicationTest } from 'ember-qunit';
import { make, setupFactoryGuy } from 'ember-data-factory-guy';

module('some module', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(function(hooks) {
    let model = make('my-model');
  });

  test('test', function(assert) {
    assert.ok('true');
  });
});
