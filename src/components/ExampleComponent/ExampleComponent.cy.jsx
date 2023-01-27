import React from 'react';
import ExampleComponent from './ExampleComponent';

describe('<ExampleComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    cy.mount(<ExampleComponent />);
  });
});
