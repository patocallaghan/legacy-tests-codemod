import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import {
  test,
  componentIntegrationTest,
} from 'embercom/tests/helpers/legacy/component-integration-testing';

module("Team Messages | Component | message-editor/title/header-component", function(hooks) {
  setupRenderingTest(hooks);

  test('A message with a folder', async function(assert) {
    await renderComponent(this, { message });
  });

});
