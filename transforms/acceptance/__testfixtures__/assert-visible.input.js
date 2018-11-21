import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.visible', async function(assert) {
    await visit('/developer-signup');
    assert.visible(selectors.articleShow.table.userRows);
    assert.visible(selectors.articleShow.table.userRows, 'some element');
  });
});
