/*
  DO NOT USE
  should use row-list component instead, this is just left in here until testing conversion
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyleBuilder from './style-builder';
import ElseDimensionMeasures from './single-dimension-measures';

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
        const measurementsProps = { rowNumber, columnText, styleBuilder };
        const rowElement = (
          <tr>
            <td class="fdim-cells" style={rowStyle}>
              {paddingTextElement}{columnText}
            </td>
            <ElseDimensionMeasures
              {...this.props}
              {...measurementsProps}
            />
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
