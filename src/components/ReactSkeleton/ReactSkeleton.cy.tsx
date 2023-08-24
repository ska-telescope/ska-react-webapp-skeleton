import React from 'react';
import ReactSkeleton from './ReactSkeleton';

describe('<ReactSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    cy.mount(<ReactSkeleton />);
  });
});
