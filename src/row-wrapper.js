import $ from 'jquery';
import { addSeparators, Deferred } from './utilities';
import { ApplyPreMask } from './masking';

export function generateRowWrapper (
  layout,
  colors,
  nMeasAux,
  vNumDims,
  measure_count,
  MeasuresFormat,
  vNumMeasures,
  vNumMeasures2,
  sufixCells,
  vFontFamily,
  vSeparatorCols,
  lastrow,
  ConceptMatrix,
  ConceptMatrixFirstClean,
  vLetterSize,
  ConceptMatrixPivot
) {
  var vCustomFileBool = layout.customfilebool;
  var vCustomFile = layout.customfile;
  var vPadding = layout.indentbool;
  var vPaddingText = '';
  var vGlobalComas = 0;
  var vGlobalComas2 = 0;
  var vGlobalComment = 0;
  var vGlobalCommentColor = '';
  var vGlobalFontSize = 0;
  var vComas = 0;
  var vMedium = false;
  var vFontSize = '';
  var vColorText = layout.BodyTextColorSchema;
  var vDivide = 1;
  var vSymbolForNulls = layout.symbolfornulls;
  var vDynamicColorBody = 'vColLib' + layout.ColorSchema;
  var vDynamicColorBodyP = 'vColLib' + layout.ColorSchema + 'P';
  var vAllMetrics = layout.allmetrics;
  var MetricsAffectedMatrix = JSON.parse('[' + layout.metricssemaphore + ']');
  var vColorMetric1 = layout.colorstatus1.color;
  var vColorMetric2 = layout.colorstatus2.color;
  var vColorMetric3 = layout.colorstatus3.color;
  var vColorMetric1Text = layout.colorstatus1text.color;
  var vColorMetric2Text = layout.colorstatus2text.color;
  var vColorMetric3Text = layout.colorstatus3text.color;
  var vColorSemaphore = '';
  var vColorSemaphoreText = '';
  var vCritic = layout.metricsstatus1;
  var vMMedium = layout.metricsstatus2;
  var CustomArray = new Array();
  var CustomArrayBasic = new Array();
  var vNumCustomHeaders = 0;
  var vColumnText = '';
  var vColumnNum = '';
  var vMaskNum = 0;
  var StyleTags = '';
  var vColorSchema = colors[vDynamicColorBody];
  var vColorSchemaP = colors[vDynamicColorBodyP];
  var vAllSemaphores = layout.allsemaphores;
  var ConceptsAffectedMatrix = new Array(10);
  if (vAllSemaphores == false) {
    ConceptsAffectedMatrix[0] = layout.conceptsemaphore1;
    ConceptsAffectedMatrix[1] = layout.conceptsemaphore2;
    ConceptsAffectedMatrix[2] = layout.conceptsemaphore3;
    ConceptsAffectedMatrix[3] = layout.conceptsemaphore4;
    ConceptsAffectedMatrix[4] = layout.conceptsemaphore5;
    ConceptsAffectedMatrix[5] = layout.conceptsemaphore6;
    ConceptsAffectedMatrix[6] = layout.conceptsemaphore7;
    ConceptsAffectedMatrix[7] = layout.conceptsemaphore8;
    ConceptsAffectedMatrix[8] = layout.conceptsemaphore9;
    ConceptsAffectedMatrix[9] = layout.conceptsemaphore10;
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

          html += '<tr><td class="fdim-cells" style ="font-family:' + vFontFamily + ';' + StyleTags + ';width:230px">' + vPaddingText + vColumnText + '</td>';//';' + StyleTags + ;width:230px
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
              html += '<td  class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';color:' + vColorSemaphoreText + ';background-color:' + vColorSemaphore + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
            } else {
              html += '<td  class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';' + StyleTags + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
            }
          }
        }
        html += '</tr>';
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
          html += '<tr><td class="fdim-cells" style ="font-family:' + vFontFamily + ';' + StyleTags + ';width:230px">' + vPaddingText + vColumnText + '</td>';
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
              html += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
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
                html += '<td class="grid-cells-small' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';color:' + vColorSemaphoreText + ';background-color:' + vColorSemaphore + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
              } else {
                html += '<td class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + vFontSize + ';color:' + vColorSemaphoreText + ';background-color:' + vColorSemaphore + ';text-align:right;padding-left:4px">' + vColumnNum + '</td>';
              }
            } else {
              if (vSpecialF.substring(vSpecialF.length - 1) == '%' && vNumMeasures > 1) {
                html += '<td class="grid-cells-small' + sufixCells + '" style ="font-family:' + vFontFamily + ';' + StyleTags + ';text-align:right;padding-right:4px">' + vColumnNum + '</td>';
              } else {
                html += '<td class="grid-cells' + sufixCells + '" style ="font-family:' + vFontFamily + ';' + StyleTags + ';text-align:right;padding-right:4px">' + vColumnNum + '</td>';
              }
            }
          }
          html += '</tr>';
        }
      }
    }
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
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibDark;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibDark;
        break;

      case '<night>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibNight;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibNight;
        break;

      case '<soft>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibSoft;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibSoft;
        break;

      case '<red>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibRed;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibRed;
        break;

      case '<orange>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibOrange;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibOrange;
        break;

      case '<violete>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibViolete;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibViolete;
        break;

      case '<blue>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibBlue;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibBlue;
        break;

      case '<green>':
        StyleTags += vPuntoComa + 'background-color:' + colors.vColLibGreen;
        vGlobalComas = 1;
        vGlobalComas2 = 1;
        vGlobalCommentColor = colors.vColLibGreen;
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
    if (vCustomAttributes === '<white>' && vGlobalComment == 0) {
      StyleTags += vPuntoComa + 'color:white';
      vGlobalComas = 1;
      vGlobalComas2 = 1;
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

  const deferred = new Deferred();
  let html = " <div class='row-wrapper'><table >";

  const schemaPromise = (vCustomFileBool && vCustomFile.length > 4) ? ReadCustomSchema() : Promise.resolve();
  schemaPromise.then(() => {
    PaintTheNumbers();
    html += '</table>';
    html += '</div>';
    deferred.resolve(html);
  });

  return deferred.promise; // should be promise
}
