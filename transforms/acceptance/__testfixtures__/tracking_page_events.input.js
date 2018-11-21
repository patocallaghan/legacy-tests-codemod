import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('some module', function(hooks) {
  setupApplicationTest(hooks);

  test('Visitng developer sign up tracks an event', async function(assert) {
    this.capturesTrackingEvents();

    await visit('/developer-signup');
    this.assertTrackAnalyticsEvent(assert, {
      action: 'viewed',
      object: 'sign_up_page',
      place: 'developer_signup',
    });
    this.assertTrackEvent(assert, 'viewed_performance_report');
  });
});
