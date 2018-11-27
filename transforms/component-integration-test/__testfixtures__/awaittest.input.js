import {
  test,
  componentIntegrationTest,
} from 'embercom/tests/helpers/legacy/component-integration-testing';

module("Team Messages | Component | message-editor/title/header-component", function(hooks) {
  setupTest(hooks);

  test('A message with a folder', function(assert) {
    renderComponent(this, { message });
  });

});
