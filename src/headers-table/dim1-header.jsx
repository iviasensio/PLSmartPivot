import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_FONT_SIZE } from '../initialize-transformed';
import Tooltip from '../tooltip/index.jsx';

const Dim1Header = ({ component, baseCSS, title, hasSecondDimension, styling }) => {
  const inEditState = component.inEditState();
  const rowSpan = hasSecondDimension ? 2 : 1;
  const isMediumFontSize = styling.headerOptions.fontSizeAdjustment === HEADER_FONT_SIZE.MEDIUM;
  const style = {
    ...baseCSS,
    cursor: 'default',
    fontSize: `${16 + styling.headerOptions.fontSizeAdjustment}px`,
    height: isMediumFontSize ? '90px' : '70px',
    verticalAlign: 'middle',
    width: '230px'
  };

  return (
    <th
      className="fdim-cells"
      rowSpan={rowSpan}
      style={style}
    >
      <Tooltip
        isTooltipActive={!inEditState}
        styling={styling}
        tooltipText={title}
      >
        {title}
      </Tooltip>
    </th>
  );
};

Dim1Header.propTypes = {
  baseCSS: PropTypes.shape({}).isRequired,
  component: PropTypes.shape({}).isRequired,
  hasSecondDimension: PropTypes.bool.isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  title: PropTypes.string.isRequired
};

export default Dim1Header;
