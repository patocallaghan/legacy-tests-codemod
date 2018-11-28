import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('assert.elementCount', async function(assert) {
    await visit('/developer-signup');
    assert.dom(selectors.articleShow.table.userRows).exists({
      count: 10
    });
    assert.dom(selectors.articleShow.table.userRows).exists({
      count: 10
    }, 'some element');
  });
});
