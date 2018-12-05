import {
  test,
  componentIntegrationTest,
} from 'embercom/tests/helpers/legacy/component-integration-testing';

module('Team Messages | Component | campaigns/user-list', function(hooks) {
  setupTest(hooks);

  function renderComponent(surroundingContext, options = {}) {
    surroundingContext.render(TEMPLATE);
  }

  test('it renders the correct no-users content', function(assert) {
    renderComponent(this);
  });
});
