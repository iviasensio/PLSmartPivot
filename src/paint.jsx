import initializeStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import { initializeDataCube, initializeDesignList } from './dataset';

export default async function paint ($element, layout, component) {
  const dataCube = await initializeDataCube(component, layout);
  const designList = await initializeDesignList(component, layout);
  const state = await initializeStore({
    $element,
    component,
    dataCube,
    designList,
    layout
  });
  const editmodeClass = component.inAnalysisState() ? '' : 'edit-mode';
  const jsx = (
    <Root
      editmodeClass={editmodeClass}
      qlik={component}
      state={state}
    />
  );

  ReactDOM.render(jsx, $element[0]);
}
