import React from 'react';
import { mount } from 'cypress/react18';
import ExampleComponent from './ExampleComponent';

describe('<ExampleComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<ExampleComponent />);
  });
});
