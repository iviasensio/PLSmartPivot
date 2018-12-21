/*
WIP: converting header-wrapper into react <HeaderWrapper /> component
*/

import $ from 'jquery';
import { onlyUnique } from './utilities';
import { Component, Fragment } from 'react';

// TODO: data handling stuff to be moved out (probbaly warrants being a service of its own once row-wrapper has gotten the same treatment)
function initialize () {
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

  if (nRows >= (vMaxLoops * 1000)) {
    alert(vErrorMessage);
  }

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
  }

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

  if (nRows > (lastrow + 1) && nRows <= (vMaxLoops * 1000)) {
    var requestPage = [{
      qTop: lastrow + 1,
      qLeft: 0,
      qWidth: 10, //should be # of columns
      qHeight: Math.min(1000, nRows - lastrow)
    }];

    promises.push(.then(function () {
      // TODO: get rid of this
      // component.paint($element);
    }));
  }

  // TODO: Fetch methods should build arrays that hold transformed properties so that rendering parts can be dumb
  return Promise.all([
    component.backendApi.getDimensionInfos().then(dimensionInfos => {
      LabelsArray.push(dimensionInfos[0].qFallbackTitle)
      ArrayGetSelectedCount.concat(dimensionInfos.map(dimensionInfo => dimensionInfo.qStateCounts.qSelected));
      vNumDims += dimensionInfos.length;

      return dimensionInfos;
    }),
    component.backendApi.getMeasureInfos().then(measureInfos => {
      LabelsArray.concat(measureInfos.map(measureInfo => measureInfo.qFallbackTitle));
      const measureFormats = measureInfo.map(measureInfo => {
        let mfor = '';
        if (measureInfo.qNumFormat.qType == 'U' || measureInfo.qNumFormat.qFmt == '##############') {
          mfor = '#.##0'; //in case of undefined
        } else {
          if (measureInfo.qNumFormat.qType == 'R') {
            mfor = measureInfo.qNumFormat.qFmt;
            mfor = mfor.replace(/(|)/gi, '');
          } else {
            mfor = measureInfo.qNumFormat.qFmt;
          }
        }
        return mfor;
      });
      MeasuresFormat.concat(measureFormats);
      ExtraLabelsArray.concat(measureformats.map(mfor => {
        switch (mfor.substr(mfor.length - 1)) {
          case 'm':
            vExtraLabel = ' (M)';
            break;
          case 'M':
            vExtraLabel = ' (M)';
            break;
          case 'k':
            vExtraLabel = ' (k)';
            break;
          case 'K':
            vExtraLabel = ' (k)';
            break;
          default:
            vExtraLabel = '';
            break;
        }
        return vExtraLabel;
      }));
      vNumMeasures += measureInfos.length;
      return measureInfos;
    })
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
    }),
    component.backendApi.getData(requestPage)
  ])
  .then(([
    dimensionInfos,
    measureInfos
  ]) => {
    return {
      dimensionInfos,
      measureInfos
    };
  });
}

