import React from 'react';
import PropTypes from 'prop-types';
import { LinkedScrollContext } from './linked-scroll-wrapper.jsx';

class LinkedScrollSection extends React.PureComponent {
  static contextType = LinkedScrollContext;

  componentDidMount () {
    const { link } = this.context;
    link(this);
  }

  componentWillUnmount () {
    const { unlink } = this.context;
    unlink(this);
  }

  render () {
    const { children } = this.props;

    return children;
  }
}

LinkedScrollSection.propTypes = {
  children: PropTypes.any
};

export default LinkedScrollSection;
