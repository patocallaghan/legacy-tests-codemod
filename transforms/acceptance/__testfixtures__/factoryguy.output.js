import { setupApplicationTest } from 'ember-qunit';
import { setupFactoryGuy } from 'ember-data-factory-guy';

module('some module', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  test('test', function(assert) {
    assert.ok('true');
  });
});
