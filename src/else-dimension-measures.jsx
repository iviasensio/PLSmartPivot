import React from 'react';
import PropTypes from 'prop-types';
import { ApplyPreMask } from './masking';
import { addSeparators } from './utilities';

class ElseDimensionMeasures extends React.PureComponent {
  render () {
    const {
      vFontFamily,
      vSeparatorCols,
      measure_count,
      sufixCells,
      vSymbolForNulls,
      vLetterSize,
      vColorMetric1,
      vColorMetric1Text,
      vColorMetric2,
      vColorMetric2Text,
      vColorMetric3,
      vColorMetric3Text,
      vAllSemaphores,
      ConceptMatrixPivot,
      ConceptsAffectedMatrix,
      vAllMetrics,
      MetricsAffectedMatrix,
      vCritic,
      vMMedium,
      vNumMeasures,
      vNumMeasures2,
      MeasuresFormat,
      rowNumber,
      columnText,
      styleBuilder
    } = this.props;

    // modified in here
    let columnNumber,
      vMaskNum,
      vColorSemaphore,
      vColorSemaphoreText,
      vDivide
    ;

    const measurementCells = [];

    var nMeasure7 = 0;
    var nMeasure72 = -1;
    var nMeasure72Semaphore = 0;

    for (var nMeasures22 = 1; nMeasures22 <= vNumMeasures2; nMeasures22++) {
      nMeasure7++;
      nMeasure72++;
      if (columnText.substring(0, 1) == '%') {
        columnNumber = ApplyPreMask('0,00%', ConceptMatrixPivot[rowNumber][nMeasures22]);
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
        if (!isNaN(ConceptMatrixPivot[rowNumber][nMeasures22])) {
          vMaskNum = ConceptMatrixPivot[rowNumber][nMeasures22];
          if (vSpecialF.substring(vSpecialF.length - 1) == '%') {
            vMaskNum = vMaskNum * 100;
          }

          switch (vSpecialF) {
            case '#.##0':
              columnNumber = addSeparators((vMaskNum / vDivide), '.', ',', 0);
              break;
            case '#,##0':
              columnNumber = addSeparators((vMaskNum / vDivide), ',', '.', 0);
              break;
            default:
              columnNumber = ApplyPreMask(vSpecialF, (vMaskNum / vDivide));
              break;
          }
        } else {
          columnNumber = vSymbolForNulls;
        }
      }

      if (vSeparatorCols && nMeasure7 == (measure_count + 1)) {
        const seperatorStyle = {
          color: 'white',
          fontFamily: vFontFamily,
          fontSize: (12 + vLetterSize) + 'px'
        };
        const seperatorElement = (
          <th key={nMeasures22} className="empty" style={seperatorStyle}>*</th>
        );
        measurementCells.push(seperatorElement);
        nMeasure7 = 1;
      }
      if (nMeasure72 == (measure_count - 1)) {
        nMeasure72 = -1;
        nMeasure72Semaphore = measure_count;
      } else {
        nMeasure72Semaphore = nMeasure72 + 1;
      }

      // apply the semaphores where needed
      if (styleBuilder.hasComments()) {
        columnNumber = '.';
      }

      let cellElement;
      if ((vAllSemaphores || ConceptsAffectedMatrix.indexOf(columnText) >= 0) && (vAllMetrics || MetricsAffectedMatrix.indexOf(nMeasure72Semaphore) >= 0) && !isNaN(ConceptMatrixPivot[rowNumber][nMeasures22]) && !styleBuilder.hasComments()) {
        if (ConceptMatrixPivot[rowNumber][nMeasures22] < vCritic) {
          vColorSemaphore = vColorMetric1;
          vColorSemaphoreText = vColorMetric1Text;
        } else {
          if (ConceptMatrixPivot[rowNumber][nMeasures22] < vMMedium) {
            vColorSemaphore = vColorMetric2;
            vColorSemaphoreText = vColorMetric2Text;
          } else {
            vColorSemaphore = vColorMetric3;
            vColorSemaphoreText = vColorMetric3Text;
          }
        }

        const cellStyle = {
          fontFamily: vFontFamily,
          fontSize: styleBuilder.getStyle().fontSize,
          color: vColorSemaphoreText,
          backgroundColor: vColorSemaphore,
          textAlign: 'right',
          paddingLeft: '4px'
        };
        if (vSpecialF.substring(vSpecialF.length - 1) == '%' && vNumMeasures > 1) {
          cellElement = (
            <td key={nMeasures22} className={'grid-cells-small' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        } else {
          cellElement = (
            <td key={nMeasures22} className={'grid-cells' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        }
      } else {
        const cellStyle = {
          fontFamily: vFontFamily,
          ...styleBuilder.getStyle(),
          textAlign: 'right',
          paddingRight: '4px'
        };
        if (vSpecialF.substring(vSpecialF.length - 1) == '%' && vNumMeasures > 1) {
          cellElement = (
            <td key={nMeasures22} className={'grid-cells-small' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        } else {
          cellElement = (
            <td key={nMeasures22} className={'grid-cells' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        }
      }
      measurementCells.push(cellElement);
    }

    return (
      <React.Fragment>
        {measurementCells}
      </React.Fragment>
    );
  }
}

ElseDimensionMeasures.propTypes = {
  vFontFamily: PropTypes.any,
  vSeparatorCols: PropTypes.any,
  measure_count: PropTypes.any,
  sufixCells: PropTypes.any,
  vSymbolForNulls: PropTypes.any,
  vLetterSize: PropTypes.any,
  vColorMetric1: PropTypes.any,
  vColorMetric1Text: PropTypes.any,
  vColorMetric2: PropTypes.any,
  vColorMetric2Text: PropTypes.any,
  vColorMetric3: PropTypes.any,
  vColorMetric3Text: PropTypes.any,
  vAllSemaphores: PropTypes.any,
  ConceptMatrixPivot: PropTypes.any,
  ConceptsAffectedMatrix: PropTypes.any,
  vAllMetrics: PropTypes.any,
  MetricsAffectedMatrix: PropTypes.any,
  vCritic: PropTypes.any,
  vMMedium: PropTypes.any,
  vNumMeasures: PropTypes.any,
  vNumMeasures2: PropTypes.any,
  MeasuresFormat: PropTypes.any,
  rowNumber: PropTypes.any,
  columnText: PropTypes.any,
  styleBuilder: PropTypes.any
};

export default ElseDimensionMeasures;
