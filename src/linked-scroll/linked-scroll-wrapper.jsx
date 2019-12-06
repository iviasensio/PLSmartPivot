import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export const LinkedScrollContext = React.createContext();

class LinkedScrollWrapper extends React.PureComponent {
  constructor (props) {
    super(props);

    this.linkComponent = this.linkComponent.bind(this);
    this.unlinkComponent = this.unlinkComponent.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollElements = [];

    this.linkActions = {
      link: this.linkComponent,
      unlink: this.unlinkComponent
    };
  }

  linkComponent (component) {
    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(component);
    const element = {
      component,
      node
    };
    this.scrollElements.push(element);
    node.onscroll = this.handleScroll.bind(this, element);
  }

  unlinkComponent (component) {
    const componentIndex = this.scrollElements.map(element => element.component).indexOf(component);
    if (componentIndex !== -1) {
      this.scrollElements.splice(componentIndex, 1);
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDOM.findDOMNode(component);
      node.onscroll = null;
    }
  }

  handleScroll (element) {
    window.requestAnimationFrame(() => {
      this.sync(element);
    });
  }

  sync (scrollElement) {
    this.scrollElements.forEach(element => {
      if (scrollElement === element) {
        return;
      }
      element.node.onscroll = null;
      if (element.component.props.linkHorizontal) {
        element.node.scrollLeft = scrollElement.node.scrollLeft;
      }

      if (element.component.props.linkVertical) {
        element.node.scrollTop = scrollElement.node.scrollTop;
      }
      window.requestAnimationFrame(() => {
        element.node.onscroll = this.handleScroll.bind(this, element);
      });
    });
  }

  render () {
    const { children } = this.props;
    return (
      <LinkedScrollContext.Provider value={this.linkActions}>
        {children}
      </LinkedScrollContext.Provider>
    );
  }
}

LinkedScrollWrapper.propTypes = {
  children: PropTypes.any
};

export default LinkedScrollWrapper;
