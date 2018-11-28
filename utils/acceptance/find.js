function find(j, code, someParam) {}

function closestAncestorOfType(path, typeRegex) {
  let current = path.parentPath;
  while (current.parentPath && !typeRegex.test(current.value.type)) {
    current = current.parentPath;
  }
  return current || null;
}

function findWithAssert(j, code) {
  const comment = j.commentLine(
    "TEST MIGRATION HINT: Remove all uses of `findWithAssert`. We can't codemod this as it can return one or many elements. Use `find` for a single element or `findAll` (from @ember/test-helpers) if you are retrieving multiple elements",
    true,
    false,
  );
  return j(code)
    .find(j.Identifier, { name: 'findWithAssert' })
    .forEach(path => {
      let ancestor = closestAncestorOfType(path, /ExpressionStatement|VariableDeclaration/);
      const comments = (ancestor.node.comments = ancestor.node.comments || []);
      let hasHint = comments.find(c => c.value.includes('Remove all uses of `findWithAssert`'));
      if (!hasHint) {
        comments.push(comment);
      }
    })
    .toSource();
}

module.exports = {
  find,
  findWithAssert,
};
