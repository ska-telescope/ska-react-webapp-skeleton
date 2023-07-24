import React from 'react';
import { mount } from 'cypress/react18';
import ViewSBDInfo from './ViewSBDInfo';

describe('<ViewSBDInfo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<ViewSBDInfo sbId={''} />);
  });
});
