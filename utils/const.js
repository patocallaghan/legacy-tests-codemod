function replaceConst(j, code, constantName) {
  code = j(code)
    .find(j.VariableDeclarator, { id: { name: constantName } })
    .forEach(path => {
      j(path)
        .closest(j.VariableDeclaration)
        .forEach(path => {
          path.value.kind = 'let';
        });
    })
    .toSource();
  return j(code)
    .find(j.Identifier, { name: constantName })
    .forEach(path => {
      j(path).replaceWith(j.identifier(constantName.toLowerCase()));
    })
    .toSource();
}

module.exports = {
  replaceConst,
};
