import merge from 'lodash.merge';
import Model from './root.componentModel';
import Component from './root.jsx';
import { mountedComponent } from 'test-utilities';
import sampleState from 'test-utilities/capex-sample-state';

describe('<Root />', () => {
  const state = sampleState;
  const defaultProps = { state };

  function setup (otherProps = {}) {
    const props = merge(defaultProps, otherProps);

    return mountedComponent(Model, Component, props);
  }

  it('should render without exploding', () => {
    const model = setup();
    expect(model.component).toBeDefined();
  });
});
