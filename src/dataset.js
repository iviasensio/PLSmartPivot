import qlik from 'qlik';

function createCube (definition, app) {
  return new Promise(resolve => {
    app.createCube(definition, resolve);
  });
}

async function buildDataCube (originCubeDefinition, hasTwoDimensions, app) {
  const cubeDefinition = {
    ...originCubeDefinition,
    qInitialDataFetch: [
      {
        qHeight: 1000,
        qWidth: 10
      }
    ],
    qDimensions: [originCubeDefinition.qDimensions[0]],
    qMeasures: originCubeDefinition.qMeasures
  };
  if (hasTwoDimensions) {
    cubeDefinition.qDimensions.push(originCubeDefinition.qDimensions[1]);
  }
  const cube = await createCube(cubeDefinition, app);
  return cube.qHyperCube.qDataPages[0].qMatrix;
}

export async function initializeDataCube (component, layout) {
  const app = qlik.currApp(component);

  let properties;
  if (component.backendApi.isSnapshot) {
    // Fetch properties of source
    properties = (await app.getObjectProperties(layout.sourceObjectId)).properties;
  } else {
    properties = await component.backendApi.getProperties();
  }

  return buildDataCube(
    properties.qHyperCubeDef, layout.qHyperCube.qDimensionInfo.length === 2, app);
}

export function initializeDesignList (component, layout) {
  if (!layout.stylingfield) {
    return null;
  }

  return new Promise(resolve => {
    const app = qlik.currApp(component);
    const stylingField = app.field(layout.stylingfield);
    const listener = function () {
      const data = stylingField.rows.map(row => row.qText);
      stylingField.OnData.unbind(listener);
      resolve(data);
    };
    stylingField.OnData.bind(listener);
    stylingField.getData();
  });
}
