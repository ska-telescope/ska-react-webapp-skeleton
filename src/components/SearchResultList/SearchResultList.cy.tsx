import React from 'react';
import { mount } from 'cypress/react18';
import SearchResultList from './SearchResultList';

describe('<ReactSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    mount(<SearchResultList searchType={''} data={undefined} search={undefined} />);
  });
});
