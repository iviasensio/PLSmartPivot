import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ children }) => {
  const xPosition = event.clientX;
  const yPosition = event.clientY;
  return (
    <div
      className="tooltip-wrapper"
      style={{ 'left': `${xPosition - 20}px`,
        'top': `${yPosition - 75}px` }}
    >
      <p>
        {children}
      </p>
    </div>
  );
};
Tooltip.propTypes = {
  children: PropTypes.string.isRequired
};
export default Tooltip;
