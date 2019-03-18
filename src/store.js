import initializeTransformed from './initialize-transformed';

async function initialize ({ $element, layout, component, cubes }) {
  const transformedProperties = await initializeTransformed({
    $element,
    component,
    cubes,
    layout
  });

  return transformedProperties;
}

export default initialize;
