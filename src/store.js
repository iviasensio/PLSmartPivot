import { onlyUnique } from './utilities';

function initialize ({ $element, layout, component }) {
  const colors = {
    vColLibClean: layout.collibclean,
    vColLibSoft: layout.collibsoft,
    vColLibDark: layout.collibdark,
    vColLibNight: layout.collibnight,
    vColLibRed: layout.collibred,
    vColLibOrange: layout.colliborange,
    vColLibBlue: layout.collibblue,
    vColLibGreen: layout.collibgreen,
    vColLibViolete: layout.collibviolete,
    vColLibCustom: layout.collibcustom,
    vColLibCleanP: layout.collibcleanp,
    vColLibSoftP: layout.collibsoftp,
    vColLibDarkP: layout.collibdarkp,
    vColLibNightP: layout.collibnightp,
    vColLibRedP: layout.collibredp,
    vColLibOrangeP: layout.colliborangep,
    vColLibBlueP: layout.collibbluep,
    vColLibGreenP: layout.collibgreenp,
    vColLibVioleteP: layout.collibvioletep,
    vColLibCustomP: layout.collibcustomp
  };

  const nMeasAux = 0;
  const vMaxLoops = layout.maxloops;
  const vErrorMessage = layout.errormessage;
  const vDynamicColorHeader = `vColLib${layout.HeaderColorSchema}`;
  const vHeaderColorSchema = colors[vDynamicColorHeader];
  const vExportToExcel = layout.allowexportxls;
  const vHeaderColorText = layout.HeaderTextColorSchema;
  const vHeaderAlign = layout.HeaderAlign;
  let vHeaderAlignText = '';
  switch (vHeaderAlign) {
    case 1:
      vHeaderAlignText = 'left';
      break;
    case 2:
      vHeaderAlignText = 'center';
      break;
    case 3:
      vHeaderAlignText = 'right';
      break;
  }
  let vLetterSizeHeader = 0;
  switch (layout.lettersizeheader) {
    case 1:
      vLetterSizeHeader = -2;
      break;
    case 2:
      vLetterSizeHeader = 0;
      break;
    case 3:
      vLetterSizeHeader = 2;
      break;
  }
  let vDimName = '';
  const ConceptMatrixFirst = new Array();
  const ConceptMatrixSecond = new Array();
  let SecondHeaderLength = 0;
  const LabelsArray = new Array();
  const ExtraLabelsArray = new Array();
  let vExtraLabel = '';
  const vExcelButtonCode = '';
  const ArrayGetSelectedCount = new Array();
  let vNumDims = 0;
  let vNumMeasures = 0;
  let vNumMeasures2 = 0;
  const MeasuresFormat = new Array();
  let sufixCells = '';
  switch (layout.columnwidthslider) {
    case 1:
      sufixCells += '-s';
      break;
    case 2:
      sufixCells = String(sufixCells);
      break;
    case 3:
      sufixCells += '-l';
      break;
    default:
      sufixCells = String(sufixCells);
      break;
  }
  const dim_count = layout.qHyperCube.qDimensionInfo.length;
  const measure_count = layout.qHyperCube.qMeasureInfo.length;
  let vSeparatorCols = layout.separatorcols;
  if (dim_count == 1) {
    vSeparatorCols = false;
  }
  const vFontFamily = layout.FontFamily;
  let lastrow = 0;
  const ConceptMatrix = new Array();
  let ConceptMatrixRowElem = new Array();
  let ConceptMatrixColElem = new Array();
  const ConceptMatrixColElemTable = new Array();
  const ConceptMatrixPivot = new Array();
  let ConceptMatrixFirstClean = new Array();
  let vLetterSize = 0;
  switch (layout.lettersize) {
    case 1:
      vLetterSize = -2;
      break;
    case 2:
      vLetterSize = -1;
      break;
    case 3:
      vLetterSize = 2;
      break;
  }
  const nRows = component.backendApi.getRowCount();

  const dimensionInfos = component.backendApi.getDimensionInfos();
  LabelsArray.push(dimensionInfos[0].qFallbackTitle);
  ArrayGetSelectedCount.concat(dimensionInfos.map(dimensionInfo => dimensionInfo.qStateCounts.qSelected));
  vNumDims += dimensionInfos.length;

  const measureInfos = component.backendApi.getMeasureInfos();
  measureInfos.forEach(measureInfo => {
    vDimName = measureInfo.qFallbackTitle;
    LabelsArray.push(vDimName);
    let mfor = '';

    if (measureInfo.qNumFormat.qType == 'U' || measureInfo.qNumFormat.qFmt == '##############') {
      mfor = '#.##0'; // in case of undefined
    } else if (measureInfo.qNumFormat.qType == 'R') {
      mfor = measureInfo.qNumFormat.qFmt;
      mfor = mfor.replace(/(|)/gi, '');
    } else {
      mfor = measureInfo.qNumFormat.qFmt;
    }

    MeasuresFormat.push(mfor);

    switch (mfor.substr(mfor.length - 1).toLowerCase()) {
      case 'm':
        vExtraLabel = ' (M)';
        ExtraLabelsArray.push(' (M)');
        break;
      case 'k':
        vExtraLabel = ' (k)';
        ExtraLabelsArray.push(' (k)');
        break;
      default:
        vExtraLabel = '';
        ExtraLabelsArray.push('');
        break;
    }
    vNumMeasures++;
  });

  component.backendApi.eachDataRow((t, a) => {
    lastrow = t;

    const vNumMeasuresPlus = vNumMeasures + 1;

    ConceptMatrix[t] = new Array();
    ConceptMatrix[t][0] = a[0].qText;

    ConceptMatrixFirst[t] = a[0].qText;
    ConceptMatrixRowElem[t] = a[0].qElemNumber;
    let nMeasures = 0;
    if (vNumDims == 1) {
      for (nMeasures = 1; nMeasures <= vNumMeasures; nMeasures++) {
        ConceptMatrix[t][nMeasures] = a[nMeasures].qNum;
      }
    } else {
      ConceptMatrix[t][1] = a[1].qText;
      ConceptMatrixColElem[t] = a[1].qElemNumber;
      ConceptMatrixSecond[t] = a[1].qText;
      // set the hipercube in a plain array without pivoting
      for (nMeasures = 2; nMeasures <= vNumMeasuresPlus; nMeasures++) {
        ConceptMatrix[t][nMeasures] = a[nMeasures].qNum;
      }
    }
  });

  ConceptMatrixFirstClean = ConceptMatrixFirst.filter(onlyUnique);

  if (nRows >= (vMaxLoops * 1000)) {
    alert(vErrorMessage);
  }

  if (vNumDims == 2) {
    // new array with unique values for 2nd dim
    var SecondHeader = ConceptMatrixSecond.filter(onlyUnique);// second dimension concepts
    ConceptMatrixRowElem = ConceptMatrixRowElem.filter(onlyUnique);// first dimension concepts
    ConceptMatrixColElem = ConceptMatrixColElem.filter(onlyUnique);// dimension code for further selections
    const eo = ConceptMatrixColElem.length;
    let vLoopColsMeasures = 1;
    ConceptMatrixColElemTable[0] = ConceptMatrixColElem[0];
    for (let xx = 0; xx < eo; xx++) {
      if (vSeparatorCols && xx > 0) {
        ConceptMatrixColElemTable[vLoopColsMeasures] = ConceptMatrixColElem[xx];
        vLoopColsMeasures++;
      }

      for (let xxx = 0; xxx < vNumMeasures; xxx++) {
        ConceptMatrixColElemTable[vLoopColsMeasures] = ConceptMatrixColElem[xx];
        vLoopColsMeasures++;
      }
    }

    SecondHeaderLength = SecondHeader.length;
    vNumMeasures2 = vNumMeasures * SecondHeaderLength;

    let ConceptPos = 0;
    let nMeas3 = 0;
    let vHeaderIndex = 0;
    let MeasurePos = 0;
    for (let nPivotElems = 0; nPivotElems <= lastrow; nPivotElems++) {
      ConceptMatrixPivot[nPivotElems] = new Array();
      ConceptPos = ConceptMatrixFirstClean.indexOf(ConceptMatrix[nPivotElems][0]);
      ConceptMatrixPivot[ConceptPos][0] = ConceptMatrix[nPivotElems][0];

      for (let nMeas2 = 1; nMeas2 <= measure_count; nMeas2++) {
        nMeas3 = nMeas2 + 1;
        vHeaderIndex = (SecondHeader.indexOf(ConceptMatrix[nPivotElems][1]) + 1);
        MeasurePos = (vHeaderIndex * measure_count) + (nMeas2 - measure_count);
        ConceptMatrixPivot[ConceptPos][MeasurePos] = ConceptMatrix[nPivotElems][nMeas3];
      }
    }
  }

  if (nRows > (lastrow + 1) && nRows <= (vMaxLoops * 1000)) {
    const requestPage = [
      {
        qTop: lastrow + 1,
        qLeft: 0,
        qWidth: 10, // should be # of columns
        qHeight: Math.min(1000, nRows - lastrow)
      }
    ];
    component.backendApi.getData(requestPage).then(() => {
      component.paint($element);
    });
  }

  const properties = {
    ArrayGetSelectedCount,
    ConceptMatrix,
    ConceptMatrixColElem,
    ConceptMatrixColElemTable,
    ConceptMatrixRowElem,
    ConceptMatrixFirstClean,
    ConceptMatrixPivot,
    vHeaderColorText,
    vFontFamily,
    vHeaderColorSchema,
    vExportToExcel,
    vNumDims,
    nMeasAux,
    dimensionInfos,
    vLetterSizeHeader,
    vHeaderAlignText,
    MeasuresFormat,
    measure_count,
    vExcelButtonCode,
    sufixCells,
    LabelsArray,
    SecondHeader,
    vSeparatorCols,
    nSecond: SecondHeaderLength - 1,
    nSecond2: SecondHeaderLength - 1,
    vLetterSize,
    ExtraLabelsArray,
    dim_count,
    vExtraLabel,
    vNumMeasures,
    vNumMeasures2,
    lastrow,
    measureInfos
  };

  // TODO: figure out a reasonable datastructure and use these for component
  const transformedProperties = {
    dimensions: [],
    headers: LabelsArray,
    headerOptions: {
      colorSchema: vHeaderColorSchema,
      textColor: vHeaderColorText
    },
    options: {
      fontFamily: vFontFamily
    }
  };

  return {
    colors,
    dimensionInfos,
    measureInfos,
    properties,
    transformedProperties
  };
}

export default initialize;
