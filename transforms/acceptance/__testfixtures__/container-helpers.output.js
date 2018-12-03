import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import {
  getApp,
  getAdmin,
  getCurrentController,
  getCurrentRoute,
} from "embercom/tests/helpers/container-helpers";

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('getAdmin', async function(assert) {
    await visit('/developer-signup');

    let admin = getAdmin();
  });

  test('getApp', async function(assert) {
    await visit('/developer-signup');

    let app = getApp();
  });

  test('getCurrentController', async function(assert) {
    await visit('/developer-signup');

    let controller = getCurrentController();
  });

  test('getCurrentRoute', async function(assert) {
    await visit('/developer-signup');

    let controller = getCurrentRoute();
  });
});
