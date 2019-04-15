import { distinctArray } from './utilities';

export const HEADER_FONT_SIZE = {
  SMALL: -1,
  MEDIUM: 1
};

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
    1: HEADER_FONT_SIZE.SMALL,
    2: HEADER_FONT_SIZE.MEDIUM
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
    displayValue: data.qText || data.qNum,
    elementNumber: data.qElemNumber,
    name: information.qFallbackTitle,
    value: data.qNum
  };
}

function generateMatrixCell ({ cell, dimension1Information, dimension2Information, measurementInformation }) {
  const matrixCell = {
    displayValue: cell.qText,
    format: measurementInformation.format,
    magnitude: measurementInformation.magnitudeLabelSuffix.substring(
      measurementInformation.magnitudeLabelSuffix.length - 2,
      measurementInformation.magnitudeLabelSuffix.length - 1
    ),
    magnitudeLabelSuffix: measurementInformation.magnitudeLabelSuffix,
    name: measurementInformation.name,
    parents: {
      dimension1: {
        elementNumber: dimension1Information.qElemNumber,
        header: dimension1Information.qText
      },
      measurement: {
        header: measurementInformation.name
      }
    },
    value: cell.qNum
  };

  if (dimension2Information) {
    matrixCell.parents.dimension2 = {
      elementNumber: dimension2Information.qElemNumber
    };
  }

  return matrixCell;
}

let lastRow = 0;
function generateDataSet (
  component, dimensionsInformation, measurementsInformation, dataCube) {

  const measurements = generateMeasurements(measurementsInformation);
  let dimension1 = [];
  let dimension2 = [];
  let matrix = [];

  const hasSecondDimension = dimensionsInformation.length > 1;
  dataCube.forEach(row => {
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
    let matrixRow = row
      .slice(firstDataCell, row.length)
      .map((cell, cellIndex) => {
        const measurementInformation = measurements[cellIndex];
        const dimension1Information = row[0]; // eslint-disable-line prefer-destructuring
        const dimension2Information = hasSecondDimension ? row[1] : null;
        const generatedCell = generateMatrixCell({
          cell,
          dimension1Information,
          dimension2Information,
          measurementInformation
        });

        return generatedCell;
      });

    let appendToRowIndex = matrix.length;
    if (hasSecondDimension) {
      // See if there already is a row for the current dim1
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0].parents.dimension1.header === matrixRow[0].parents.dimension1.header) {
          appendToRowIndex = i;
          matrixRow = matrix[i].concat(matrixRow);
        }
      }
    }
    matrix[appendToRowIndex] = matrixRow;
  });

  // filter header dimensions to only have distinct values
  dimension1 = distinctArray(dimension1);
  dimension2 = distinctArray(dimension2);

  // Make sure all rows are saturated, otherwise data risks being displayed in the wrong column
  matrix = matrix.map((row, rowIndex) => {
    if ((hasSecondDimension && row.length == dimension2.length)
      || (!hasSecondDimension && row.length == measurements.length)) {
      // Row is saturated
      return row;
    }

    // Row is not saturated, so must add empty cells to fill the gaps
    let newRow = [];
    if (hasSecondDimension) {
      // Got a second dimension, so need to add measurements for all values of the second dimension
      let rowDataIndex = 0;
      dimension2.forEach(dim => {
        rowDataIndex = appendMissingCells(
          row, newRow, rowDataIndex, measurements, rowIndex, dim.elementNumber);
      });
    } else {
      appendMissingCells(row, newRow, 0, measurements, rowIndex);
    }

    return newRow;
  });

  return {
    dimension1: dimension1,
    dimension2: dimension2,
    matrix,
    measurements
  };
}

/*
 * Appends the cells of the source row, as well as those missing, to the destination row, starting
 * from the given source index. Returns the source index of the next source cell after this has
 * completed. If there is a second dimension the dim2ElementNumber should be set to the current
 * index of the dimension2 value being processed.
 */
