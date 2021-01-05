import qlik from "qlik";

function createCube(definition, app) {
  return new Promise((resolve) => {
    app.createCube(definition, resolve);
  });
}

async function buildDataCube(
  originCubeDefinition,
  originCube,
  app,
  requestPage
) {
  const cubeDefinition = {
    ...originCubeDefinition,
    qInitialDataFetch: [
      {
        // eslint-disable-next-line no-undefined
        qTop: requestPage === undefined ? 0 : requestPage[0].qTop,
        qLeft: 0,
        qHeight: 1000,
        qWidth: originCube.qSize.qcx,
      },
    ],
    qDimensions: [originCubeDefinition.qDimensions[0]],
    qMeasures: originCubeDefinition.qMeasures,
  };
  if (originCube.qDimensionInfo.length === 2) {
    cubeDefinition.qDimensions.push(originCubeDefinition.qDimensions[1]);
  }
  const cube = await createCube(cubeDefinition, app);
  const cubeMatrix = cube.qHyperCube.qDataPages[0].qMatrix;
  app.destroySessionObject(cube.qInfo.qId);
  return cubeMatrix;
}

export async function initializeDataCube(component, layout) {
  if (component.backendApi.isSnapshot) {
    return layout.snapshotData.dataCube;
  }
  const app = qlik.currApp(component);
  const properties = await component.backendApi.getProperties();
  const rowCount = component.backendApi.getRowCount();
  const cellCount = rowCount * layout.qHyperCube.qSize.qcx;
  const maxLoops = layout.maxloops;

  // If this is a master object, fetch the hyperCubeDef of the original object
  let hyperCubeDef = properties.qExtendsId
    ? (await app.getObjectProperties(properties.qExtendsId)).properties
        .qHyperCubeDef
    : properties.qHyperCubeDef;
  hyperCubeDef = JSON.parse(JSON.stringify(hyperCubeDef));
  hyperCubeDef.qStateName = layout.qStateName;
  const pagedCube = {};
  let lastRow = 0;
  if (cellCount < maxLoops * 10000) {
    for (let index = 0; cellCount > lastRow; index += 1) {
      const requestPage = [
        {
          qHeight: 1000,
          qLeft: 0,
          qTop: lastRow,
          qWidth: 10, // should be # of columns
        },
      ];
      // eslint-disable-next-line no-await-in-loop
      pagedCube[index] = await buildDataCube(
        hyperCubeDef,
        layout.qHyperCube,
        app,
        requestPage
      );
      lastRow = lastRow + 1000;
    }
    return pagedCube;
  }
  return null;
}

export function initializeDesignList(component, layout) {
  if (component.backendApi.isSnapshot) {
    return layout.snapshotData.designList;
  }

  if (!layout.stylingfield) {
    return null;
  }

  return new Promise((resolve) => {
    const app = qlik.currApp(component);
    const stylingField = app.field(layout.stylingfield);
    const listener = function () {
      const data = stylingField.rows.map((row) => row.qText);
      stylingField.OnData.unbind(listener);
      resolve(data);
    };
    stylingField.OnData.bind(listener);
    stylingField.getData({ rows: 5000 });
  });
}
