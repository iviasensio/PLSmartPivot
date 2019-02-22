import React from 'react';
import { mount } from 'test-utilities/enzyme-setup';

export function mountedComponent (Model, Component, props = {}) {
  const component = mount((
    <Component {...props} />
  )).find(Component);
  return new Model(component);
}
