import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_FONT_SIZE } from '../initialize-transformed';
import Tooltip from '../tooltip/index.jsx';

const MeasurementColumnHeader = ({ baseCSS, general, hasSecondDimension, measurement, styling }) => {
  const title = `${measurement.name} ${measurement.magnitudeLabelSuffix}`;
  const { fontSizeAdjustment } = styling.headerOptions;
  const isMediumFontSize = fontSizeAdjustment === HEADER_FONT_SIZE.MEDIUM;

  if (hasSecondDimension) {
    const isPercentageFormat = measurement.format.substring(measurement.format.length - 1) === '%';
    let baseFontSize = 14;
    let cellClass = 'grid-cells2';
    if (isPercentageFormat) {
      baseFontSize = 13;
      cellClass = 'grid-cells2-small';
    }
    const cellStyle = {
      ...baseCSS,
      fontSize: `${baseFontSize + fontSizeAdjustment}px`,
      height: isMediumFontSize ? '45px' : '35px',
      verticalAlign: 'middle'
    };
    return (
      <th
        className={`${cellClass}${general.cellSuffix}`}
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

  const style = {
    ...baseCSS,
    fontSize: `${15 + fontSizeAdjustment}px`,
    height: isMediumFontSize ? '90px' : '70px',
    verticalAlign: 'middle'
  };
  return (
    <th
      className={`grid-cells2${general.cellSuffix}`}
      style={style}
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
  general: PropTypes.shape({
    cellSuffix: PropTypes.string.isRequired
  }).isRequired,
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
