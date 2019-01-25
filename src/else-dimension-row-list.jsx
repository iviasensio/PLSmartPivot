import React from 'react';
import PropTypes from 'prop-types';
import { ApplyPreMask } from './masking';
import { addSeparators } from './utilities';
import StyleBuilder from './style-builder';

class ElseDimensionRowList extends React.PureComponent {
  generatePaddingTextElement (hasCustomFileStyle) {
    const { vPadding, vFontFamily } = this.props;
    if (vPadding && !hasCustomFileStyle) {
      const paddingStyle = {
        marginLeft: '15px',
        fontFamily: vFontFamily
      };
      return (
        <span style={paddingStyle}></span>
      );
    } else {
      return null;
    }
  }
  generateCells (rowNumber, columnText, styleBuilder) {
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
      MeasuresFormat
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
          <th class = "empty" style={seperatorStyle}>*</th>
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
            <td className={'grid-cells-small' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        } else {
          cellElement = (
            <td className={'grid-cells' + sufixCells} style={cellStyle}>
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
            <td className={'grid-cells-small' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        } else {
          cellElement = (
            <td className={'grid-cells' + sufixCells} style={cellStyle}>
              {columnNumber}
            </td>
          );
        }
      }
      measurementCells.push(cellElement);
    }
  }
  generateRows () {
    const {
      vLetterSize,
      vCustomFileBool,
      vFontFamily,
      ConceptMatrixFirstClean,
      ConceptMatrixPivot,
    } = this.props;

    const rows = [];
    let columnText;

    var nPivotRows = ConceptMatrixFirstClean.length;
    for (var rowNumber = 0; rowNumber < nPivotRows; rowNumber++) {
      columnText = ConceptMatrixPivot[rowNumber][0];// the descriptive account text
      if (columnText != '-') {
        const styleBuilder = new StyleBuilder(this.props);
        if (vCustomFileBool) {
          styleBuilder.parseCustomFileStyle(columnText);
        } else {
          styleBuilder.applyStandardAttributes(rowNumber);
          styleBuilder.applyCustomStyle({ fontSize: (14 + vLetterSize) + 'px' });
        }

        const rowStyle = {
          fontFamily: vFontFamily,
          width: '230px',
          ...styleBuilder.getStyle()
        };
        const paddingTextElement = this.generatePaddingTextElement(styleBuilder.hasCustomFileStyle());
        const cells = this.generateCells(rowNumber, columnText, styleBuilder);
        const rowElement = (
          <tr>
            <td class="fdim-cells" style={rowStyle}>
              {paddingTextElement}{columnText}
            </td>
            {cells}
          </tr>
        );

        rows.push(rowElement);
      }

      return rows;
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.generateRows()}
      </React.Fragment>
    );
  }
}

ElseDimensionRowList.propTypes = {};

export default ElseDimensionRowList;
