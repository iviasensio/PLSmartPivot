import initializeTransformed from './initialize-transformed';

async function initialize ({ $element, layout, component, dataCube, designList }) {
  const transformedProperties = await initializeTransformed({
    $element,
    component,
    dataCube,
    designList,
    layout
  });

  return transformedProperties;
}

export default initialize;
