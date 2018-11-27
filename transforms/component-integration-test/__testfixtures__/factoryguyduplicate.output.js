import { setupRenderingTest } from 'ember-qunit';
import { module, test } from "qunit";
import { render } from "@ember/test-helpers";
import { setupFactoryGuy } from 'ember-data-factory-guy';

module('some module', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);
});
