import initializeStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';

export default async function paint ($element, layout, component) {
  const state = await initializeStore({
    $element,
    component,
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
