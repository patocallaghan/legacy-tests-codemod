import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
import { setupRenderingTest } from 'ember-qunit';

module('some module', function(hooks) {
  setupRenderingTest(hooks);

  function renderComponent(surroundingContext, options) {
    surroundingContext.setProperties(options);
    return render(template);
  }

  function renderComponent(surroundingContext, options) {
    surroundingContext.setProperties(options);
    return render(template);
  }
});
