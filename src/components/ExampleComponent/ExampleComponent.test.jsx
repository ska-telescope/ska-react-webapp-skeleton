import React from 'react';
import { render } from '@testing-library/react';
import ExampleComponent from './ExampleComponent';

describe('Example Component', () => {
  it('renders without crashing', () => {
    render(<ExampleComponent />);
  });
});
