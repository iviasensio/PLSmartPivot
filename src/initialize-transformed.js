import jQuery from 'jquery';
import { distinctArray } from './utilities';

// TODO: rename colors
function initializeColors ({ layout }) {
  return {
    vColLibBlue: layout.collibblue,
    vColLibBlueP: layout.collibbluep,
    vColLibClean: layout.collibclean,
    vColLibCleanP: layout.collibcleanp,
    vColLibCustom: layout.collibcustom,
    vColLibCustomP: layout.collibcustomp,
    vColLibDark: layout.collibdark,
    vColLibDarkP: layout.collibdarkp,
    vColLibGreen: layout.collibgreen,
    vColLibGreenP: layout.collibgreenp,
    vColLibNight: layout.collibnight,
    vColLibNightP: layout.collibnightp,
    vColLibOrange: layout.colliborange,
    vColLibOrangeP: layout.colliborangep,
    vColLibRed: layout.collibred,
    vColLibRedP: layout.collibredp,
    vColLibSoft: layout.collibsoft,
    vColLibSoftP: layout.collibsoftp,
    vColLibViolete: layout.collibviolete,
    vColLibVioleteP: layout.collibvioletep
  };
}

function getAlignment (option) {
  const alignmentOptions = {
    1: 'left',
    2: 'center',
    3: 'right'
  };

  return alignmentOptions[option] || 'left';
}

function getFontSizeAdjustment (option) {
  const fontSizeAdjustmentOptions = {
    1: -2,
    2: 0,
    3: 2
  };

  return fontSizeAdjustmentOptions[option] || 0;
}

function getCellSuffix (option) {
  const cellSuffixOptions = {
    1: '-s',
    3: '-l'
  };

  return cellSuffixOptions[option] || '';
}

function getMeasurementFormat (measurement) {
  if (measurement.qNumFormat.qType === 'U' || measurement.qNumFormat.qFmt === '##############') {
    return '#.##0';
  } else if (measurement.qNumFormat.qType === 'R') {
    return measurement.qNumFormat.qFmt.replace(/(|)/gi, '');
  }
  return measurement.qNumFormat.qFmt;
}

function getMagnitudeLabelSuffix (magnitudeOption) {
  const magnitudeLabelSuffixOptions = {
    'k': ' (k)',
    'm': ' (m)'
  };

  return magnitudeLabelSuffixOptions[magnitudeOption] || '';
}

function generateMeasurements (information) {
  return information.map(measurement => {
    const format = getMeasurementFormat(measurement);
    const formatMagnitude = format.substr(format.length - 1).toLowerCase();
    const transformedMeasurement = {
      format,
      magnitudeLabelSuffix: getMagnitudeLabelSuffix(formatMagnitude),
      name: measurement.qFallbackTitle
    };

    return transformedMeasurement;
  });
}

function generateDimensionEntry (information, data) {
  return {
    displayValue: data.qText,
    name: information.qFallbackTitle,
    value: data.qNum
  };
}

function generateMatrixCell (information, data) {
  return {
    displayValue: data.qText,
    elementNumber: data.qElemNumber,
    format: information.format,
    magnitude: information.magnitudeLabelSuffix.substring(
      information.magnitudeLabelSuffix.length - 2,
      information.magnitudeLabelSuffix.length - 1
    ),
    magnitudeLabelSuffix: information.magnitudeLabelSuffix,
    name: information.name,
    value: data.qNum
  };
}

let lastRow = 0;
function generateDataSet (component, dimensionsInformation, measurementsInformation) {
  const dimension1 = [];
  const dimension2 = [];
  const measurements = generateMeasurements(measurementsInformation);
  let matrix = [];

  let previousDim1Entry;
  const hasSecondDimension = dimensionsInformation.length > 1;
  component.backendApi.eachDataRow((rowIndex, row) => {
    lastRow += 1;
    const dimension1Entry = generateDimensionEntry(dimensionsInformation[0], row[0]);
    dimension1.push(dimension1Entry);
    let dimension2Entry;
    let firstDataCell = 1;
    if (hasSecondDimension) {
      dimension2Entry = generateDimensionEntry(dimensionsInformation[1], row[1]);
      dimension2.push(dimension2Entry);
      firstDataCell = 2;
    }
    const matrixRow = row
      .slice(firstDataCell, row.length)
      .map((cell, cellIndex) => {
        const measurementInformation = measurements[cellIndex];
        const generatedCell = generateMatrixCell(measurementInformation, cell);

        return generatedCell;
      });

    if (hasSecondDimension) {
      const currentDim1Entry = row[0].qText;
      const isSameDimension1AsPrevious = currentDim1Entry === previousDim1Entry;
      if (isSameDimension1AsPrevious) {
        const updatedRow = matrix[matrix.length - 1].concat(matrixRow);

        matrix = [
          ...matrix.slice(0, matrix.length - 1),
          updatedRow
        ];
      } else {
        matrix[matrix.length] = matrixRow;
      }
      previousDim1Entry = currentDim1Entry;
    } else {
      matrix[matrix.length] = matrixRow;
    }
  });

  // filter header dimensions to only have distinct values

  return {
    dimension1: distinctArray(dimension1),
    dimension2: distinctArray(dimension2),
    matrix,
    measurements
  };
}

