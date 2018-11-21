import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { getEmberDataStore } from 'embercom/lib/container-lookup';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('getEmberDataStore', async function(assert) {
    await visit('/some/url');
    let store = getEmberDataStore();
    let message = getEmberDataStore().peekRecord('message', 1);
  });
});
