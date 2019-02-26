import React from 'react';
import PropTypes from 'prop-types';

const HeaderPadding = ({ styleBuilder, styling }) => {
  if (styling.usePadding && !styleBuilder.hasCustomFileStyle()) {
    const paddingStyle = {
      fontFamily: styling.options.fontFamily
    };
    return (
      <span style={paddingStyle} />
    );
  }
  return null;
};

HeaderPadding.propTypes = {
  styleBuilder: PropTypes.shape({
    hasCustomFileStyle: PropTypes.func.isRequired
  }).isRequired,
  styling: PropTypes.shape({
    options: PropTypes.shape({
      fontFamily: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default HeaderPadding;
