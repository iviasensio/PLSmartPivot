import React from 'react';
import PropTypes from 'prop-types';
class Tooltip extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showTooltip: false
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

  handleRenderTooltip () {
    const { showTooltip } = this.state;
    this.setState({ showTooltip: !showTooltip });
  }

  render () {
    const { children, tooltipText, isTooltipActive } = this.props;
    const { showTooltip } = this.state;

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
