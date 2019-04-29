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
  if (component.backendApi.isSnapshot) {
    return layout.snapshotData.dataCube;
  }

  const app = qlik.currApp(component);
  const properties = (await component.backendApi.getProperties());

  // If this is a master object, fetch the hyperCubeDef of the original object
  const hyperCubeDef = properties.qExtendsId
    ? (await app.getObjectProperties(properties.qExtendsId)).properties.qHyperCubeDef
    : properties.qHyperCubeDef;

  return buildDataCube(hyperCubeDef, layout.qHyperCube.qDimensionInfo.length === 2, app);
}

export function initializeDesignList (component, layout) {
  if (component.backendApi.isSnapshot) {
    return layout.snapshotData.designList;
  }

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
