import React from 'react';
import ReactDOM from 'react-dom';

const cardRenderer =
  (component, isEditing = false) =>
  ({ env, options, payload }) => {
    const targetNode = document.createElement('div');
    const { didRender, onTeardown } = env;

    didRender(() => {
      payload = { ...payload }; // deref payload
      const { cardProps } = options;
      const element = React.createElement(component, {
        ...env,
        ...cardProps,
        payload,
        isEditing,
      });
      ReactDOM.render(element, targetNode);
    });

    onTeardown(() => ReactDOM.unmountComponentAtNode(targetNode));

    return targetNode;
  };

export const classToDOMCard = (component) => {
  if (!component.displayName) {
    throw new Error(
      "Can't create card from component, no displayName defined: " + component
    );
  }

  return {
    name: component.displayName,
    component,
    type: 'dom',
    render: cardRenderer(component),
    edit: cardRenderer(component, true),
  };
};
