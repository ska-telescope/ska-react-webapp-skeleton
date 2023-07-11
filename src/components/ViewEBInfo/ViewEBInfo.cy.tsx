import React from 'react';
import { mount } from 'cypress/react18';
import ViewEBInfo from './ViewEBInfo';

describe('<ViewEBInfo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<ViewEBInfo />);
  });
});
