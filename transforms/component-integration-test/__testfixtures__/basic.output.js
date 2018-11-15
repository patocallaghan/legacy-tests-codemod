import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, render, getContext } from '@ember/test-helpers';
import { mockAppServiceWithApp } from 'embercom/tests/helpers/mock';
import { getAppModelWithData } from 'embercom/tests/helpers/data';
import moment from 'moment';

module('Team People | Component | Account visibility/segments', function(hooks) {
  setupRenderingTest(hooks);

  let template = hbs`{{account/content-components/visibility/segments
    companiesActive=companiesActive
    hiddenSegments=hiddenSegments
    visibleSegments=visibleSegments
    segmentType=segmentType
    columns=columns
    showSegment=showSegment
    hideSegment=hideSegment
  }}`;

  let selectors = {
    noVisibleNotice: '[data-test-no-visible-segments]',
    hiddenSegmentsHeader: '[data-test-hidden-segments-header]',
    visibleRows: '[data-test-visible-segments] tbody tr',
    hiddenRows: '[data-test-hidden-segments] tbody tr',
    makeHiddenLink: '[data-test-make-hidden]',
    makeVisibleLink: '[data-test-make-visible]',
    nameCell: 'tbody tr td:nth-child(1)',
    createdByCell: 'tbody tr td:nth-child(2)',
    createdCell: 'tbody tr td:nth-child(3)',
    actionsCell: 'tbody tr td:nth-child(4)',
  };

  let app;

  hooks.beforeEach(function() {
    app = getAppModelWithData();
    mockAppServiceWithApp(this, app);
  });

  function renderComponent(props = {}) {
    let context = getContext();
    let visibleIds = app.currentAdmin.visible_segment_ids;
    let visibleSegments = app.segments.filter(
      segment => segment.id === undefined || visibleIds.includes(String(segment.id)),
    );
    let hiddenSegments = app.segments.reject(segment => visibleSegments.includes(segment));
    let defaultProps = {
      companiesActive: true,
      visibleSegments,
      hiddenSegments,
      segmentType: 'People',
      columns: hiddenOrVisible => [
        {
          label: 'Segment name',
          valueComponent: 'visibility/segments/table-cells/name',
        },
        {
          label: 'Created by',
          valueComponent: 'visibility/segments/table-cells/created-by',
        },
        {
          label: 'Created',
          valueComponent: 'visibility/segments/table-cells/created',
        },
        {
          valueComponent: `visibility/segments/table-cells/actions-for-${hiddenOrVisible}`,
        },
      ],
      showSegment: segment => {
        visibleSegments.addObject(segment);
        hiddenSegments.removeObject(segment);
      },
      hideSegment: segment => {
        visibleSegments.removeObject(segment);
        hiddenSegments.addObject(segment);
      },
    };

    return render(template);
  }

  test('Hides the hidden segments section', async function(assert) {
    app.set('currentAdmin.visible_segment_ids', app.segments.map(segment => segment.id));
    await renderComponent();
    assert.dom(selectors.hiddenSegmentsHeader).doesNotExist();
  });

  test('Segments are correctly shown as visible or hidden', async function(assert) {
    assert.expect(2);
    await renderComponent();
    assert.dom(selectors.visibleRows).exists({ count: 8 });
    assert.dom(selectors.hiddenRows).exists({ count: 4 });
  });

  test('Predefined and editable segments can be hidden', async function(assert) {
    let segment = app.segments.findBy('name', 'Active');
    app.set('segments', [segment]);

    assert.expect(7);
    await renderComponent();
    assert.dom(selectors.visibleRows).exists({ count: 1 });
    assert.dom(selectors.nameCell).hasText('Active');
    assert.dom(selectors.createdByCell).hasText('Default Segment');
    assert.dom(selectors.createdCell).doesNotIncludeText(/\w+/);
    assert.dom(selectors.actionsCell).hasText('Make hidden');
    await click(selectors.makeHiddenLink);
    assert.dom(selectors.visibleRows).doesNotExist();
    assert.dom(selectors.hiddenRows).exists({ count: 1 });
  });

  module('With visible segment', function(hooks) {
    hooks.beforeEach(function() {
      let editableSegment = app.segments.findBy('name', 'Test');
      editableSegment.set('created_at', moment().format());
      app.set('currentAdmin.visible_segment_ids', [editableSegment.id]);
      app.set('segments', [editableSegment]);
    });

    test('Segments can be made hidden', async function(assert) {
      assert.expect(4);
      await renderComponent();
      assert.dom(selectors.visibleRows).exists({ count: 1 });
      assert.dom(selectors.hiddenRows).doesNotExist();
      await click(selectors.makeHiddenLink);
      assert.dom(selectors.visibleRows).doesNotExist();
      assert.dom(selectors.hiddenRows).exists({ count: 1 });
    });

    test('Visible segments render correctly', async function(assert) {
      assert.expect(4);
      await renderComponent();
      assert.dom(selectors.nameCell).hasText('Test');
      assert.dom(selectors.createdByCell).hasText('You');
      assert.dom(selectors.createdCell).hasText('Just now');
      assert.dom(selectors.actionsCell).hasText('Make hidden');
    });
  });

  module('With hidden segment', function(hooks) {
    hooks.beforeEach(function() {
      let editableSegment = app.segments.findBy('name', 'Test');
      editableSegment.set('created_at', moment().format());
      app.set('currentAdmin.visible_segment_ids', []);
      app.set('segments', [editableSegment]);
    });

    test('Segments can be made visible', async function(assert) {
      assert.expect(4);
      await renderComponent();
      assert.dom(selectors.visibleRows).doesNotExist();
      assert.dom(selectors.hiddenRows).exists({ count: 1 });
      await click(selectors.makeVisibleLink);
      assert.dom(selectors.visibleRows).exists({ count: 1 });
      assert.dom(selectors.hiddenRows).doesNotExist();
    });

    test('Hidden segments render correctly', async function(assert) {
      assert.expect(4);
      await renderComponent();
      assert.dom(selectors.nameCell).hasText('Test');
      assert.dom(selectors.createdByCell).hasText('You');
      assert.dom(selectors.createdCell).hasText('Just now');
      assert.dom(selectors.actionsCell).hasText('Make visible');
    });
  });

  module('With predefined non-editable segment', function(hooks) {
    hooks.beforeEach(function() {
      let segment = app.segments.findBy('name', 'All Users');
      app.set('segments', [segment]);
    });

    test('Predefined segment renders correctly', async function(assert) {
      assert.expect(5);
      await renderComponent();
      assert.dom(selectors.visibleRows).exists({ count: 1 });
      assert.dom(selectors.nameCell).hasText('All Users');
      assert.dom(selectors.createdByCell).hasText('Default Segment');
      assert.dom(selectors.createdCell).doesNotIncludeText(/\w+/);
      assert.dom(selectors.actionsCell).doesNotIncludeText(/\w+/);
    });
  });
});
