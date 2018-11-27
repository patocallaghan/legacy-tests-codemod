import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { makeList, setupFactoryGuy } from 'ember-data-factory-guy';
import { getAppModelWithData } from 'embercom/tests/helpers/data';
import { mockAppServiceWithApp } from 'embercom/tests/helpers/mock';

module('Team Dev Platform | Component | developer-hub/listing/app-package-list', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  let selectors = {
    componentText: '[data-test-text]',
    appsTable: '[data-test-developer-hub-apps-table]',
    emptyState: '[data-test-empty-state]',
    appPackageDetails: '[data-test-developer-hub-app-package-details]',
    appPackageState: '[data-test-app-package-state]',
    appPackageOwnerAppName: '[data-test-developer-hub-app-package-owner-app]',
  };

  let template = hbs`{{developer-hub/listing/app-package-list
    appPackages=appPackages
    apps=apps
  }}`;

  function renderComponent(surroundingContext, options) {
    surroundingContext.setProperties({
      appPackages: options.appPackages,
      apps: options.apps,
    });
    return render(template);
  }

  module('app package list rendering', function(hooks) {
    hooks.beforeEach(function() {
      let app = getAppModelWithData();
      this.setProperties({
        app,
      });
      mockAppServiceWithApp(this, app);
      this.set(
        'app.currentAdmin',
        Em.Object.create({
          id: 1,
          apps: [app],
        }),
      );
    });

    test('Component and ic-table is rendered', async function(assert) {
      await renderComponent(this, {
        appPackages: makeList('developer-hub/app-package', 2),
        apps: makeList('developer-hub/app', 2),
      });
      assert.dom(selectors.appsTable).exists();
      assert.dom(selectors.appPackageDetails).exists({ count: 2 });
      assert.dom(selectors.appPackageState).exists({ count: 2 });
      assert.dom(selectors.appPackageOwnerAppName).exists({ count: 2 });
    });

    test('Empty state is rendered', async function(assert) {
      await renderComponent(this, {
        appPackages: [],
        apps: makeList('developer-hub/app', 2),
      });
      assert.dom(selectors.emptyState).exists();
    });
  });
});
