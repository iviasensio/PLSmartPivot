import React from 'react';
import PropTypes from 'prop-types';
import { ApplyPreMask } from './masking';
import { addSeparators } from './utilities';

class SingleDimensionMeasures extends React.PureComponent {
  render () {
    const {
      vFontFamily,
      vSymbolForNulls,
      vColorMetric1,
      vColorMetric1Text,
      vColorMetric2,
      vColorMetric2Text,
      vColorMetric3,
      vColorMetric3Text,
      ConceptMatrix,
      vAllSemaphores,
      ConceptsAffectedMatrix,
      vAllMetrics,
      MetricsAffectedMatrix,
      vCritic,
      vMMedium,
      vNumMeasures,
      MeasuresFormat,
      rowNumber,
      columnText,
      styleBuilder
    } = this.props;

    // modified in here
    let vColumnNum,
      vMaskNum,
      vColorSemaphore,
      vColorSemaphoreText,
      vDivide;

    const measurementCells = [];

    // TODO: map ConceptMatrix[rowNumber] into cells
    for (var nMeasures2 = 1; nMeasures2 <= vNumMeasures; nMeasures2++) {
      var vSpecialF = MeasuresFormat[nMeasures2 - 1].replace(/k|K|m|M/gi, '');
      if (columnText.substring(0, 1) == '%') {
        vColumnNum = ApplyPreMask('0,00%', ConceptMatrix[rowNumber][nMeasures2]);
        vSpecialF = '0,00%';
      } else {
        const magnitude = MeasuresFormat[nMeasures2 - 1].substr(MeasuresFormat[nMeasures2 - 1].length - 1);
        switch (magnitude.toLowerCase()) {
          case 'k':
            vDivide = 1000;
            break;

          case 'm':
            vDivide = 1000000;
            break;

          default:
            vDivide = 1;
            break;
        }
        if (!isNaN(ConceptMatrix[rowNumber][nMeasures2])) {
          vMaskNum = ConceptMatrix[rowNumber][nMeasures2];
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
      if (styleBuilder.hasComments()) {
        vColumnNum = '.';
      }
      // apply the semaphore styles where needed
      let cellStyle;
      if ((vAllSemaphores || ConceptsAffectedMatrix.indexOf(columnText) >= 0) && (vAllMetrics || MetricsAffectedMatrix.indexOf(nMeasures2) >= 0) && !isNaN(ConceptMatrix[rowNumber][nMeasures2]) && !styleBuilder.hasComments()) {
        if (ConceptMatrix[rowNumber][nMeasures2] < vCritic) {
          vColorSemaphore = vColorMetric1;
          vColorSemaphoreText = vColorMetric1Text;
        } else {
          if (ConceptMatrix[rowNumber][nMeasures2] < vMMedium) {
            vColorSemaphore = vColorMetric2;
            vColorSemaphoreText = vColorMetric2Text;
          } else {
            vColorSemaphore = vColorMetric3;
            vColorSemaphoreText = vColorMetric3Text;
          }
        }

        cellStyle = {
          fontFamily: vFontFamily,
          fontSize: styleBuilder.getStyle().fontSize,
          color: vColorSemaphoreText,
          backgroundColor: vColorSemaphore,
          textAlign: 'right',
          paddingLeft: '4px'
        };
      } else {
        cellStyle = {
          fontFamily: vFontFamily,
          textAlign: 'right',
          paddingLeft: '4px',
          ...styleBuilder.getStyle() // TODO: this will explode since styletags are currently a string
        };
      }

      const measurementCell = (
        <td className="grid-cells' + sufixCells + '" style={cellStyle}>
          {vColumnNum}
        </td>
      );

      measurementCells.push(measurementCell);
    }

    return (
      <React.Fragment>
        {measurementCells}
      </React.Fragment>
    );
  }
}

SingleDimensionMeasures.propTypes = {};

export default SingleDimensionMeasures;
