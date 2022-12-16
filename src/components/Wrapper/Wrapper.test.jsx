import React from 'react';
import { render } from '@testing-library/react';
import Wrapper from './Wrapper';

describe('Angular Skeleton Wrapper', () => {
  it('renders without crashing', () => {
    render(<Wrapper />);
  });
});
