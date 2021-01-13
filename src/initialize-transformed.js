import { distinctArray } from "./utilities";

export const HEADER_FONT_SIZE = {
  SMALL: -1,
  MEDIUM: 1,
};

function getAlignment(option) {
  const alignmentOptions = {
    1: "left",
    2: "center",
    3: "right",
  };

  return alignmentOptions[option] || "left";
}

function getFontSizeAdjustment(option) {
  const fontSizeAdjustmentOptions = {
    1: HEADER_FONT_SIZE.SMALL,
    2: HEADER_FONT_SIZE.MEDIUM,
  };

  return fontSizeAdjustmentOptions[option] || 0;
}

function generateMeasurements(information) {
  return information.map((measurement) => {
    const transformedMeasurement = {
      format: measurement.qNumFormat.qFmt || "#.##0",
      name: measurement.qFallbackTitle,
    };

    return transformedMeasurement;
  });
}

function generateDimensionEntry(information, data) {
  return {
    displayValue: data.qText || data.qNum,
    elementNumber: data.qElemNumber,
    name: information.qFallbackTitle,
    value: data.qNum,
  };
}

function generateMatrixCell({
  cell,
  dimension1Information,
  dimension2Information,
  measurementInformation,
}) {
  const matrixCell = {
    displayValue: cell.qText,
    format: measurementInformation.format,
    name: measurementInformation.name,
    parents: {
      dimension1: {
        elementNumber: dimension1Information.qElemNumber,
        header: dimension1Information.qText,
      },
      measurement: {
        header: measurementInformation.name,
        index: measurementInformation.index,
      },
    },
    value: cell.qNum,
  };

  if (dimension2Information) {
    matrixCell.parents.dimension2 = {
      elementNumber: dimension2Information.qElemNumber,
      header: dimension2Information.qText,
    };
  }

  return matrixCell;
}

function generateDataSet(
  component,
  dimensionsInformation,
  measurementsInformation,
  dataCube
) {
  const measurements = generateMeasurements(measurementsInformation);
  let dimension1 = [];
  let dimension2 = [];
  let matrix = [];

  const hasSecondDimension = dimensionsInformation.length > 1;
  // eslint-disable-next-line no-undefined
  for (let index = 0; dataCube[index] !== undefined; index++) {
    // eslint-disable-next-line no-loop-func
    dataCube[index].forEach((row) => {
      const dimension1Entry = generateDimensionEntry(
        dimensionsInformation[0],
        row[0]
      );
      dimension1.push(dimension1Entry);
      let dimension2Entry;
      let firstDataCell = 1;
      if (hasSecondDimension) {
        dimension2Entry = generateDimensionEntry(
          dimensionsInformation[1],
          row[1]
        );
        dimension2.push(dimension2Entry);
        firstDataCell = 2;
      }
      let matrixRow = row
        .slice(firstDataCell, row.length)
        .map((cell, cellIndex) => {
          const measurementInformation = measurements[cellIndex];
          measurementInformation.index = cellIndex;
          const dimension1Information = row[0]; // eslint-disable-line prefer-destructuring
          const dimension2Information = hasSecondDimension ? row[1] : null;
          const generatedCell = generateMatrixCell({
            cell,
            dimension1Information,
            dimension2Information,
            measurementInformation,
          });
          return generatedCell;
        });

      let appendToRowIndex = matrix.length;
      if (hasSecondDimension) {
        // See if there already is a row for the current dim1
        for (let i = 0; i < matrix.length; i++) {
          if (
            matrix[i][0].parents.dimension1.header ===
            matrixRow[0].parents.dimension1.header
          ) {
            appendToRowIndex = i;
            matrixRow = matrix[i].concat(matrixRow);
          }
        }
      }
      matrix[appendToRowIndex] = matrixRow;
    });
  }

  // filter header dimensions to only have distinct values
  dimension1 = distinctArray(dimension1);
  dimension2 = distinctArray(dimension2);

  return {
    dimension1: dimension1,
    dimension2: dimension2,
    matrix,
    measurements,
  };
}

