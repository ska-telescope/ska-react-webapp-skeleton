import React from 'react';
import { mount } from 'cypress/react18';
import ReactSkeleton from './ReactSkeleton';

describe('<ReactSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<ReactSkeleton />);
  });
});
