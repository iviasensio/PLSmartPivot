import merge from 'lodash.merge';
import Model from './index.componentModel';
import Component from './index.jsx';
import { mountedComponent } from 'test-utilities';
import sampleState from 'test-utilities/capex-sample-state';


describe('<HeadersTable />', () => {
  const { data, general, styling } = sampleState;
  const defaultProps = {
    data,
    general,
    styling
  };

  function setup (otherProps = {}) {
    const props = merge(defaultProps, otherProps);

    return mountedComponent(Model, Component, props);
  }

  it('should render without exploding when 2 dimensions', () => {
    const model = setup();
    expect(model.component).toBeDefined();
  });

  it('should render without exploding when 1 dimension', () => {
    const noSecondDimensionProps = {
      data: {
        ...defaultProps.data.headers,
        dimension2: []
      }
    };
    const model = setup(noSecondDimensionProps);
    expect(model.component).toBeDefined();
  });
});
