import React from 'react';
import { mount } from 'cypress/react18';
import ViewSBD from './ViewSBD';

describe('<ViewSBDInfo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<ViewSBD info={''} />);
  });
});
