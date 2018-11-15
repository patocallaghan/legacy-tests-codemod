export function addImport(j, code, importName, sourceName) {
  let hasImport = false;
  code = j(code)
    .find(j.ImportDeclaration, { source: { value: sourceName } })
    .forEach(statement => {
      if (statement.value.source.value === sourceName) {
        let existingImports = statement.value.specifiers.map(s => s.imported.name);
        if (!existingImports.includes(importName)) {
          statement.value.specifiers.push(j.importSpecifier(j.identifier(importName)));
        }
        hasImport = true;
      }
    })
    .toSource();

  if (!hasImport) {
    return j(code)
      .find(j.ImportDeclaration)
      .at(-1)
      .forEach(path => {
        j(path).insertBefore(
          j.importDeclaration([j.importSpecifier(j.identifier(importName))], j.literal(sourceName)),
        );
      })
      .toSource();
  } else {
    return j(code).toSource();
  }
}

export function removeImport(j, code, sourceName) {
  return j(code)
    .find(j.ImportDeclaration, { source: { value: sourceName } })
    .remove()
    .toSource();
}

export function removeSpecificImport(j, code, sourceName) {
  return j(code)
    .find(j.ImportSpecifier, { local: { name: sourceName } })
    .remove()
    .toSource();
}