import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module("Team Messages | Component | campaigns/user-list", function(hooks) {
  setupRenderingTest(hooks);

  function renderComponent(surroundingContext, options = {}) {
    return render(TEMPLATE);
  }

  test('it renders the correct no-users content', function(assert) {
    renderComponent(this);
  });
});