// TODO: move data init and massaging outside of component, should be presentation only
// at that point it should also be made into a PureComponent instead
// TODO: Configure PropTypes
// TODO: setup strict eslint rules for react
// TODO: examine style objects, guessing there's quite a bit of duplication and the static properties should be moved to stylesheet
// TODO: commented code has not been converted yet
class HeaderWrapper extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dimensionInfos: [],
      measureInfos: []
    }
  }
  componentWillMount () {
    // TODO: properties should be supplied as props to component instead
    initialize.then(state => {
      this.setState(state);
    })
  }
  {/* TODO: was starting to run really low on time left when i started on this part, so check it against lines 215-300 in header-wrapper.js */}
  renderSecondDimensionTitles = () => {
    if (vNumDims == 2) {
      if (measure_count > 1) {
        const thStyle = {
          cursor: 'default',
          color: vHeaderColorText,
          'font-family': vFontFamily,
          'background-color': vHeaderColorSchema,
          'font-size': (16 + vLetterSizeHeader) + 'px',
          height: '80px',
          width: '230px',
          'vertical-align': 'middle',
          'text-align': vHeaderAlignText
        };
        return (
          <Fragment>
            {vExportToExcel && (
              <input className="icon-xls" type="image" src="/Extensions/PLSmartPivot/Excel.png" />
            )}
            <th
              className="fdim-cells"
              rowspan="2"
              padding-left="20px"
              style={thStyle}
            >
              {vExcelButtonCode}{LabelsArray[0]}
            </th>
            {SecondHeader.map(header => {
              const emptyStyle = {
                color: 'white',
                'font-family': vFontFamily,
                'font-size': (13 + vLetterSizeHeader) + 'px'
              };
              const style = {
                color: vHeaderColorText,
                'font-family': vFontFamily,
                'background-color': vHeaderColorSchema,
                'font-size': (14 + vLetterSizeHeader) + 'px',
                height: '45px',
                'vertical-align': 'middle',
                'text-align': vHeaderAlignText
              };
              {vSeparatorCols && nSecond > 0 && (
                <th className="empty" style={emptyStyle}>*</th>';
              )}
              <th className={'grid-cells2' + sufixCells} colspan={measure_count} style={style}>{header}</th>
            })
          {/* TODO: rework this so there aren't mismatched elements within fragment (tr's below) simplest solution to start off with is probably to just rip it out and put it in the render method instead*/}
          {/* Commented them out for now to help editor syntax highlighting out a bit, they need to be part of the final html structure though
            </tr>
            <tr>
          */}
            {SecondHeader.map(header => {
              const emptyStyle = {
                // "color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px"
              };
              return (
                {vSeparatorCols && nSecond2 > 0 && (
                  <th className="empty" style={emptyStyle}>*</th>
                )}
                MeasureFormat.map(measureFormat => {
                  if (MeasuresFormat[nMeasAux].substring(MeasuresFormat[nMeasAux].length - 1) == '%') {
                    return (
                      // '<th class="grid-cells2-small' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (13 + vLetterSizeHeader) + 'px;height:25px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass25">' + LabelsArray[nMeas] + ExtraLabelsArray[nMeas - 1] + '</span></th>';
                    )
                  } else {
                    return (
                      // <th class="grid-cells2' + sufixCells + '" style="cursor:default' + ';color:' + vHeaderColorText + ';font-family:' + vFontFamily + ';background-color:' + vHeaderColorSchema + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:25px;vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass25">' + LabelsArray[nMeas] + ExtraLabelsArray[nMeas - 1] + '</span></th>';
                    )
                  }
                })
              );
            })}
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            {/* TODO: make excel export a component or atleast variable to avoid duplication*/}
            {vExportToExcel && (
              <input className="icon-xls" type="image" src="/Extensions/PLSmartPivot/Excel.png" />
            )}
            // <th class="fdim-cells" style="cursor:default;color:' + vHeaderColorText + ';background-color:' + vHeaderColorSchema + ';font-family:' + vFontFamily + ';font-size:' + (16 + vLetterSizeHeader) + 'px;height:70px;width:230px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + vExcelButtonCode + LabelsArray[0] + ExtraLabelsArray[0] + '</th>';

            // for (var nSecond = 0; nSecond < SecondHeaderLength; nSecond++) {
            //   if (vSeparatorCols && nSecond > 0) {
            //     html += '<th class = "empty" style="color:white' + ';font-family:' + vFontFamily + ';font-size:' + (12 + vLetterSize) + 'px">' + '*' + '</th>';
            //   }
            //   if ((SecondHeader[nSecond].length > 11 && vLetterSizeHeader == 0)
            //     || (SecondHeader[nSecond].length > 12 && vLetterSizeHeader == -2)) {
            //     sufixWrap = '70';
            //   } else {
            //     sufixWrap = 'Empty';
            //   }
            //   html += '<th class="grid-cells2' + sufixCells + '" style="color:' + vHeaderColorText + ';background-color:' + vHeaderColorSchema + ';font-family:' + vFontFamily + ';font-size:' + (14 + vLetterSizeHeader) + 'px;height:70px' + ';vertical-align:middle;text-align:' + vHeaderAlignText + '"><span class = "wrapclass' + sufixWrap + '" style="font-family:' + vFontFamily + '">' + SecondHeader[nSecond] + '</span></th>';
            // }
          </Fragment>
        );
    }
  }
  renderMeasureInfos = () => {
    if (dim_count == 1) {
      this.state.measureInfos.map(measureInfo => {
        if (((measureInfo.qFallbackTitle + vExtraLabel).length > 11 && vLetterSizeHeader == 0)
          || ((measureInfo.qFallbackTitle + vExtraLabel).length > 12 && vLetterSizeHeader == -2)) {
          // TODO: move sufixWrap setting to fetch
          sufixWrap = '70';
        } else {
          sufixWrap = 'Empty';
        }
        const thStyle = {
          cursor: 'default',
          color: vHeaderColorText,
          'font-family': vFontFamily,
          'background-color': vHeaderColorSchema,
          'font-size': (15 + vLetterSizeHeader) + 'px',
          height: 70px,
          'vertical-align': 'middle',
          'text-align': vHeaderAlignText
        };
        return (
          <th className={'grid-cells2' + sufixCells} style={thStyle}>
            <span className={'wrapclass' + sufixWrap} style={ 'font-family:' + vFontFamily}>
              {measureInfo.qFallbackTitle + vExtraLabel}
            </span>
          </th>
        );
      });
    } else {
      return null;
    }
  }
  renderDimensionInfos = () => {
    return dimensionInfos.map(dimensionInfo => {
      // TODO: not all of these map 1:1 to css equivalent, rename as needed
      // TODO: move static ones to css file
      const style = {
        cursor: 'default',
        color: vHeaderColorText,
        'font-family': vFontFamily,
        'background-color': vHeaderColorSchema,
        'font-size': (17 + vLetterSizeHeader) + 'px',
        height: '70px',
        width: '230px',
        'vertical-align': 'middle',
        'text-align': vHeaderAlignText
      };

      return (
        <Fragment>
          {dim_count === 1 && vExportToExcel && (
            <input className="icon-xls" type="image" src="/Extensions/PLSmartPivot/Excel.png" />
          )}
          <th className="fdim-cells" style={style}>{vExcelButtonCode}{dimensionInfo.qFallbackTitle}</th>
        </Fragment>
      );
    });
  }

  render () {
    return (
      <div className="header-wrapper">
        <table className="header">
          <tr>
            {this.renderDimensionInfos()}
            {this.renderMeasureInfos()}
            {this.renderSecondDimensionTitles()}
          </tr>
        </table>
      </div>
    );
  }
}

export default HeaderWrapper;
