import $ from 'jquery';
import { onlyUnique } from './utilities';

export function generateHeaderWrapper (
  $element,
  layout,
  component,
  colors
) {
  var nMeasAux = 0;
  var sufixWrap = '';
  var vMaxLoops = layout.maxloops;
  var vErrorMessage = layout.errormessage;
  var vDynamicColorHeader = 'vColLib' + layout.HeaderColorSchema;
  var vHeaderColorSchema = colors[vDynamicColorHeader];
  var vExportToExcel = layout.allowexportxls;
  var vHeaderColorText = layout.HeaderTextColorSchema;
  var vHeaderAlign = layout.HeaderAlign;
  var vHeaderAlignText = '';
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
  var vLetterSizeHeader = 0;
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
  var vDimName = '';
  var ConceptMatrixFirst = new Array();
  var ConceptMatrixSecond = new Array();
  var SecondHeaderLength = 0;
  var LabelsArray = new Array();
  var ExtraLabelsArray = new Array();
  var vExtraLabel = '';
  var vExcelButtonCode = '';
  var nRows = component.backendApi.getRowCount();
  var ArrayGetSelectedCount = new Array();
  var vNumDims = 0;
  var vNumMeasures = 0;
  var vNumMeasures2 = 0;
  var MeasuresFormat = new Array();
  var sufixCells = '';
  switch (layout.columnwidthslider) {
    case 1:
      sufixCells += '-s';
      break;
    case 2:
      sufixCells += '';
      break;
    case 3:
      sufixCells += '-l';
      break;
    default:
      sufixCells += '';
      break;
  }
  var dim_count = layout.qHyperCube.qDimensionInfo.length;
  var measure_count = layout.qHyperCube.qMeasureInfo.length;
  var vSeparatorCols = layout.separatorcols;
  if (dim_count == 1) {
    vSeparatorCols = false;
  }
  var vFontFamily = layout.FontFamily;
  var lastrow = 0;
  var ConceptMatrix = new Array();
  var ConceptMatrixRowElem = new Array();
  var ConceptMatrixColElem = new Array();
  var ConceptMatrixColElemTable = new Array();
  var ConceptMatrixPivot = new Array();
  var ConceptMatrixFirstClean = new Array();
  var vLetterSize = 0;
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

  let html = '';
  html += "<div class='header-wrapper'> <table class='header'><tr>";

  //render titles
  $.each(component.backendApi.getDimensionInfos(), function (e, t) {
    ArrayGetSelectedCount.push(t.qStateCounts.qSelected);
    vDimName = t.qFallbackTitle;
    if (vNumDims == 0) {
      LabelsArray.push(vDimName);
    }
    vNumDims++;
    if (dim_count == 1) {
      if (vExportToExcel) {
        vExcelButtonCode = '<input class = "icon-xls" type = "image" src="/Extensions/PLSmartPivot/Excel.png">';
      } else {
        vExcelButtonCode = '';
      }
      html += '<th class="fdim-cells" style="cursor:default;color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (17 + vLetterSizeHeader) + 'px;height:70px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + t.qFallbackTitle + '</th>';
    }
  });
  $.each(component.backendApi.getMeasureInfos(), function (e, t) {
    vDimName = t.qFallbackTitle;
    LabelsArray.push(vDimName);
    var mfor = '';

    if (t.qNumFormat.qType == 'U' || t.qNumFormat.qFmt == '##############') {
      mfor = '#.##0'; //in case of undefined
    } else {
      if (t.qNumFormat.qType == 'R') {
        mfor = t.qNumFormat.qFmt;
        mfor = mfor.replace(/(|)/gi, '');
      } else {
        mfor = t.qNumFormat.qFmt;
      }
    }

    MeasuresFormat.push(mfor);

    switch (mfor.substr(mfor.length - 1)) {
      case 'm':
        vExtraLabel = ' (M)';
        ExtraLabelsArray.push(' (M)');
        break;
      case 'M':
        vExtraLabel = ' (M)';
        ExtraLabelsArray.push(' (M)');
        break;
      case 'k':
        vExtraLabel = ' (k)';
        ExtraLabelsArray.push(' (k)');
        break;
      case 'K':
        vExtraLabel = ' (k)';
        ExtraLabelsArray.push(' (k)');
        break;
      default:
        vExtraLabel = '';
        ExtraLabelsArray.push('');
        break;
    }
    vNumMeasures++;
    if (dim_count == 1) {
      if (((t.qFallbackTitle + vExtraLabel).length > 11 && vLetterSizeHeader == 0)
        || ((t.qFallbackTitle + vExtraLabel).length > 12 && vLetterSizeHeader == -2)) {
        sufixWrap = '70';
      } else {
        sufixWrap = 'Empty';
      }
      html += '<th class="grid-cells2' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (15 + vLetterSizeHeader) + 'px;height:70px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass' + sufixWrap + '" style="font-family:' + vFontFamily + '">' + t.qFallbackTitle + vExtraLabel + '</span></th>';
    }
  });

  //order the info in particular arrays
  component.backendApi.eachDataRow(function (t, a) {
    lastrow = t;

    var vNumMeasuresPlus = vNumMeasures + 1;

    ConceptMatrix[t] = new Array();
    ConceptMatrix[t][0] = a[0].qText;

    ConceptMatrixFirst[t] = a[0].qText;
    ConceptMatrixRowElem[t] = a[0].qElemNumber;
    var nMeasures = 0;
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
  if (nRows > (lastrow + 1) && nRows <= (vMaxLoops * 1000)) {
    var requestPage = [{
      qTop: lastrow + 1,
      qLeft: 0,
      qWidth: 10, //should be # of columns
      qHeight: Math.min(1000, nRows - lastrow)
    }];

    component.backendApi.getData(requestPage).then(function () {
      component.paint($element);
    });
  }

  if (nRows >= (vMaxLoops * 1000)) {
    alert(vErrorMessage);
  }

  // particular headers in case you have more than 1 dimension
  if (vNumDims == 2) {
    //new array with unique values for 2nd dim

    var SecondHeader = ConceptMatrixSecond.filter(onlyUnique);//second dimension concepts
    ConceptMatrixRowElem = ConceptMatrixRowElem.filter(onlyUnique);//first dimension concepts
    ConceptMatrixColElem = ConceptMatrixColElem.filter(onlyUnique);//dimension code for further selections
    var eo = ConceptMatrixColElem.length;
    var vLoopColsMeasures = 1;
    ConceptMatrixColElemTable[0] = ConceptMatrixColElem[0];
    for (var xx = 0; xx < eo; xx++) {
      if (vSeparatorCols && xx > 0) {
        ConceptMatrixColElemTable[vLoopColsMeasures] = ConceptMatrixColElem[xx];
        vLoopColsMeasures++;
      }

      for (var xxx = 0; xxx < vNumMeasures; xxx++) {
        ConceptMatrixColElemTable[vLoopColsMeasures] = ConceptMatrixColElem[xx];
        vLoopColsMeasures++;
      }
    }

    ConceptMatrixFirstClean = ConceptMatrixFirst.filter(onlyUnique);
    SecondHeaderLength = SecondHeader.length;
    vNumMeasures2 = vNumMeasures * SecondHeaderLength;

    if (measure_count > 1) {
      if (vExportToExcel) {
        vExcelButtonCode = '<input class = "icon-xls" type = "image" src="/Extensions/PLSmartPivot/Excel.png">';
      } else {
        vExcelButtonCode = '';
      }

      html += '<th class="fdim-cells" rowspan="2" padding-left="20px" style="cursor:default;color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (16 + vLetterSizeHeader) + 'px;height:80px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + LabelsArray[0] + '</th>';

      for (var nSecond = 0; nSecond < SecondHeaderLength; nSecond++) {//second dimension header
        if (vSeparatorCols && nSecond > 0) {
          html += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (13 + vLetterSizeHeader) + 'px">' + '*' + '</th>';
        }

        html += '<th class="grid-cells2' + sufixCells + '" colspan="' + measure_count + '"; style="color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:45px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + SecondHeader[nSecond] + '</th>';
      }
      html += '</tr>';

      html += '<tr>';
      for (var nSecond2 = 0; nSecond2 < SecondHeaderLength; nSecond2++) {//metrics label header
        if (vSeparatorCols && nSecond2 > 0) {
          html += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
        }
        for (var nMeas = 1; nMeas <= measure_count; nMeas++) {
          nMeasAux = nMeas - 1;
          if (MeasuresFormat[nMeasAux].substring(MeasuresFormat[nMeasAux].length - 1) == '%') {
            html += '<th class="grid-cells2-small' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (13 + vLetterSizeHeader) + 'px;height:25px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass25">' + LabelsArray[nMeas] + ExtraLabelsArray[nMeas - 1] + '</span></th>';
          } else {
            html += '<th class="grid-cells2' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:25px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass25">' + LabelsArray[nMeas] + ExtraLabelsArray[nMeas - 1] + '</span></th>';
          }
        }
      }
    } else {
      if (vExportToExcel) {
        vExcelButtonCode = '<input class = "icon-xls" type = "image" src="/Extensions/PLSmartPivot/Excel.png">';
      } else {
        vExcelButtonCode = '';
      }
      html += '<th class="fdim-cells" style="cursor:default;color:' + vHeaderColorText + ';background-color:' + vHeaderColorSchema + ';font-family:' + vFontFamily + ';font-size:' + (16 + vLetterSizeHeader) + 'px;height:70px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + LabelsArray[0] + ExtraLabelsArray[0] + '</th>';

      for (var nSecond = 0; nSecond < SecondHeaderLength; nSecond++) {
        if (vSeparatorCols && nSecond > 0) {
          html += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
        }
        if ((SecondHeader[nSecond].length > 11 && vLetterSizeHeader == 0)
          || (SecondHeader[nSecond].length > 12 && vLetterSizeHeader == -2)) {
          sufixWrap = '70';
        } else {
          sufixWrap = 'Empty';
        }
        html += '<th class="grid-cells2' + sufixCells + '" style="color:' + vHeaderColorText + ';background-color:' + vHeaderColorSchema + ';font-family:' + vFontFamily + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:70px' + ';vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass' + sufixWrap + '" style="font-family:' + vFontFamily + '">' + SecondHeader[nSecond] + '</span></th>';
      }
    }

    // in this loop I load the final pivot matrix
    var ConceptPos = 0;
    var nMeas3 = 0;
    var vHeaderIndex = 0;
    var MeasurePos = 0;
    for (var nPivotElems = 0; nPivotElems <= lastrow; nPivotElems++) {
      ConceptMatrixPivot[nPivotElems] = new Array();
      ConceptPos = ConceptMatrixFirstClean.indexOf(ConceptMatrix[nPivotElems][0]);
      ConceptMatrixPivot[ConceptPos][0] = ConceptMatrix[nPivotElems][0];

      for (var nMeas2 = 1; nMeas2 <= measure_count; nMeas2++) {
        nMeas3 = nMeas2 + 1;
        vHeaderIndex = (SecondHeader.indexOf(ConceptMatrix[nPivotElems][1]) + 1);
        MeasurePos = (vHeaderIndex * measure_count) + (nMeas2 - measure_count);
        ConceptMatrixPivot[ConceptPos][MeasurePos] = ConceptMatrix[nPivotElems][nMeas3];
      }
    }
  }
  html += '</tr>';
  html += '</table></div>';

  return {
    html,
    nMeasAux,
    ArrayGetSelectedCount,
    vNumDims,
    measure_count,
    MeasuresFormat,
    vNumMeasures,
    vNumMeasures2,
    sufixCells,
    vFontFamily,
    lastrow,
    ConceptMatrix,
    ConceptMatrixColElem,
    ConceptMatrixColElemTable,
    ConceptMatrixRowElem,
    ConceptMatrixFirstClean,
    vSeparatorCols,
    vLetterSize,
    ConceptMatrixPivot
  };
}
