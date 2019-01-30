import React from 'react';
import PropTypes from 'prop-types';
import StyleBuilder from './style-builder';

class RowList extends React.PureComponent {
  generatePaddingTextElement (hasCustomFileStyle) {
    const { vPadding, vFontFamily } = this.props;
    if (vPadding && !hasCustomFileStyle) {
      const paddingStyle = {
        fontFamily: vFontFamily,
        marginLeft: '15px'
      };
      return (
        <span style={paddingStyle} />
      );
    }
    return null;
  }

  render () {
    const {
      vLetterSize,
      vCustomFileBool,
      vFontFamily,
      tableData,
      MeasurementsComponent
    } = this.props;

    return (
      <tbody>
        {tableData.map((row, rowNumber) => {
          const rowHeaderText = row[0] || '';
          if (rowHeaderText === '-') {
            return null;
          }
          const styleBuilder = new StyleBuilder(this.props);
          if (vCustomFileBool) {
            styleBuilder.parseCustomFileStyle(rowHeaderText);
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
          const measurementsProps = {
            rowHeaderText,
            rowNumber,
            styleBuilder
          };
          return (
            <tr key={rowNumber}>
              <td
                className="fdim-cells"
                style={rowStyle}
              >
                {paddingTextElement}
                {rowHeaderText}
              </td>
              <MeasurementsComponent
                columnText={rowHeaderText}
                {...this.props}
                {...measurementsProps}
              />
            </tr>
          );
        })}
      </tbody>
    );
  }
}

RowList.propTypes = {
  tableData: PropTypes.array.isRequired
};

export default RowList;