function initializeTransformed({
  $element,
  component,
  dataCube,
  designList,
  layout,
}) {
  const dimensionsInformation = component.backendApi.getDimensionInfos();
  const measurementsInformation = component.backendApi.getMeasureInfos();
  const dimensionCount = layout.qHyperCube.qDimensionInfo.length;
  const { dimension1, dimension2, measurements, matrix } = generateDataSet(
    component,
    dimensionsInformation,
    measurementsInformation,
    dataCube
  );

  const customSchemaBasic = [];
  const customSchemaFull = [];
  let customHeadersCount = 0;

  if (designList && designList.length > 0) {
    const headers = designList[0].split(";");
    customHeadersCount = headers.length;
    for (let lineNumber = 0; lineNumber < designList.length; lineNumber += 1) {
      customSchemaFull[lineNumber] = new Array(headers.length);
      const data = designList[lineNumber].split(";");

      if (data.length === headers.length) {
        for (
          let headerIndex = 0;
          headerIndex < headers.length;
          headerIndex += 1
        ) {
          [customSchemaBasic[lineNumber]] = data;
          customSchemaFull[lineNumber][headerIndex] = data[headerIndex];
        }
      }
    }
  }

  let cellWidth;
  if (layout.fitchartwidth) {
    // The widths are calculated based on the current element width. Note: this could use % to set
    // the widths as percentages of the available width. However, this often results in random
    // columns getting 1px wider than the others because of rounding necessary to fill the width.
    // This 1px causes missalignment between the data- and header tables.
    cellWidth = "";
  } else {
    // If using the previous solution just set 60px
    cellWidth = `${
      layout.columnwidthslider > 10 ? layout.columnwidthslider : 60
    }px`;
  }

  // top level properties could be reducers and then components connect to grab what they want,
  // possibly with reselect for some presentational transforms (moving some of the presentational logic like formatting and such)
  const transformedProperties = {
    element: $element[0],
    data: {
      headers: {
        dimension1, // column headers
        dimension2, // parent row headers if exists
        measurements, // row headers, looped for each dimension2 if exists
      },
      matrix, // 2d array of all rows/cells to render in body of datatable
      meta: {
        dimensionCount: dimensionsInformation.length,
      },
    },
    general: {
      allowExcelExport: layout.allowexportxls,
      allowFilteringByClick: layout.filteroncellclick,
      cellWidth: cellWidth,
      errorMessage: layout.errormessage,
      footnote: layout.footnote,
      subtitle: layout.subtitle,
      title: layout.title,
      useColumnSeparator: layout.separatorcols && dimensionCount > 1,
    },
    selection: {
      dimensionSelectionCounts: dimensionsInformation.map(
        (dimensionInfo) => dimensionInfo.qStateCounts.qSelected
      ),
    },
    styling: {
      customCSV: {
        basic: customSchemaBasic,
        count: customHeadersCount,
        full: customSchemaFull,
      },
      hasCustomFileStyle: Boolean(designList),
      headerOptions: {
        alignment: getAlignment(layout.HeaderAlign),
        colorSchema: layout.HeaderColorSchema.color,
        fontSizeAdjustment: getFontSizeAdjustment(layout.lettersizeheader),
        textColor: layout.HeaderTextColorSchema.color,
      },
      options: {
        backgroundColor: layout.rowEvenBGColor,
        backgroundColorOdd: layout.rowOddBGColor,
        color: layout.BodyTextColorSchema,
        fontFamily: layout.FontFamily,
        fontSizeAdjustment: getFontSizeAdjustment(layout.lettersize),
        textAlignment: layout.cellTextAlignment,
      },
      conditionalColoring: {
        enabled: layout.conditionalcoloring.enabled,
        colorAllRows: layout.conditionalcoloring.colorall,
        rows: layout.conditionalcoloring.rows.map((row) => row.rowname),
        colorAllMeasures:
          typeof layout.conditionalcoloring.colorallmeasures === "undefined" ||
          layout.conditionalcoloring.colorallmeasures,
        measures: !layout.conditionalcoloring.measures
          ? []
          : layout.conditionalcoloring.measures
              .split(",")
              .map((index) => Number(index)),
        threshold: {
          poor: layout.conditionalcoloring.threshold_poor,
          fair: layout.conditionalcoloring.threshold_fair,
        },
        colors: {
          poor: {
            color: layout.conditionalcoloring.color_poor,
            textColor: layout.conditionalcoloring.textcolor_poor,
          },
          fair: {
            color: layout.conditionalcoloring.color_fair,
            textColor: layout.conditionalcoloring.textcolor_fair,
          },
          good: {
            color: layout.conditionalcoloring.color_good,
            textColor: layout.conditionalcoloring.textcolor_good,
          },
        },
      },
      symbolForNulls: layout.symbolfornulls,
      usePadding: layout.indentbool,
    },
  };

  return transformedProperties;
}

export default initializeTransformed;
