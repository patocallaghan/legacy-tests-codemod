import { make, makeList, setupFactoryGuy } from 'ember-data-factory-guy';
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { mockFindAll } from 'ember-data-factory-guy';

module('Team Inbox | Component | inbox/inbox-component', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);
});
