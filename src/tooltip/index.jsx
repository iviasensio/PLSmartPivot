import React from 'react';
import PropTypes from 'prop-types';
const getPos = () => {
  console.log(window.pageXOffset);
  return {
    left: window.pageXOffset,
    top: window.pageYOffset
  };

};

const Tooltip = ({ data, xPosition, yPosition }) => (
  <div
    style={{ "left": `${xPosition - 20}px`,
      "top": `${yPosition - 75}px` }} className="tooltip-wrapper"
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
