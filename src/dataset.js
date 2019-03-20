import qlik from 'qlik';

function createCube (definition, app) {
  return new Promise(resolve => {
    app.createCube(definition, resolve);
  });
}

async function buildDataCube (originCubeDefinition, dimensionIndexes, app) {
  const cubeDefinition = {
    ...originCubeDefinition,
    qInitialDataFetch: [
      {
        qHeight: 1000,
        qWidth: 10
      }
    ],
    qDimensions: [originCubeDefinition.qDimensions[dimensionIndexes.dimension1]],
    qMeasures: originCubeDefinition.qMeasures
  };
  if (dimensionIndexes.dimension2) {
    cubeDefinition.qDimensions.push(originCubeDefinition.qDimensions[dimensionIndexes.dimension2]);
  }
  const cube = await createCube(cubeDefinition, app);

  return cube.qHyperCube.qDataPages[0].qMatrix;
}

async function buildDesignCube (originCubeDefinition, dimensionIndexes, app) {
  if (!dimensionIndexes.design) {
    return null;
  }
  const cube = await createCube({
    qInitialDataFetch: [
      {
        qHeight: 1000,
        qWidth: 1
      }
    ],
    qDimensions: [originCubeDefinition.qDimensions[dimensionIndexes.design]]
  }, app);

  return cube.qHyperCube.qDataPages[0].qMatrix;
}

const STYLE_SEPARATOR_COUNT = 7;
function findDesignDimension (qMatrix) {
  return qMatrix[0].map(entry => (entry.qText.match(/;/g) || []).length).indexOf(STYLE_SEPARATOR_COUNT);
}

function getDimensionIndexes (dimensionsInformation, designDimensionIndex) {
  const hasDesign = designDimensionIndex !== -1;
  const nonDesignDimensionCount = hasDesign ? dimensionsInformation.length - 1 : dimensionsInformation.length;
  const dimension1 = designDimensionIndex === 0 ? 1 : 0;
  let dimension2 = false;
  if (nonDesignDimensionCount === 2) {
    dimension2 = hasDesign && designDimensionIndex < 2 ? 2 : 1;
  }
  const design = hasDesign && designDimensionIndex;
  const firstMeasurementIndex = dimensionsInformation.length;
  return {
    design,
    dimension1,
    dimension2,
    firstMeasurementIndex
  };
}

export async function initializeCubes ({ component, layout }) {
  const app = qlik.currApp(component);
  const designDimensionIndex = findDesignDimension(layout.qHyperCube.qDataPages[0].qMatrix);
  const dimensionsInformation = layout.qHyperCube.qDimensionInfo;
  const dimensionIndexes = getDimensionIndexes(dimensionsInformation, designDimensionIndex);

  let properties;
  if (component.backendApi.isSnapshot) {
    // Fetch properties of source
    properties = (await app.getObjectProperties(layout.sourceObjectId)).properties;
  } else {
    properties = await component.backendApi.getProperties();
  }

  const originCubeDefinition = properties.qHyperCubeDef;
  const designCube = await buildDesignCube(originCubeDefinition, dimensionIndexes, app);
  const dataCube = await buildDataCube(originCubeDefinition, dimensionIndexes, app);

  return {
    design: designCube,
    data: dataCube
  };
}
