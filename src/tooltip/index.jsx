import React from 'react';
import PropTypes from 'prop-types';

const handleCalculateTooltipPosition = (event) => {
  const tooltipClassName = 'tooltip-wrapper';
  const tooltip = document.getElementsByClassName(tooltipClassName);

  tooltip[0].style.left = event.clientX + 'px';
  tooltip[0].style.top = event.clientY + 'px';
};
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
  children: PropTypes.string.isRequired,
  tooltipText: PropTypes.string.isRequired
};
export default Tooltip;
