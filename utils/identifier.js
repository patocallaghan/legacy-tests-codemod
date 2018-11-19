function replaceIdentifier(j, code, oldName, newName) {
  return j(code)
    .find(j.Identifier, { name: oldName })
    .forEach(path => {
      j(path).replaceWith(j.identifier(newName));
    })
    .toSource();
}

function findIdentifier(j, code, identifierName) {
  return j(code).find(j.Identifier, { name: identifierName });
}

function hasIdentifierCalled(j, code, identifierName) {
  return findIdentifier(j, code, identifierName).length;
}

module.exports = {
  hasIdentifierCalled,
  findIdentifier,
  replaceIdentifier,
};
