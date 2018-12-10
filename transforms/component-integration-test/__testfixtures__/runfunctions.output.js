import { setupRenderingTest } from 'ember-qunit';
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
import { run } from '@ember/runloop';

module('some module', function(hooks) {
  setupRenderingTest(hooks);

  function renderComponent(surroundingContext, options) {
    surroundingContext.setProperties(options);
    return render(template);
  }

  test('my test name', async function() {
    await renderComponent(this);
  });
});
