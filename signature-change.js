export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  // find declaration for "car" import
  const importDeclaration = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: 'car',
    },
  });

  // get the local name for the imported module
  const localName =
    importDeclaration.find(j.Identifier)
    .get(0)
    .node.name;

  // current order of arguments
  const argKeys = [
  'color',
  'make',
  'model',
  'year',
  'miles',
  'bedliner',
  'alarm',
  ];

  // find where `.factory` is being called
  return root.find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: localName,
        },
        property: {
          name: 'factory',
        },
      }
    })

    .replaceWith(nodePath => {
      const { node } = nodePath;

      // use a builder to create the ObjectExpression
      const argumentsAsObject = j.objectExpression(

        // map the arguments to an Array of Property Nodes
        node.arguments.map((arg, i) =>
          j.property(
            'init',
            j.identifier(argKeys[i]),
            j.literal(arg.value)
          )
        )
      );

      // replace the arguments with our new ObjectExpression
      node.arguments = [argumentsAsObject];

      return node;
    })

    // specify print options for recast
    .toSource({ quote: 'single', trailingComma: true });
};
