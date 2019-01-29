import React from 'react';
import PropTypes from 'prop-types';
import StyleBuilder from './style-builder';

// TODO: everything except cell rendering is pretty much identical to ElseDimensionRowList
class RowList extends React.PureComponent {
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
  render () {
    const {
      vLetterSize,
      vCustomFileBool,
      vFontFamily,
      tableData, //ConceptMatrix,
      MeasurementsComponent
    } = this.props;

    return (
      <React.Fragment>
        {tableData.map((row, rowNumber) => {
          const rowHeaderText = row[0] || '';
          if (rowHeaderText === '-') {
            return null;
          }
          const styleBuilder = new StyleBuilder(this.props);
          if (vCustomFileBool) {
            styleBuilder.parseCustomFileStyle(rowHeaderText); // TODO: parseCSVStyle?
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
          const measurementsProps = { rowNumber, rowHeaderText, styleBuilder };
          return (
            <tr key={rowNumber}>
              <td className="fdim-cells" style={rowStyle}>
                {paddingTextElement}{rowHeaderText}
              </td>
              <MeasurementsComponent
                columnText={rowHeaderText}
                {...this.props}
                {...measurementsProps}
              />
            </tr>
          );
        })}
      </React.Fragment>
    );
  }
}

RowList.propTypes = {
  tableData: PropTypes.array.isRequired
};

export default RowList;
