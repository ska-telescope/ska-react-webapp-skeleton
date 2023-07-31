import React from 'react';
import { mount } from 'cypress/react18';
import SBDTableList from './SBDTableList';

describe('<ViewEBInfo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<SBDTableList searchType={''} data={undefined} search={undefined} />);
  });
});
