import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ data, xPosition, yPosition }) => (
  <div
    className="tooltip-wrapper"
    style={{ 'left': `${xPosition - 20}px`,
      'top': `${yPosition - 75}px` }}
  >
    <p>
      {data}
    </p>
  </div>
);
Tooltip.propTypes = {
  data: PropTypes.string.isRequired,
  xPosition: PropTypes.number,
  yPosition: PropTypes.number
};
export default Tooltip;
