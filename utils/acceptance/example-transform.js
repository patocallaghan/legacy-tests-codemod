function exampleTransform(j, code, someParam) {
  return (
    j(code)
      // .find(j.VariableDeclarator, { id: { name: constantName } })
      // .forEach(path => {
      // })
      .toSource()
  );
}

module.exports = {
  exampleTransform,
};
