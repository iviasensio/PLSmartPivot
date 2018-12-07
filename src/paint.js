
import $ from 'jquery';

export default function paint($element, component) {
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  var isChrome = !!window.chrome && !!window.chrome.webstore;
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
  var isFirefox = typeof InstallTrigger !== 'undefined';
  var sufixCells = '';
  var sufixWrap = '';
  switch (component.backendApi.model.layout.columnwidthslider) {
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

  var dim_count = component.backendApi.model.layout.qHyperCube.qDimensionInfo.length;
  var measure_count = component.backendApi.model.layout.qHyperCube.qMeasureInfo.length;

  var myTitle = '';
  var mySubTitle = '';
  var myFootNote = '';
  if (component.backendApi.model.layout.title.length > 0) {
    myTitle += '<p style="font-size:15pt"><b>';
    myTitle += component.backendApi.model.layout.title;
    myTitle += '</b></p>';
  }
  if (component.backendApi.model.layout.subtitle.length > 0) {
    mySubTitle += '<p style="font-size:11pt">';
    mySubTitle += component.backendApi.model.layout.subtitle;
    mySubTitle += '</p>';
  }
  if (component.backendApi.model.layout.footnote.length > 0) {
    myFootNote += '<p style="font-size:11pt"><i>Note:</i>';
    myFootNote += component.backendApi.model.layout.footnote;
    myFootNote += '</p>';
  }

  var vMaxLoops = component.backendApi.model.layout.maxloops;
  var vErrorMessage = component.backendApi.model.layout.errormessage;

  var vSeparatorCols = component.backendApi.model.layout.separatorcols;
  if (dim_count == 1) {
    vSeparatorCols = false;
  }

  var vCustomFileBool = component.backendApi.model.layout.customfilebool;
  var vCustomFile = component.backendApi.model.layout.customfile;

  var vPadding = component.backendApi.model.layout.indentbool;
  var vPaddingText = '';

  var vGlobalComas = 0;
  var vGlobalComas2 = 0;
  var vGlobalComment = 0;
  var vGlobalCommentColor = '';
  var vGlobalFontSize = 0;
  var vComas = 0;
  var vMedium = false;

  var vHeaderAlign = component.backendApi.model.layout.HeaderAlign;

  var vColLibClean = component.backendApi.model.layout.collibclean;
  var vColLibSoft = component.backendApi.model.layout.collibsoft;
  var vColLibDark = component.backendApi.model.layout.collibdark;
  var vColLibNight = component.backendApi.model.layout.collibnight;
  var vColLibRed = component.backendApi.model.layout.collibred;
  var vColLibOrange = component.backendApi.model.layout.colliborange;
  var vColLibBlue = component.backendApi.model.layout.collibblue;
  var vColLibGreen = component.backendApi.model.layout.collibgreen;
  var vColLibViolete = component.backendApi.model.layout.collibviolete;
  var vColLibCustom = component.backendApi.model.layout.collibcustom;

  var vColLibCleanP = component.backendApi.model.layout.collibcleanp;
  var vColLibSoftP = component.backendApi.model.layout.collibsoftp;
  var vColLibDarkP = component.backendApi.model.layout.collibdarkp;
  var vColLibNightP = component.backendApi.model.layout.collibnightp;
  var vColLibRedP = component.backendApi.model.layout.collibredp;
  var vColLibOrangeP = component.backendApi.model.layout.colliborangep;
  var vColLibBlueP = component.backendApi.model.layout.collibbluep;
  var vColLibGreenP = component.backendApi.model.layout.collibgreenp;
  var vColLibVioleteP = component.backendApi.model.layout.collibvioletep;
  var vColLibCustomP = component.backendApi.model.layout.collibcustomp;

  const colors = {
    vColLibClean,
    vColLibSoft,
    vColLibDark,
    vColLibNight,
    vColLibRed,
    vColLibOrange,
    vColLibBlue,
    vColLibGreen,
    vColLibViolete,
    vColLibCustom,
    vColLibCleanP,
    vColLibSoftP,
    vColLibDarkP,
    vColLibNightP,
    vColLibRedP,
    vColLibOrangeP,
    vColLibBlueP,
    vColLibGreenP,
    vColLibVioleteP,
    vColLibCustomP,
  };

  var vDynamicColorHeader = 'vColLib' + component.backendApi.model.layout.HeaderColorSchema;
  var vDynamicColorBody = 'vColLib' + component.backendApi.model.layout.ColorSchema;
  var vDynamicColorBodyP = 'vColLib' + component.backendApi.model.layout.ColorSchema + 'P';

  var vHeaderColorSchema = colors[vDynamicColorHeader];
  var vColorSchema = colors[vDynamicColorBody];
  var vColorSchemaP = colors[vDynamicColorBodyP];

  var vExportToExcel = component.backendApi.model.layout.allowexportxls;
  var vFontFamily = component.backendApi.model.layout.FontFamily;
  var vFontSize = '';

  var vColorText = component.backendApi.model.layout.BodyTextColorSchema;
  var vDivide = 1;
  var nMeasAux = 0;

  var vHeaderColorText = component.backendApi.model.layout.HeaderTextColorSchema;

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

  var vLetterSize = 0;
  var vLetterSizeHeader = 0;
  switch (component.backendApi.model.layout.lettersizeheader) {
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
  switch (component.backendApi.model.layout.lettersize) {
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

  var vSymbolForNulls = component.backendApi.model.layout.symbolfornulls;

  var vAllSemaphores = component.backendApi.model.layout.allsemaphores;
  var ConceptsAffectedMatrix = new Array(10);
  if (vAllSemaphores == false) {
    ConceptsAffectedMatrix[0] = component.backendApi.model.layout.conceptsemaphore1;
    ConceptsAffectedMatrix[1] = component.backendApi.model.layout.conceptsemaphore2;
    ConceptsAffectedMatrix[2] = component.backendApi.model.layout.conceptsemaphore3;
    ConceptsAffectedMatrix[3] = component.backendApi.model.layout.conceptsemaphore4;
    ConceptsAffectedMatrix[4] = component.backendApi.model.layout.conceptsemaphore5;
    ConceptsAffectedMatrix[5] = component.backendApi.model.layout.conceptsemaphore6;
    ConceptsAffectedMatrix[6] = component.backendApi.model.layout.conceptsemaphore7;
    ConceptsAffectedMatrix[7] = component.backendApi.model.layout.conceptsemaphore8;
    ConceptsAffectedMatrix[8] = component.backendApi.model.layout.conceptsemaphore9;
    ConceptsAffectedMatrix[9] = component.backendApi.model.layout.conceptsemaphore10;
  }

  var vAllMetrics = component.backendApi.model.layout.allmetrics;
  var MetricsAffectedMatrix = JSON.parse('[' + component.backendApi.model.layout.metricssemaphore + ']');

  var vColorMetric1 = component.backendApi.model.layout.colorstatus1.color;
  var vColorMetric2 = component.backendApi.model.layout.colorstatus2.color;
  var vColorMetric3 = component.backendApi.model.layout.colorstatus3.color;
  var vColorMetric1Text = component.backendApi.model.layout.colorstatus1text.color;
  var vColorMetric2Text = component.backendApi.model.layout.colorstatus2text.color;
  var vColorMetric3Text = component.backendApi.model.layout.colorstatus3text.color;
  var vColorSemaphore = '';
  var vColorSemaphoreText = '';

  var vCritic = component.backendApi.model.layout.metricsstatus1;
  var vMMedium = component.backendApi.model.layout.metricsstatus2;

  var vDimName = '';
  var CustomArray = new Array();
  var CustomArrayBasic = new Array();
  var vNumCustomHeaders = 0;

  var ConceptMatrix = new Array();
  var ConceptMatrixFirst = new Array();
  var ConceptMatrixRowElem = new Array();
  var ConceptMatrixSecond = new Array();
  var ConceptMatrixColElem = new Array();
  var ConceptMatrixColElemTable = new Array();
  var ConceptMatrixPivot = new Array();
  var ArrayGetSelectedCount = new Array();
  var ConceptMatrixFirstClean = new Array();

  var vColumnText = '';
  var vColumnNum = '';
  var vMaskNum = 0;
  var StyleTags = '';

  var vNumDims = 0;
  var vNumMeasures = 0;
  var vNumMeasures2 = 0;
  var SecondHeaderLength = 0;
  var MeasuresFormat = new Array();
  var LabelsArray = new Array();
  var ExtraLabelsArray = new Array();
  var vExtraLabel = '';
  var vExcelButtonCode = '';

  var self = this, lastrow = 0;
  var f = '';

  var nRows = component.backendApi.getRowCount();
  f += "<div class='header-wrapper'> <table class='header'><tr>";


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
      f += '<th class="fdim-cells" style="cursor:default;color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (17 + vLetterSizeHeader) + 'px;height:70px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + t.qFallbackTitle + '</th>';
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
      f += '<th class="grid-cells2' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (15 + vLetterSizeHeader) + 'px;height:70px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass' + sufixWrap + '" style="font-family:' + vFontFamily + '">' + t.qFallbackTitle + vExtraLabel + '</span></th>';
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
      self.paint($element);
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

      f += '<th class="fdim-cells" rowspan="2" padding-left="20px" style="cursor:default;color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (16 + vLetterSizeHeader) + 'px;height:80px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + LabelsArray[0] + '</th>';

      for (var nSecond = 0; nSecond < SecondHeaderLength; nSecond++) {//second dimension header
        if (vSeparatorCols && nSecond > 0) {
          f += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (13 + vLetterSizeHeader) + 'px">' + '*' + '</th>';
        }

        f += '<th class="grid-cells2' + sufixCells + '" colspan="' + measure_count + '"; style="color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:45px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + SecondHeader[nSecond] + '</th>';
      }
      f += '</tr>';

      f += '<tr>';
      for (var nSecond2 = 0; nSecond2 < SecondHeaderLength; nSecond2++) {//metrics label header
        if (vSeparatorCols && nSecond2 > 0) {
          f += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
        }
        for (var nMeas = 1; nMeas <= measure_count; nMeas++) {
          nMeasAux = nMeas - 1;
          if (MeasuresFormat[nMeasAux].substring(MeasuresFormat[nMeasAux].length - 1) == '%') {
            f += '<th class="grid-cells2-small' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (13 + vLetterSizeHeader) + 'px;height:25px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass25">' + LabelsArray[nMeas] + ExtraLabelsArray[nMeas - 1] + '</span></th>';
          } else {
            f += '<th class="grid-cells2' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:25px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass25">' + LabelsArray[nMeas] + ExtraLabelsArray[nMeas - 1] + '</span></th>';
          }
        }
      }
    } else {
      if (vExportToExcel) {
        vExcelButtonCode = '<input class = "icon-xls" type = "image" src="/Extensions/PLSmartPivot/Excel.png">';
      } else {
        vExcelButtonCode = '';
      }
      f += '<th class="fdim-cells" style="cursor:default;color:' + vHeaderColorText + ';background-color:' + vHeaderColorSchema + ';font-family:' + vFontFamily + ';font-size:' + (16 + vLetterSizeHeader) + 'px;height:70px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + LabelsArray[0] + ExtraLabelsArray[0] + '</th>';

      for (var nSecond = 0; nSecond < SecondHeaderLength; nSecond++) {
        if (vSeparatorCols && nSecond > 0) {
          f += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
        }
        if ((SecondHeader[nSecond].length > 11 && vLetterSizeHeader == 0)
          || (SecondHeader[nSecond].length > 12 && vLetterSizeHeader == -2)) {
          sufixWrap = '70';
        } else {
          sufixWrap = 'Empty';
        }
        f += '<th class="grid-cells2' + sufixCells + '" style="color:' + vHeaderColorText + ';background-color:' + vHeaderColorSchema + ';font-family:' + vFontFamily + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:70px' + ';vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass' + sufixWrap + '" style="font-family:' + vFontFamily + '">' + SecondHeader[nSecond] + '</span></th>';
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
  f += '</tr>';
  f += '</table></div>';
  f += " <div class='row-wrapper'><table >";

  if (vCustomFileBool && vCustomFile.length > 4) {
    ReadCustomSchema();
  } else {
    PaintTheNumbers();
    RenderData();
  }
  //This function opens a csv file that contains the parameters for the custom mode
  //this will prevent consuming to many dimensions, as there allowed only 10 columns between
  //dimensions and metrics
  function ReadCustomSchema() {
    var Url = '/Extensions/PLSmartPivot/' + vCustomFile;
    var Items = $.get(Url).then(function (response) {
      var allTextLines = response.split(/\r\n|\n/);
      var headers = allTextLines[0].split(';');
      vNumCustomHeaders = headers.length;

      for (var i = 0; i < allTextLines.length; i++) {
        CustomArray[i] = new Array(headers.length);
        var data = allTextLines[i].split(';');

        if (data.length == headers.length) {
          for (var j = 0; j < headers.length; j++) {
            CustomArrayBasic[i] = data[0];
            CustomArray[i][j] = data[j];
          }
        }
      }

      PaintTheNumbers();
      RenderData();
    });

    return Items;
  }
  //Paint the numbers
  function PaintTheNumbers() {
    if (vNumDims == 1) {
      //apply the custom style
      for (var nmrows = 0; nmrows <= lastrow; nmrows++) {
        vColumnText = ConceptMatrix[nmrows][0];
        vGlobalComment = 0;
        vGlobalCommentColor = '';
        if (vColumnText != '-') {
          StyleTags = '';

          if (vCustomFileBool) {
            vComas = 0;
            vMedium = false;
            vGlobalComas = 0;
            vGlobalComas2 = 0;
            vGlobalFontSize = 0;
            var aach = 0;
            var vCustomAttribute = '';
            StyleTags = '';
            for (aach = 1; aach < vNumCustomHeaders; aach++) { // for each custom attribute allocated in the external csv
              if (CustomArrayBasic.indexOf(vColumnText) < 0) {
                vCustomAttribute == 'none';
              } else {
                vCustomAttribute = CustomArray[CustomArrayBasic.indexOf(vColumnText)][aach]; //CustomArrayBasic se ha rellenado con los atributos de look al principio de la ejecución del código
              }
              ApplyBold(vCustomAttribute, vComas);
              vComas += vGlobalComas;
              ApplyComment(vCustomAttribute, vComas);
              vComas += vGlobalComas;
              ApplyFontStyle(vCustomAttribute, vComas);
              vComas += vGlobalComas;
              ApplyBackgroundColor(vCustomAttribute, vComas);
              vComas += vGlobalComas;
              ApplyFontColor(vCustomAttribute, vComas);
              vComas += vGlobalComas;
              ApplyFontSize(vCustomAttribute, vComas);
              vComas += vGlobalComas;
              ApplyAlignment(vCustomAttribute, vComas);
              vComas += vGlobalComas;
            }
            if (vGlobalFontSize == 0) {
              if (vComas > 0) {
                StyleTags += ';font-size:' + (14 + vLetterSize) + 'px';
              } else {
                StyleTags += 'font-size:' + (14 + vLetterSize) + 'px';
              }
              vFontSize = ';font-size:' + (14 + vLetterSize) + 'px';
              vGlobalFontSize = 1;
            }

            // after this the row styles are configured
          } else {
            ApplyStandardAttributes(nmrows);
            vFontSize = ';font-size:' + (14 + vLetterSize) + 'px';
          }

          if (vPadding && vGlobalComas2 == 0) {
            vPaddingText = '<span style="margin-left:15px;font-family:' + vFontFamily + '"></span>';
          } else {
            vPaddingText = '';
          }

          //f += '<tr><td class="fdim-cells" style ="font-family:' + vFontFamily + ';' + StyleTags + ';width:230px' + vPaddingText + '">' + vColumnText + '</td>';
          f += '<tr><td class="fdim-cells" style ="font-family:' + vFontFamily + ';' + StyleTags + ';width:230px">' + vPaddingText + vColumnText + '</td>';//';' + StyleTags + ;width:230px
          if (vGlobalComment == 1) {
            if (vGlobalCommentColor == '') {
              vGlobalCommentColor = 'white';
            }
            if (vComas > 0) {
              StyleTags += ';color:' + vGlobalCommentColor;
            } else {
              StyleTags += 'color:' + vGlobalCommentColor;
            }
          }
          for (var nMeasures2 = 1; nMeasures2 <= vNumMeasures; nMeasures2++) {
            if (vColumnText.substring(0, 1) == '%') {
              vColumnNum = ApplyPreMask('0,00%', ConceptMatrix[nmrows][nMeasures2]);
              vSpecialF = '0,00%';
            } else {
              switch (MeasuresFormat[nMeasures2 - 1].substr(MeasuresFormat[nMeasures2 - 1].length - 1)) {
                case 'k':
                  vDivide = 1000;
                  break;

                case 'K':
                  vDivide = 1000;
                  break;

                case 'm':
                  vDivide = 1000000;
                  break;

                case 'M':
                  vDivide = 1000000;
                  break;

                default:
                  vDivide = 1;
                  break;
              }
              var vSpecialF = MeasuresFormat[nMeasures2 - 1].replace(/k|K|m|M/gi, '');
              if (!isNaN(ConceptMatrix[nmrows][nMeasures2])) {
                vMaskNum = ConceptMatrix[nmrows][nMeasures2];
                if (vSpecialF.substring(vSpecialF.length - 1) == '%') {
                  vMaskNum = vMaskNum * 100;
                }
                switch (vSpecialF) {
                  case '#.##0':
                    vColumnNum = addSeparators((vMaskNum / vDivide), '.', ',', 0);
                    break;

                  case '#,##0':
                    vColumnNum = addSeparators((vMaskNum / vDivide), ',', '.', 0);
                    break;

                  default:
                    vColumnNum = ApplyPreMask(vSpecialF, (vMaskNum / vDivide));
                    break;
                }
              } else {
                vColumnNum = vSymbolForNulls;
              }
            }
            if (vGlobalComment == 1) {
              vColumnNum = '.';
            }
            // apply the semaphore styles where needed
            if ((vAllSemaphores || ConceptsAffectedMatrix.indexOf(vColumnText) >= 0) && (vAllMetrics || MetricsAffectedMatrix.indexOf(nMeasures2) >= 0) && !isNaN(ConceptMatrix[nmrows][nMeasures2]) && vGlobalComment == 0) {
              if (ConceptMatrix[nmrows][nMeasures2] < vCritic) {
                vColorSemaphore = vColorMetric1;
                vColorSemaphoreText = vColorMetric1Text;
              } else {
                if (ConceptMatrix[nmrows][nMeasures2] < vMMedium) {
                  vColorSemaphore = vColorMetric2;
                  vColorSemaphoreText = vColorMetric2Text;
                } else {
                  vColorSemaphore = vColorMetric3;
                  vColorSemaphoreText = vColorMetric3Text;
                }
              }
              f += '<td  class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';color:' + vColorSemaphoreText + ';background-color:' + vColorSemaphore + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
            } else {
              f += '<td  class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';' + StyleTags + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
            }
          }
        }
        f += '</tr>';
      }
    } else {
      var nPivotRows = ConceptMatrixFirstClean.length;
      for (var nmrows2 = 0; nmrows2 < nPivotRows; nmrows2++) {
        vColumnText = ConceptMatrixPivot[nmrows2][0];// the descriptive account text
        vGlobalComment = 0;
        vGlobalCommentColor = '';
        if (vColumnText != '-') {
          StyleTags = '';
          if (vCustomFileBool) {
            vComas = 0;
            vMedium = false;

            vGlobalComas = 0;
            vGlobalComas2 = 0;
            vGlobalFontSize = 0;
            var aach2 = 0;
            var vCustomAttribute2 = '';
            StyleTags = '';

            for (aach2 = 1; aach2 < vNumCustomHeaders; aach2++) { // for each attribute allocated in the external csv
              if (CustomArrayBasic.indexOf(vColumnText) < 0) {
                vCustomAttribute2 == 'none';
              } else {
                vCustomAttribute2 = CustomArray[CustomArrayBasic.indexOf(vColumnText)][aach2]; //CustomArrayBasic has been filled with the custom attribute at the begining of the code
              }
              ApplyBold(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
              ApplyComment(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
              ApplyFontStyle(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
              ApplyBackgroundColor(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
              ApplyFontColor(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
              ApplyFontSize(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
              ApplyAlignment(vCustomAttribute2, vComas);
              vComas += vGlobalComas;
            }
            if (vGlobalFontSize == 0) {
              if (vComas > 0) {
                StyleTags += ';font-size:' + (14 + vLetterSize) + 'px';
              } else {
                StyleTags += 'font-size:' + (14 + vLetterSize) + 'px';
              }
              vFontSize = ';font-size:' + (14 + vLetterSize) + 'px';
              vGlobalFontSize = 1;
            }

            // custom styles configured
          } else {
            ApplyStandardAttributes(nmrows2);
            vFontSize = ';font-size:' + (14 + vLetterSize) + 'px';
          }

          if (vPadding && vGlobalComas2 == 0) {
            vPaddingText = '<span style="margin-left:15px;font-family:' + vFontFamily + '"></span>';
          } else {
            vPaddingText = '';
          }
          f += '<tr><td class="fdim-cells" style ="font-family:' + vFontFamily + ';' + StyleTags + ';width:230px">' + vPaddingText + vColumnText + '</td>';
          if (vGlobalComment == 1) {
            if (vGlobalCommentColor == '') {
              vGlobalCommentColor = 'white';
            }
            if (vComas > 0) {
              StyleTags += ';color:' + vGlobalCommentColor;
            } else {
              StyleTags += 'color:' + vGlobalCommentColor;
            }
          }
          var nMeasure7 = 0;
          var nMeasure72 = -1;
          var nMeasure72Semaphore = 0;

          for (var nMeasures22 = 1; nMeasures22 <= vNumMeasures2; nMeasures22++) {
            nMeasAux = nMeasure72Semaphore;
            nMeasure7++;
            nMeasure72++;
            if (vColumnText.substring(0, 1) == '%') {
              vColumnNum = ApplyPreMask('0,00%', ConceptMatrixPivot[nmrows2][nMeasures22]);
              var vSpecialF = '0,00%';
            } else {
              switch (MeasuresFormat[nMeasure72].substr(MeasuresFormat[nMeasure72].length - 1)) {
                case 'k':
                  vDivide = 1000;
                  break;

                case 'K':
                  vDivide = 1000;
                  break;

                case 'm':
                  vDivide = 1000000;
                  break;

                case 'M':
                  vDivide = 1000000;
                  break;

                default:
                  vDivide = 1;
                  break;
              }
              var vSpecialF = MeasuresFormat[nMeasure72].replace(/k|K|m|M/gi, '');
              if (!isNaN(ConceptMatrixPivot[nmrows2][nMeasures22])) {
                vMaskNum = ConceptMatrixPivot[nmrows2][nMeasures22];
                if (vSpecialF.substring(vSpecialF.length - 1) == '%') {
                  vMaskNum = vMaskNum * 100;
                }

                switch (vSpecialF) {
                  case '#.##0':
                    vColumnNum = addSeparators((vMaskNum / vDivide), '.', ',', 0);
                    break;
                  case '#,##0':
                    vColumnNum = addSeparators((vMaskNum / vDivide), ',', '.', 0);
                    break;
                  default:
                    vColumnNum = ApplyPreMask(vSpecialF, (vMaskNum / vDivide));
                    break;
                }
              } else {
                vColumnNum = vSymbolForNulls;
              }
            }

            if (vSeparatorCols && nMeasure7 == (measure_count + 1)) {
              f += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
              nMeasure7 = 1;
            }
            if (nMeasure72 == (measure_count - 1)) {
              nMeasure72 = -1;
              nMeasure72Semaphore = measure_count;
            } else {
              nMeasure72Semaphore = nMeasure72 + 1;
            }

            // apply the semaphores where needed
            if (vGlobalComment == 1) {
              vColumnNum = '.';
            }
            if ((vAllSemaphores || ConceptsAffectedMatrix.indexOf(vColumnText) >= 0) && (vAllMetrics || MetricsAffectedMatrix.indexOf(nMeasure72Semaphore) >= 0) && !isNaN(ConceptMatrixPivot[nmrows2][nMeasures22]) && vGlobalComment == 0) {
              if (ConceptMatrixPivot[nmrows2][nMeasures22] < vCritic) {
                vColorSemaphore = vColorMetric1;
                vColorSemaphoreText = vColorMetric1Text;
              } else {
                if (ConceptMatrixPivot[nmrows2][nMeasures22] < vMMedium) {
                  vColorSemaphore = vColorMetric2;
                  vColorSemaphoreText = vColorMetric2Text;
                } else {
                  vColorSemaphore = vColorMetric3;
                  vColorSemaphoreText = vColorMetric3Text;
                }
              }

              if (vSpecialF.substring(vSpecialF.length - 1) == '%' && vNumMeasures > 1) {
                f += '<td class="grid-cells-small' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';color:' + vColorSemaphoreText + ';background-color:' + vColorSemaphore + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
              } else {
                f += '<td class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';color:' + vColorSemaphoreText + ';background-color:' + vColorSemaphore + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
              }
            } else {
              if (vSpecialF.substring(vSpecialF.length - 1) == '%' && vNumMeasures > 1) {
                f += '<td class="grid-cells-small' + sufixCells + '" style ="font-family:' + vFontFamily + ';' + StyleTags + ';text-align:right;padding-right:4px">' + vColumnNum + '</td>';
              } else {
                f += '<td class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + ';' + StyleTags + ';text-align:right;padding-right:4px">' + vColumnNum + '</td>';
              }
            }
          }
          f += '</tr>';
        }
      }
    }
  }
  //render data
  function RenderData() {
    var nMerge = 0;
    if (measure_count == 0) {
      nMerge = 1;
    } else {
      if (vSeparatorCols) {
        nMerge = (measure_count + 2);
      } else {
        nMerge = (measure_count + 1);
      }
    }
    f += '</table>';

    f += '</div>';

    // freeze header and first column
    var x = "<div class='kpi-table'>";
    x += f,
    x += '</div>',
    x += "<div class='data-table'>",
    x += f,
    x += '</div>',

    $element.html(x),

    $('.data-table .row-wrapper').on('scroll', function () {
      $('.kpi-table .row-wrapper').scrollTop($(this).scrollTop()),
      $(this).scrollTop() > 50 ? (
        angular.element(document.querySelector('.data-table .row-wrapper')).css('top', '0'), angular.element(document.querySelector('.kpi-table .row-wrapper')).css('top', '0')
      ) : (
        angular.element(document.querySelector('.data-table .row-wrapper')).css('top', '97px'),//97px
        angular.element(document.querySelector('.kpi-table .row-wrapper')).css('top', '97px')//97px
      );
    }
    ),

    //on hover popup with cell value, only in headers
    $('.header-wrapper th').hover(function () {
      $('.tooltip').delay(500).show(0);
      $('.header-wrapper th').children('.tooltip').remove();

      //var element = e(this);
      var element = $(this);
      var offset = element.offset();
      var toolTip = $("<div class='tooltip'></div>");

      toolTip.css(
        {
          top: offset.top,
          left: offset.left
        });

      toolTip.text(element.text());
      $('.header-wrapper th').append(toolTip);
    }, function () {
      $('.tooltip').delay(0).hide(0);
    }
    ),

    //allow making selections inside the table
    $('.data-table td').on('click', function () {
      if (self.backendApi.model.layout.filteroncellclick == false)
        return;
      var indextr = $(this).parent().parent().children().index($(this).parent()); //identifica la row
      var indextd = $(this).parent().children().index($(this)); //identifica la col

      var SelectRow = 0;
      var SelectCol = 0;

      SelectRow = ConceptMatrixRowElem[(indextr)];


      // este if verifica primero si hay selecciones hechas en la dimensión, si las hay
      // las reselecciona para poder borrar antes de poder seleccionar lo que quiero
      // no es viable pedirle que seleccione a la vez elementos de 2 selecciones, se queda
      // colgado el menú de confirm, por eso uso este sistema, que sí funciona.
      // it can cause issues like error messages and wrong selections if there are null values
      // and the check allow null values is active
      if (vNumDims > 1 && indextd > 0) {
        if (ArrayGetSelectedCount[1] > 0) {
          var SelectB = JSON.parse(JSON.stringify(ConceptMatrixColElemTable));
          self.backendApi.selectValues(1, SelectB, true);
          $(this).toggleClass('selected');
        }
        SelectCol = ConceptMatrixColElemTable[(indextd)];

        self.backendApi.selectValues(1, [SelectCol], true);
        $(this).toggleClass('selected');
      }

      if (indextd > 0 && ArrayGetSelectedCount[0] > 0) {
        var SelectA = JSON.parse(JSON.stringify(ConceptMatrixRowElem));
        self.backendApi.selectValues(0, SelectA, true);
        $(this).toggleClass('selected');
      }

      if (indextd > 0) {
        self.backendApi.selectValues(0, [SelectRow], true);
        $(this).toggleClass('selected');
      }
    }),
    //allow selections through the header of the second dimension
    $('.header-wrapper th').on('click', function () {
      var indextd = $(this).parent().children().index($(this)); //identifica la col

      var SelectCol = 0;

      if (vNumDims > 1 && indextd > 0) {
        if (ArrayGetSelectedCount[1] > 0) {
          var SelectB = JSON.parse(JSON.stringify(ConceptMatrixColElem));
          self.backendApi.selectValues(1, SelectB, true);
          $(this).toggleClass('selected');
        }
        if (vSeparatorCols) {
          SelectCol = ConceptMatrixColElem[(Math.round(indextd / 2) - 1)];
        } else {
          SelectCol = ConceptMatrixColElem[(Math.round(indextd) - 1)];
        }

        self.backendApi.selectValues(1, [SelectCol], true);
        $(this).toggleClass('selected');
      }
    }),
    //allow selections in desc dimension cells
    $('.kpi-table td').on('click', function () {
      var indextr = $(this).parent().parent().children().index($(this).parent()); //identifica la row
      var SelectRow = 0;
      SelectRow = ConceptMatrixRowElem[(indextr)];

      if (ArrayGetSelectedCount[0] > 0) {
        var SelectA = JSON.parse(JSON.stringify(ConceptMatrixRowElem));
        self.backendApi.selectValues(0, SelectA, true);
        $(this).toggleClass('selected');
      }

      self.backendApi.selectValues(0, [SelectRow], true);
      $(this).toggleClass('selected');
    }),
    $('.icon-xls').on('click', function () {
      $('.header-wrapper th').children('.tooltip').remove();// remove some popup effects when exporting
      $('.header-wrapper th').children('.icon-xls').remove();// remove the xls icon when exporting
      if (isChrome || isSafari) {
        var $clonedDiv = $('.data-table').clone(true);//.kpi-table a secas exporta la 1ªcol
        var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
        vEncodeHead += myTitle + mySubTitle + myFootNote;
        var vEncode = encodeURIComponent($clonedDiv.html());
        var vDecode = vEncodeHead + vEncode + '</html>';

        $clonedDiv.find('tr.header');
        vDecode = vDecode.split('%3E.%3C').join('%3E%3C');
        window.open('data:application/vnd.ms-excel,' + vDecode);
        $.preventDefault();
      }
      if (isIE) {
        var a = '<html><head><meta charset="UTF-8"></head>';
        a += myTitle + mySubTitle + myFootNote;
        a += f;
        a = a.split('>.<').join('><');
        a += '</html>';

        var w = window.open();
        w.document.open();
        w.document.write(a);
        w.document.close();
        w.document.execCommand('SaveAs', true, 'Analysis.xls' || 'c:\TMP');
        w.close();
      }

      if (isFirefox) {
        var $clonedDiv = $('.data-table').clone(true);//.kpi-table a secas exporta la 1ªcol
        var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
        vEncodeHead += myTitle + mySubTitle + myFootNote;
        var vEncode = encodeURIComponent($clonedDiv.html());
        var vDecode = vEncodeHead + vEncode + '</html>';

        $clonedDiv.find('tr.header');
        vDecode = vDecode.split('>.<').join('><');
        window.open('data:application/vnd.ms-excel,' + vDecode);
        $.preventDefault();
      }
    }),

    // freeze first column
    $('.qv-object-content-container').on('scroll', function (t) {
      $('.kpi-table').css('left', Math.round(t.target.scrollLeft) + 'px');
    }),
    $('.kpi-table .row-wrapper tr').each(function () {
      $(this).find('th:not(.fdim-cells)').remove(),
      $(this).find('td:not(.fdim-cells)').remove();
    }),
    $('.kpi-table .header-wrapper tr').each(function () {
      $(this).find('th:not(.fdim-cells)').remove();
    });
  }

  // PYJAMAS
  function ApplyStandardAttributes(strow) {
    if (strow / 2 == Math.round(strow / 2)) {
      StyleTags += 'background-color:' + vColorSchema + ';color:' + vColorText;
    } else {
      StyleTags += 'background-color:' + vColorSchemaP + ';color:' + vColorText;
    }
    StyleTags += ';font-size:' + (14 + vLetterSize) + 'px';
  }
  // transform the custom styles in html code

  function ApplyBold(vCustomAttributes, vCustomComas) {
    var vPuntoComa = '';
    if (vCustomComas > 0) {
      vPuntoComa = ';';
    }
    switch (vCustomAttributes) {
      case '<bold>':
        StyleTags += vPuntoComa + 'font-weight:bold';
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        break;

      default:
        StyleTags += '';
        break;
    }
  }
  function ApplyComment(vCustomAttributes) {
    switch (vCustomAttributes) {
      case '<comment>':
        vGlobalComment = 1;
        break;

      default:
        StyleTags += '';
        break;
    }
  }
  function ApplyFontStyle(vCustomAttributes, vCustomComas) {
    var vPuntoComa = '';
    if (vCustomComas > 0) {
      vPuntoComa = ';';
    }
    switch (vCustomAttributes) {
      case '<italic>':
        StyleTags += vPuntoComa + 'font-style:italic';
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        break;

      case '<oblique>':
        StyleTags += vPuntoComa + 'font-style:oblique';
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        break;

      default:
        StyleTags += '';
        break;
    }
  }
  function ApplyBackgroundColor(vCustomAttributes, vCustomComas) {
    var vPuntoComa = '';
    if (vCustomComas > 0) {
      vPuntoComa = ';';
    }
    switch (vCustomAttributes) {
      case '<dark>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibDark;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibDark;
        break;

      case '<night>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibNight;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibNight;
        break;

      case '<soft>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibSoft;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibSoft;
        break;

      case '<red>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibRed;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibRed;
        break;

      case '<orange>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibOrange;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibOrange;
        break;

      case '<violete>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibViolete;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibViolete;
        break;

      case '<blue>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibBlue;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibBlue;
        break;

      case '<green>':
        StyleTags += vPuntoComa + 'background-color:' + vColLibGreen;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = vColLibGreen;
        break;

      default:
        if (vCustomAttributes.substring(0, 1) == '#' || vCustomAttributes.substring(0, 3).toUpperCase() == 'RGB') {
          StyleTags += vPuntoComa + 'background-color:' + vCustomAttributes;
          vGlobalComas = 1;
          vGlobalComas2 = 1;
          vGlobalCommentColor = vCustomAttributes;
        }
        break;
    }
  }
  function ApplyFontColor(vCustomAttributes, vCustomComas) {
    var vPuntoComa = '';
    if (vCustomComas > 0) {
      vPuntoComa = ';';
    }
    switch (vCustomAttributes) {
      case '<white>':
        if (vGlobalComment == 0) {
          StyleTags += vPuntoComa + 'color:white';
          vGlobalComas = 1;
          vGlobalComas2 = 1;
          break;
        }

      default:
        StyleTags += '';
        break;
    }
  }
  function ApplyFontSize(vCustomAttributes, vCustomComas) {
    var vPuntoComa = '';
    if (vCustomComas > 0) {
      vPuntoComa = ';';
    }
    switch (vCustomAttributes) {
      case '<large>':
        StyleTags += vPuntoComa + 'font-size:' + (15 + vLetterSize) + 'px';
        vFontSize = ';font-size:' + (15 + vLetterSize) + 'px';
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalFontSize = 1;
        break;

      case '<medium>':
        StyleTags += vPuntoComa + 'font-size:' + (14 + vLetterSize) + 'px';
        vFontSize = ';font-size:' + (14 + vLetterSize) + 'px';
        vGlobalComas = 1;
        vMedium == true;
        vGlobalFontSize = 1;
        break;

      case '<small>':
        StyleTags += vPuntoComa + 'font-size:' + (13 + vLetterSize) + 'px';
        vFontSize = ';font-size:' + (13 + vLetterSize) + 'px';
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalFontSize = 1;
        break;

      default:
        StyleTags += '';
        break;
    }
  }
  function ApplyAlignment(vCustomAttributes, vCustomComas) {
    var vPuntoComa = '';
    if (vCustomComas > 0) {
      vPuntoComa = ';';
    }
    switch (vCustomAttributes) {
      case '<center>':
        StyleTags += vPuntoComa + 'text-align:center';
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        break;

      default:
        StyleTags += '';
        break;
    }
  }



  function ApplyPreMask(mask, value) {//aqui
    if (mask.indexOf(';') >= 0) {
      if (value >= 0) {
        switch (mask.substring(0, mask.indexOf(';'))) {
          case '#.##0':
            return (addSeparators(value, '.', ',', 0));
            break;
          case '#,##0':
            return (addSeparators(value, ',', '.', 0));
            break;
          case '+#.##0':
            return (addSeparators(value, '.', ',', 0));
            break;
          case '+#,##0':
            return (addSeparators(value, ',', '.', 0));
            break;
          default:
            return (ApplyMask(mask.substring(0, mask.indexOf(';')), value));
            break;
        }
      } else {
        var vMyValue = value * -1;
        var vMyMask = mask.substring(mask.indexOf(';') + 1, mask.length);
        vMyMask = vMyMask.replace('(', '');
        vMyMask = vMyMask.replace(')', '');
        switch (vMyMask) {
          case '#.##0':
            return ('(' + addSeparators(vMyValue, '.', ',', 0) + ')');
            break;
          case '#,##0':
            return ('(' + addSeparators(vMyValue, ',', '.', 0) + ')');
            break;
          case '-#.##0':
            return ('(' + addSeparators(vMyValue, '.', ',', 0) + ')');
            break;
          case '-#,##0':
            return ('(' + addSeparators(vMyValue, ',', '.', 0) + ')');
            break;
          default:
            return ('(' + ApplyMask(vMyMask, vMyValue) + ')');
            break;
        }
      }
    } else {
      return (ApplyMask(mask, value));
    }
  }
  function ApplyMask(mask, value) {
    'use strict';
    if (!mask || isNaN(+value)) {
      return value; // return as it is.
    }

    var isNegative, result, decimal, group, posLeadZero, posTrailZero, posSeparator,
      part, szSep, integer,

      // find prefix/suffix
      len = mask.length,
      start = mask.search(/[0-9\-\+#]/),
      prefix = start > 0 ? mask.substring(0, start) : '',
      // reverse string: not an ideal method if there are surrogate pairs
      str = mask.split('').reverse().join(''),
      end = str.search(/[0-9\-\+#]/),
      offset = len - end,
      substr = mask.substring(offset, offset + 1),
      indx = offset + ((substr === '.' || (substr === ',')) ? 1 : 0),
      suffix = end > 0 ? mask.substring(indx, len) : '';

    // mask with prefix & suffix removed
    mask = mask.substring(start, indx);

    // convert any string to number according to formation sign.
    value = mask.charAt(0) === '-' ? -value : +value;
    isNegative = value < 0 ? value = -value : 0; // process only abs(), and turn on flag.

    // search for separator for grp & decimal, anything not digit, not +/- sign, not #.
    result = mask.match(/[^\d\-\+#]/g);
    decimal = (result && result[result.length - 1]) || '.'; // treat the right most symbol as decimal
    group = (result && result[1] && result[0]) || ','; // treat the left most symbol as group separator

    // split the decimal for the format string if any.
    mask = mask.split(decimal);
    // Fix the decimal first, toFixed will auto fill trailing zero.
    value = value.toFixed(mask[1] && mask[1].length);
    value = +(value) + ''; // convert number to string to trim off *all* trailing decimal zero(es)

    // fill back any trailing zero according to format
    posTrailZero = mask[1] && mask[1].lastIndexOf('0'); // look for last zero in format
    part = value.split('.');
    // integer will get !part[1]
    if (!part[1] || (part[1] && part[1].length <= posTrailZero)) {
      value = (+value).toFixed(posTrailZero + 1);
    }
    szSep = mask[0].split(group); // look for separator
    mask[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

    posLeadZero = mask[0] && mask[0].indexOf('0');
    if (posLeadZero > -1) {
      while (part[0].length < (mask[0].length - posLeadZero)) {
        part[0] = '0' + part[0];
      }
    } else if (+part[0] === 0) {
      part[0] = '';
    }

    value = value.split('.');
    value[0] = part[0];

    // process the first group separator from decimal (.) only, the rest ignore.
    // get the length of the last slice of split result.
    posSeparator = (szSep[1] && szSep[szSep.length - 1].length);
    if (posSeparator) {
      integer = value[0];
      str = '';
      offset = integer.length % posSeparator;
      len = integer.length;
      for (indx = 0; indx < len; indx++) {
        str += integer.charAt(indx); // ie6 only support charAt for sz.
        // -posSeparator so that won't trail separator on full length
        //jshint -W018
        if (!((indx - offset + 1) % posSeparator) && indx < len - posSeparator) {
          str += group;
        }
      }
      value[0] = str;
    }
    value[1] = (mask[1] && value[1]) ? decimal + value[1] : '';

    // remove negative sign if result is zero
    result = value.join('');
    if (result === '0' || result === '') {
      // remove negative sign if result is zero
      isNegative = false;
    }

    // put back any negation, combine integer and fraction, and add back prefix & suffix
    return prefix + ((isNegative ? '-' : '') + result) + suffix;
  }


  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function addSeparators(nStr, thousandsSep, decimalSep, numDecimals) {
    var rgx, x, x1, x2;
    nStr = nStr.toFixed(numDecimals);
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? decimalSep + x[1] : '';
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
    }
    return x1 + x2;
  }
}
