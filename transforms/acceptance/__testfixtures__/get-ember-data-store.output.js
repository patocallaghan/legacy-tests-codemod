import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('getEmberDataStore', async function(assert) {
    await visit('/some/url');
    let store = this.owner.lookup('service:store');
    let message = this.owner.lookup('service:store').peekRecord('message', 1);
  });
});
