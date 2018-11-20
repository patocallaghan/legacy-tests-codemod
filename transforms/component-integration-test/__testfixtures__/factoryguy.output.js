import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy } from 'ember-data-factory-guy';

module('some module', function(hook) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('test', function(assert) {
    assert.ok('true');
  });
});
