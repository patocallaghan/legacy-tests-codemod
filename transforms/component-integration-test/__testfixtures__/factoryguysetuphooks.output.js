import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { make, setupFactoryGuy } from 'ember-data-factory-guy';

module('Team Messages | Component | campaigns/user-list', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  make('answers/answer');
});
