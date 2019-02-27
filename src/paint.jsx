import initializeStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import { initializeCubes } from './dataset';

export default async function paint ($element, layout, component) {
  const cubes = await initializeCubes({
    component,
    layout
  });
  const state = await initializeStore({
    $element,
    component,
    cubes,
    layout
  });
  const editmodeClass = component.inAnalysisState() ? '' : 'edit-mode';
  const jsx = (
    <Root
      qlik={component}
      state={state}
      editmodeClass={editmodeClass}
    />
  );

  ReactDOM.render(jsx, $element[0]);
}
