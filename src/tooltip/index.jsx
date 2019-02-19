import React from 'react';
import PropTypes from 'prop-types';
class Tooltip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showTooltip: false
    };
    this.handleRenderTooltip = this.handleRenderTooltip.bind(this);
    this.handleCalculateTooltipPosition = this.handleCalculateTooltipPosition.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { showTooltip } = this.state;
    if (nextState.showTooltip === showTooltip) {
      return false;
    }
    return true;
  }

  handleRenderTooltip () {
    const { showTooltip } = this.state;
    this.setState({ showTooltip: !showTooltip });
  }

  handleCalculateTooltipPosition (event) {
    const tooltipClassName = 'tooltip-wrapper';
    let tooltip = document.getElementsByClassName(tooltipClassName);
    const xPositionOffset = 25;
    const yPositionOffset = 65;

    tooltip[0].style.left = event.clientX - xPositionOffset + 'px';
    tooltip[0].style.top = event.clientY - yPositionOffset + 'px';
  }

  render () {
    const { children, tooltipText, isTooltipActive } = this.props;
    const { showTooltip } = this.state;

    return (
      <div
        onMouseMove={this.handleCalculateTooltipPosition}
        onMouseOut={this.handleRenderTooltip}
        onMouseOver={this.handleRenderTooltip}
      >
        {children}

        {showTooltip && isTooltipActive
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
  children: PropTypes.string.isRequired,
  isTooltipActive: PropTypes.bool.isRequired,
  tooltipText: PropTypes.string.isRequired
};
export default Tooltip;
