import React from 'react';
import PropTypes from 'prop-types';
import { ApplyPreMask } from './masking';
import { addSeparators } from './utilities';
import StyleBuilder from './style-builder';

// TODO: everything except cell rendering is pretty much identical to ElseDimensionRowList
// extract cells into subcomponents and merge to generic rowlist
class SingleDimensionRowList extends React.PureComponent {
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
  // <SingleDimensionMeasures />
  generateRows () {
    const {
      vLetterSize,
      vCustomFileBool,
      vFontFamily,
      ConceptMatrix,
      lastrow
    } = this.props;

    const rows = [];
    let columnText;

    //apply the custom style
    for (var rowNumber = 0; rowNumber <= lastrow; rowNumber++) {
      columnText = ConceptMatrix[rowNumber][0];
      if (columnText != '-') {
        const styleBuilder = new StyleBuilder(this.props);
        if (vCustomFileBool) {
          styleBuilder.parseCustomFileStyle(columnText); // TODO: parseCSVStyle?
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
    }

    return rows;
  }
  render () {
    return (
      <React.Fragment>
        {this.generateRows()}
      </React.Fragment>
    );
  }
}

SingleDimensionRowList.propTypes = {};

export default SingleDimensionRowList;
