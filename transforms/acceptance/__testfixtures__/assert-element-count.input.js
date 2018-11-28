import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.elementCount', async function(assert) {
    await visit('/developer-signup');
    assert.elementCount(selectors.articleShow.table.userRows, 10);
    assert.elementCount(selectors.articleShow.table.userRows, 10, 'some element');
  });
});
