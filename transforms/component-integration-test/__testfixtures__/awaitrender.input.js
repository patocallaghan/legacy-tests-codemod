import { setupRenderingTest } from 'ember-qunit';

module('some module', function(hooks) {
  setupRenderingTest(hooks);

  async function renderComponent(surroundingContext, options) {
    surroundingContext.setProperties(options);
    await render(TEMPLATE);
  }

  async function renderComponent(surroundingContext, options) {
    surroundingContext.setProperties(options);
    return await render(TEMPLATE);
  }
});
