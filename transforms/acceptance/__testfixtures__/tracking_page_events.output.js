import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import {
  assertTrackEvent,
  assertTrackAnalyticsEvent,
  setupIntercomEventService,
} from 'embercom/tests/helpers/services/intercom-event';

module('some module', function(hooks) {
  setupApplicationTest(hooks);
  setupIntercomEventService(hooks);

  test('Visitng developer sign up tracks an event', async function(assert) {
    await visit('/developer-signup');
    assertTrackAnalyticsEvent(assert, {
      action: 'viewed',
      object: 'sign_up_page',
      place: 'developer_signup',
    });
    assertTrackEvent(assert, 'viewed_performance_report');
  });
});
