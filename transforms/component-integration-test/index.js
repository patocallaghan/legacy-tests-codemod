const { getParser } = require('codemod-cli').jscodeshift;

module.exports = function transformer(file, api) {
  const j = getParser(api);

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      path.node.name = path.node.name
        .split('')
        .reverse()
        .join('');
    })
    .toSource();
}