import qlik from 'qlik';

function createCube (definition, app) {
  return new Promise(resolve => {
    app.createCube(definition, resolve);
  });
}

function createDimension (dimensionInformation) {
  return {
    qDef: {
      qFieldDefs: dimensionInformation.qGroupFieldDefs
    }
  };
}

async function buildDataCube (dimensionsInformation, dimensionIndexes, app, measurementsInformation) {
  const dimension1 = dimensionsInformation[dimensionIndexes.dimension1];
  const cubeDefinition = {
    qInitialDataFetch: [
      {
        qHeight: 1000,
        qWidth: 9
      }
    ],
    qDimensions: [createDimension(dimension1)],
    qMeasures: measurementsInformation.map(measurementInformation => ({
      qDef: {
        qDef: measurementInformation.qFallbackTitle
      }
    }))
  };
  if (dimensionIndexes.dimension2) {
    const dimension2 = dimensionsInformation[dimensionIndexes.dimension2];
    cubeDefinition.qDimensions.push(createDimension(dimension2));
  }
  const cube = await createCube(cubeDefinition, app);

  return cube.qHyperCube.qDataPages[0].qMatrix;
}

async function buildDesignCube (dimensionsInformation, dimensionIndexes, app) {
  if (!dimensionIndexes.design) {
    return null;
  }
  const dimensionInfo = dimensionsInformation[dimensionIndexes.design];
  const cube = await createCube({
    qInitialDataFetch: [
      {
        qHeight: 1000,
        qWidth: 1
      }
    ],
    qDimensions: [
      {
        qDef: {
          qFieldDefs: dimensionInfo.qGroupFieldDefs
        }
      }
    ]
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
  const dimension2 = nonDesignDimensionCount === 2 && (hasDesign && designDimensionIndex < 2) ? 2 : 1;
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
  const measurementsInformation = layout.qHyperCube.qMeasureInfo;
  const dimensionIndexes = getDimensionIndexes(dimensionsInformation, designDimensionIndex);
  const designCube = await buildDesignCube(dimensionsInformation, dimensionIndexes, app);
  const dataCube = await buildDataCube(dimensionsInformation, dimensionIndexes, app, measurementsInformation);

  return {
    design: designCube,
    data: dataCube
  };
}
