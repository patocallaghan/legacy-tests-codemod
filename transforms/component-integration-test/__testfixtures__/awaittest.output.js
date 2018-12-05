module("Team Messages | Component | message-editor/title/header-component", function(hooks) {
  setupRenderingTest(hooks);

  test('A message with a folder', async function(assert) {
    await renderComponent(this, { message });
  });
});