async function initializeTransformed ({ $element, layout, component }) {
  const colors = initializeColors({ layout });
  const dimensionsInformation = component.backendApi.getDimensionInfos();
  const measurementsInformation = component.backendApi.getMeasureInfos();
  const dimensionCount = layout.qHyperCube.qDimensionInfo.length;
  const rowCount = component.backendApi.getRowCount();
  const maxLoops = layout.maxloops;
  const {
    dimension1,
    dimension2,
    measurements,
    matrix
  } = generateDataSet(component, dimensionsInformation, measurementsInformation);

  const customSchemaBasic = [];
  const customSchemaFull = [];
  let customHeadersCount = 0;

  function readCustomSchema () {
    const url = `/Extensions/qlik-smart-pivot/${layout.customfile}`;

    return jQuery.get(url).then(response => {
      const allTextLines = response.split(/\r\n|\n/);
      const headers = allTextLines[0].split(';');
      customHeadersCount = headers.length;
      for (let lineNumber = 0; lineNumber < allTextLines.length; lineNumber += 1) {
        customSchemaFull[lineNumber] = new Array(headers.length);
        const data = allTextLines[lineNumber].split(';');

        if (data.length === headers.length) {
          for (let headerIndex = 0; headerIndex < headers.length; headerIndex += 1) {
            customSchemaBasic[lineNumber] = data[0];
            customSchemaFull[lineNumber][headerIndex] = data[headerIndex];
          }
        }
      }
    });
  }

  const hasCustomSchema = (layout.customfilebool && layout.customfile.length > 4);
  const schemaPromise = hasCustomSchema ? readCustomSchema() : Promise.resolve();
  await schemaPromise;

  // top level properties could be reducers and then components connect to grab what they want,
  // possibly with reselect for some presentational transforms (moving some of the presentational logic like formatting and such)
  const transformedProperties = {
    data: {
      headers: {
        dimension1, // column headers
        dimension2, // parent row headers if exists
        measurements // row headers, looped for each dimension2 if exists
      },
      matrix, // 2d array of all rows/cells to render in body of datatable
      meta: {
        dimensionCount: dimensionsInformation.length
      }
    },
    general: {
      allowExcelExport: layout.allowexportxls,
      cellSuffix: getCellSuffix(layout.columnwidthslider), // TOOD: move to matrix cells or is it headers.measurements?
      errorMessage: layout.errormessage,
      maxLoops
    },
    selection: {
      dimensionSelectionCounts: dimensionsInformation.map(dimensionInfo => dimensionInfo.qStateCounts.qSelected)
    },
    styling: {
      colors,
      customCSV: {
        basic: customSchemaBasic,
        count: customHeadersCount,
        full: customSchemaFull
      },
      hasCustomFileStyle: layout.customfilebool,
      headerOptions: {
        alignment: getAlignment(layout.HeaderAlign),
        colorSchema: colors[`vColLib${layout.HeaderColorSchema}`],
        fontSizeAdjustment: getFontSizeAdjustment(layout.lettersizeheader),
        textColor: layout.HeaderTextColorSchema
      },
      options: {
        backgroundColor: colors[`vColLib${layout.ColorSchema}`],
        backgroundColorOdd: colors[`vColLib${layout.ColorSchema}P`],
        color: layout.BodyTextColorSchema,
        fontFamily: layout.FontFamily,
        fontSizeAdjustment: getFontSizeAdjustment(layout.lettersize)
      },
      semaphoreColors: {
        fieldsToApplyTo: {
          applyToAll: layout.allsemaphores,
          specificFields: [
            layout.conceptsemaphore1,
            layout.conceptsemaphore2,
            layout.conceptsemaphore3,
            layout.conceptsemaphore4,
            layout.conceptsemaphore5,
            layout.conceptsemaphore6,
            layout.conceptsemaphore7,
            layout.conceptsemaphore9,
            layout.conceptsemaphore10
          ]
        },
        status: {
          critical: layout.metricstatus1,
          medium: layout.metricstatus2
        },
        statusColors: {
          critical: {
            backgroundColor: layout.colorstatus1.color,
            color: layout.colorstatus1text.color
          },
          medium: {
            backgroundColor: layout.colorstatus2.color,
            color: layout.colorstatus2text.color
          },
          normal: {
            backgroundColor: layout.colorstatus3.color,
            color: layout.colorstatus3text.color
          }
        }
      },
      symbolForNulls: layout.symbolfornulls,
      usePadding: layout.indentbool,
      useSeparatorColumns: dimensionCount === 1 ? false : layout.separatorcols
    }
  };

  if (rowCount > lastRow && rowCount <= (maxLoops * 1000)) {
    const requestPage = [
      {
        qHeight: Math.min(1000, rowCount - lastRow),
        qLeft: 0,
        qTop: matrix.length,
        qWidth: 10 // should be # of columns
      }
    ];
    component.backendApi.getData(requestPage).then(() => {
      component.paint($element, layout);
    });
  }


  return transformedProperties;
}

export default initializeTransformed;