function appendMissingCells (
  sourceRow, destRow, sourceIndex, measurements, dim1ElementNumber, dim2ElementNumber = -1) {

  let index = sourceIndex;
  measurements.forEach(measurement => {
    if (index < sourceRow.length
      && (dim2ElementNumber === -1
        || sourceRow[index].parents.dimension2.elementNumber === dim2ElementNumber)
      && sourceRow[index].parents.measurement.header === measurement.name) {
      // Source contains the expected cell
      destRow.push(sourceRow[index]);
      index++;
    } else {
      // Source doesn't contain the expected cell, so add empty
      destRow.push({
        displayValue: '',
        parents: {
          dimension1: { elementNumber: dim1ElementNumber },
          dimension2: { elementNumber: dim2ElementNumber },
          measurement: { header: measurement.name }
        }
      });
    }
  });
  return index;
}

function initializeTransformed ({ $element, component, dataCube, designList, layout }) {
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
  } = generateDataSet(component, dimensionsInformation, measurementsInformation, dataCube);

  const customSchemaBasic = [];
  const customSchemaFull = [];
  let customHeadersCount = 0;

  if (designList && designList.length > 0) {
    const headers = designList[0].split(';');
    customHeadersCount = headers.length;
    for (let lineNumber = 0; lineNumber < designList.length; lineNumber += 1) {
      customSchemaFull[lineNumber] = new Array(headers.length);
      const data = designList[lineNumber].split(';');

      if (data.length === headers.length) {
        for (let headerIndex = 0; headerIndex < headers.length; headerIndex += 1) {
          [customSchemaBasic[lineNumber]] = data;
          customSchemaFull[lineNumber][headerIndex] = data[headerIndex];
        }
      }
    }
  }

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
      allowFilteringByClick: layout.filteroncellclick,
      cellSuffix: getCellSuffix(layout.columnwidthslider), // TOOD: move to matrix cells or is it headers.measurements?
      errorMessage: layout.errormessage,
      footnote: layout.footnote,
      maxLoops,
      subtitle: layout.subtitle,
      title: layout.title
    },
    selection: {
      dimensionSelectionCounts: dimensionsInformation.map(dimensionInfo => dimensionInfo.qStateCounts.qSelected)
    },
    styling: {
      customCSV: {
        basic: customSchemaBasic,
        count: customHeadersCount,
        full: customSchemaFull
      },
      hasCustomFileStyle: Boolean(designList),
      headerOptions: {
        alignment: getAlignment(layout.HeaderAlign),
        colorSchema: layout.HeaderColorSchema.color,
        fontSizeAdjustment: getFontSizeAdjustment(layout.lettersizeheader),
        textColor: layout.HeaderTextColorSchema.color
      },
      options: {
        backgroundColor: layout.rowEvenBGColor,
        backgroundColorOdd: layout.rowOddBGColor,
        color: layout.BodyTextColorSchema,
        fontFamily: layout.FontFamily,
        fontSizeAdjustment: getFontSizeAdjustment(layout.lettersize),
        textAlignment: layout.cellTextAlignment
      },
      conditionalColoring: {
        enabled: layout.conditionalcoloring.enabled,
        colorAllRows: layout.conditionalcoloring.colorall,
        rows: layout.conditionalcoloring.rows.map(row => row.rowname),
        threshold: {
          poor: layout.conditionalcoloring.threshold_poor,
          fair: layout.conditionalcoloring.threshold_fair
        },
        colors: {
          poor: {
            color: layout.conditionalcoloring.color_poor,
            textColor: layout.conditionalcoloring.textcolor_poor
          },
          fair: {
            color: layout.conditionalcoloring.color_fair,
            textColor: layout.conditionalcoloring.textcolor_fair
          },
          good: {
            color: layout.conditionalcoloring.color_good,
            textColor: layout.conditionalcoloring.textcolor_good
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
