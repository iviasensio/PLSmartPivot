import initializeTransformed from './initialize-transformed';

async function initialize ({ $element, layout, component }) {
  const transformedProperties = await initializeTransformed({
    $element,
    component,
    layout
  });

  return transformedProperties;
}

export default initialize;
