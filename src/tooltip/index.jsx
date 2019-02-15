import React from 'react';
import PropTypes from 'prop-types';
class Tooltip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showTooltip: false,
      xPosition: 0,
      yPosition: 0
    };
    this.handleRenderTooltip = this.handleRenderTooltip.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { showTooltip } = this.state;
    if (nextState.showTooltip === showTooltip) {
      return false;
    }
    return true;
  }

  handleRenderTooltip (event) {
    const { showTooltip } = this.state;
    const xPosition = event.clientX;
    const yPosition = event.clientY;
    this.setState({ showTooltip: !showTooltip,
      xPosition,
      yPosition });
  }

  render () {
    const { children, tooltipText, isTooltipActive } = this.props;
    const { showTooltip, xPosition, yPosition } = this.state;

    const xPositionOffset = 20;
    const yPositionOffset = 75;
    return (
      <div
        onMouseOut={this.handleRenderTooltip}
        onMouseOver={this.handleRenderTooltip}
      >
        {children}

        {showTooltip && isTooltipActive
          ? (
            <div
              className="tooltip-wrapper"
              style={{ 'left': `${xPosition - xPositionOffset}px`,
                'top': `${yPosition - yPositionOffset}px` }}
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
