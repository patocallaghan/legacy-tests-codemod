import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { find, click, render } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupRenderingTest(hooks);

  let selectors = {
    regularSelector: '.another-class',
    someSelector: '.some-class:contains("Text")',
    title: 'tr:first-child td:first-child a span',
    heading: 'tr:last-child',
  };

  test('jquery selector', async function(assert) {
    let $someEl = find('.specific-item:eq(4)');
    let $otherEl = find(`${selectors.regularSelector}:last`);
    click(':visible');
    click(find('.specific-item:first'));
    click(selectors.regularSelector);
  });
});
