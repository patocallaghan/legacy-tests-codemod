import { setupApplicationTest } from 'ember-qunit';
import { visit, click, fillIn } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('andThenIgnoreTimers', async function(assert) {
    await visit('/developer-signup');
    await click(selector);
    partResolvers.create.shift().resolve({ blocks: [{ type: 'paragraph', text: 'oh hai' }] });
    await fillIn(selector);
    assert.dom('.conversation__bubble.o__admin-note.o__not-persisted').doesNotExist();
    assert.dom('.conversation__bubble.o__admin-note').exists({ count: 2 });
  });
});
