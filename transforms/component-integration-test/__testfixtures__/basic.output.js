import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import {
  test,
  componentIntegrationTest,
} from 'embercom/tests/helpers/component-integration-testing';
import { build, make } from 'ember-data-factory-guy';
import { click } from 'ember-native-dom-helpers';
import { getAppModelWithData, makeAudiencePredicate } from 'embercom/tests/helpers/data';

module("Team Messages | Component | message-editor/audience/selection-state/editors/numeric", function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.mockAttributeServiceWithApp(getAppModelWithData());
  });

  const TEMPLATE = hbs`
  {{message-editor/audience/selection-state/editors/numeric
    predicate=predicate
    predicateContext=predicateContext
    changePredicateComparison=(action changePredicateComparison)
    changePredicateValue=(action changePredicateValue)
  }}`;

  function renderComponent(surroundingContext, options = {}) {
    surroundingContext.setProperties({
      predicate: options.predicate || makeAudiencePredicate('numeric_predicate'),
      predicateContext: options.predicateContext,
      changePredicateComparison: options.changePredicateComparison || (() => {}),
      changePredicateValue: options.changePredicateValue || (() => {}),
    });
    surroundingContext.render(TEMPLATE);
  }

  const SELECTORS = {
    predicateValue: '[data-test-predicate-value]',
    predicateGreaterThanComparison: '[data-test-predicate-comparison=gt]',
    predicateLessThanComparison: '[data-test-predicate-comparison=lt]',
    predicateSuffix: '.test__predicate-suffix',
  };

  test('renders the correct value and comparator', function(assert) {
    assert.expect(2);
    renderComponent(this, {});
    assert.dom(SELECTORS.predicateValue).hasValue('5', 'The value is correct');
    assert.dom(SELECTORS.predicateGreaterThanComparison).isChecked('The right selector is selected');
  });
});