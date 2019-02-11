import { onlyUnique } from './utilities';
import initializeTransformed from './initialize-transformed';

async function initialize ({ $element, layout, component }) {
  const transformedProperties = await initializeTransformed({
    $element,
    component,
    layout
  });

  // TODO: remove everything from here to return statement once jquery parts in paint has been refactored
  const vMaxLoops = layout.maxloops;
  const vErrorMessage = layout.errormessage;
  let vDimName = '';
  const ConceptMatrixFirst = new Array();
  const ConceptMatrixSecond = new Array();
  const LabelsArray = new Array();
  const ArrayGetSelectedCount = new Array();
  let vNumDims = 0;
  let vNumMeasures = 0;
  const MeasuresFormat = new Array();
  const dim_count = layout.qHyperCube.qDimensionInfo.length;
  const measure_count = layout.qHyperCube.qMeasureInfo.length;
  let vSeparatorCols = layout.separatorcols;
  if (dim_count == 1) {
    vSeparatorCols = false;
  }
  let lastrow = 0;
  const ConceptMatrix = new Array();
  let ConceptMatrixRowElem = new Array();
  let ConceptMatrixColElem = new Array();
  const ConceptMatrixColElemTable = new Array();
  const ConceptMatrixPivot = new Array();
  let ConceptMatrixFirstClean = new Array();
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

  const properties = {
    ConceptMatrixColElem,
    ConceptMatrixColElemTable,
    ConceptMatrixRowElem
  };

  return {
    properties,
    ...transformedProperties
  };
}

export default initialize;
