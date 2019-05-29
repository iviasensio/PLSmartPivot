import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_FONT_SIZE } from '../initialize-transformed';
import Tooltip from '../tooltip/index.jsx';

const MeasurementColumnHeader = ({ baseCSS, cellWidth, hasSecondDimension, measurement, styling }) => {
  const title = `${measurement.name}`;
  const { fontSizeAdjustment } = styling.headerOptions;
  const isMediumFontSize = fontSizeAdjustment === HEADER_FONT_SIZE.MEDIUM;

  const cellStyle = {
    ...baseCSS,
    verticalAlign: 'middle',
    minWidth: cellWidth,
    maxWidth: cellWidth
  };

  if (hasSecondDimension) {
    const isPercentageFormat = measurement.format.substring(measurement.format.length - 1) === '%';
    let baseFontSize = 14;
    if (isPercentageFormat) {
      baseFontSize = 13;
    }
    cellStyle.fontSize = `${baseFontSize + fontSizeAdjustment}px`;
    cellStyle.height = isMediumFontSize ? '45px' : '35px';

    return (
      <th
        className="grid-cells"
        style={cellStyle}
      >
        <Tooltip
          tooltipText={title}
          styling={styling}
        >
          {title}
        </Tooltip>
      </th>
    );
  }

  cellStyle.fontSize = `${15 + fontSizeAdjustment}px`;
  cellStyle.height = isMediumFontSize ? '90px' : '70px';
  return (
    <th
      className="grid-cells"
      style={cellStyle}
    >
      <Tooltip
        tooltipText={title}
        styling={styling}
      >
        {title}
      </Tooltip>
    </th>
  );
};

MeasurementColumnHeader.defaultProps = {
  hasSecondDimension: false
};

MeasurementColumnHeader.propTypes = {
  baseCSS: PropTypes.shape({}).isRequired,
  cellWidth: PropTypes.string.isRequired,
  hasSecondDimension: PropTypes.bool,
  measurement: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default MeasurementColumnHeader;
