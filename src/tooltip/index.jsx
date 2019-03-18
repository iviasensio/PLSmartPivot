import React from 'react';
import PropTypes from 'prop-types';

const handleCalculateTooltipPosition = (event) => {
  const tooltip = document.querySelector('.tooltip-wrapper');
  if (!tooltip) {
    return;
  }
  tooltip.style.left = `${event.clientX}px`;
  tooltip.style.top = `${event.clientY}px`;
};

class Tooltip extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      showTooltip: false
    };
    this.handleRenderTooltip = this.handleRenderTooltip.bind(this);
  }

  handleRenderTooltip () {
    const { showTooltip } = this.state;
    this.setState({ showTooltip: !showTooltip });
  }

  render () {
    const { children, tooltipText } = this.props;
    const { showTooltip } = this.state;

    return (
      <div
        onMouseMove={handleCalculateTooltipPosition}
        onMouseOut={this.handleRenderTooltip}
        onMouseOver={this.handleRenderTooltip}
      >
        {children}

        {showTooltip
          ? (
            <div
              className="tooltip-wrapper"
            >
              <p>
                {tooltipText}
              </p>
            </div>
          ) : null}
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  tooltipText: PropTypes.string.isRequired
};

export default Tooltip;
