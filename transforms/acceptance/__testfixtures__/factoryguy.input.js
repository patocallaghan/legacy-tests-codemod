import { setupApplicationTest } from 'ember-qunit';
import { make } from 'ember-data-factory-guy';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('test', function(assert) {
    assert.ok('true');
  });
});
