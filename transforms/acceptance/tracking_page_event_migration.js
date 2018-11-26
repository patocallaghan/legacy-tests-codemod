const {
  addImport
} = require('../../utils/imports');

function substituteEvent(j, code, eventName) {
  let needsImport = false;
  code = j(code).find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'ThisExpression' },
      property: { type: 'Identifier', name: eventName }
    }
  })
  .forEach(path => {
    needsImport = true;
    j(path).replaceWith(
        j.callExpression(
          j.identifier(path.node.callee.property.name),
          path.node.arguments
        )
    );
  }).closest(j.CallExpression, {
    callee: { name: 'module' }
  }).forEach(path => {
    let setupApplicationTestExists =  j(path).find(j.Identifier, { name: 'setupApplicationTest' }).length !== 0;
    let setupExists = j(path).find(j.Identifier, { name: 'setupIntercomEventService' }).length !== 0;
    if (!setupExists) {
      if (!setupApplicationTestExists) {
        path.value.arguments[1].body.body.unshift("setupIntercomEventService(hooks);");
        path.value.arguments[1].body.body.unshift("setupApplicationTest(hooks);");
      } else {
        j(path).find(j.CallExpression, {
        	callee: {
              name: 'setupApplicationTest'
            }
        }).replaceWith(
         j.identifier("setupApplicationTest(hooks);\nsetupIntercomEventService(hooks)")
        )
      }
    }
  }).toSource();

  if (needsImport) {
    code = addImport(j, code, eventName, 'embercom/tests/helpers/services/intercom-event');
    code = addImport(j, code, 'setupIntercomEventService', 'embercom/tests/helpers/services/intercom-event');
  }
  return code;
}

function trackingPageEventMigration(j, code) {
  let codeSource = j(code).toSource();
  codeSource = substituteEvent(j, codeSource, 'assertTrackEvent');
  codeSource = substituteEvent(j, codeSource, 'assertTrackAnalyticsEvent');
  codeSource = j(codeSource).find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'ThisExpression' },
      property: { type: 'Identifier', name: 'capturesTrackingEvents' }
    }
  }).remove().toSource();
  return codeSource;
}

module.exports = {
  trackingPageEventMigration,
};
