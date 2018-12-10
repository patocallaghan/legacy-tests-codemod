import { setupRenderingTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('some module', function(hooks) {
  setupRenderingTest(hooks);

  async function renderComponent(surroundingContext, options) {
    run(() => {
      surroundingContext.setProperties(options);
      return render(TEMPLATE);
    });
  }

  test('my test name', async function() {
    run(() => {
      renderComponent(this);
    });
  });
});
