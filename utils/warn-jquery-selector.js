const SELECTORS_REGEX = /:(first(\s|$)|last(\s|$)|(eq|nth)\(|(lt|gt)\(|(even|odd)|contains\(|visible|header|parent|selected|input|button|checkbox|file|image|password|radio|reset|submit|text|is\()/;

function closestAncestorOfType(path, typeRegex) {
  let current = path.parentPath;
  while (current.parentPath && !typeRegex.test(current.value.type)) {
    current = current.parentPath;
  }
  return current || null;
}

function processLiteral(path, comment) {
  let ancestor = closestAncestorOfType(path, /ExpressionStatement|VariableDeclaration|Property/);
  const comments = (ancestor.node.comments = ancestor.node.comments || []);
  let hasHint = comments.find(c => c.value.includes('Refactor jQuery-specific selectors'));
  if (!hasHint) {
    comments.push(comment);
  }
}

function warnjQuerySelector(j, code) {
  const comment = j.commentLine(
    'TEST MIGRATION HINT: Refactor jQuery-specific selectors, e.g. `:first`, `:contains()`, `:eq()`, as these are not valid when using helpers from `@ember/test-helpers`. Query the element differently or use an ember-test-selector instead',
    true,
    false,
  );
  code = j(code)
    .find(j.Literal, path => {
      return SELECTORS_REGEX.test(path.value);
    })
    .forEach(path => processLiteral(path, comment))
    .toSource();
  return j(code)
    .find(j.TemplateElement, path => {
      return SELECTORS_REGEX.test(path.value.raw);
    })
    .forEach(path => processLiteral(path, comment))
    .toSource();
}

module.exports = {
  warnjQuerySelector,
};
