function replaceLiteral(j, code, oldName, newName) {
  return j(code)
    .find(j.Literal, { value: oldName })
    .forEach(path => {
      j(path).replaceWith(j.literal(newName));
    })
    .toSource();
}

module.exports = { replaceLiteral };
