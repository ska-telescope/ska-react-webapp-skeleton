import React from 'react';
import { mount } from 'cypress/react18';
import QuerySearch from './QuerySearch';

describe('<QuerySearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<QuerySearch />);
  });
});
