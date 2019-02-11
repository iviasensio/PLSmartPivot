import React from 'react';
import PropTypes from 'prop-types';
import ExportButton from '../export-button.jsx';

const ExportColumnHeader = ({ baseCSS, title, allowExcelExport, hasSecondDimension, styling }) => {
  const rowSpan = hasSecondDimension ? 2 : 1;
  const style = {
    ...baseCSS,
    cursor: 'default',
    fontSize: `${16 + styling.headerOptions.fontSizeAdjustment} px`,
    height: '80px',
    verticalAlign: 'middle',
    width: '230px'
  };

  return (
    <th
      className="fdim-cells"
      rowSpan={rowSpan}
      style={style}
    >
      <ExportButton excelExport={allowExcelExport} />
      {title}
    </th>
  );
};

ExportColumnHeader.propTypes = {
  allowExcelExport: PropTypes.bool.isRequired,
  baseCSS: PropTypes.shape({}).isRequired,
  hasSecondDimension: PropTypes.bool.isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  title: PropTypes.string.isRequired
};

export default ExportColumnHeader;
