import React from 'react';
import PropTypes from 'prop-types';

const ColumnHeader = ({ baseCSS, cellSuffix, colSpan, styling, title }) => {
  const style = {
    ...baseCSS,
    fontSize: `${14 + styling.headerOptions.fontSizeAdjustment} px`,
    height: '45px',
    verticalAlign: 'middle'
  };

  return (
    <th
      className={`grid-cells2${cellSuffix}`}
      colSpan={colSpan}
      style={style}
    >
      {title}
    </th>
  );
};

ColumnHeader.defaultProps = {
  cellSuffix: '',
  colSpan: 1
};

ColumnHeader.propTypes = {
  baseCSS: PropTypes.shape({}).isRequired,
  cellSuffix: PropTypes.string,
  colSpan: PropTypes.number,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  title: PropTypes.string.isRequired
};

export default ColumnHeader;
