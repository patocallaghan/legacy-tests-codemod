import { setupApplicationTest } from 'ember-qunit';
import { assertTrackEvent, setupIntercomEventService, assertTrackAnalyticsEvent } from "embercom/tests/helpers/services/intercom-event";
import { visit } from '@ember/test-helpers';

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