import {
  test,
  componentIntegrationTest,
} from 'embercom/tests/helpers/component-integration-testing';
import { manualSetup, make } from 'ember-data-factory-guy';

module('Team Messages | Component | campaigns/user-list', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    manualSetup(this);
  });

  make('answers/answer');
});
