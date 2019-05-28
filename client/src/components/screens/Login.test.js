import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';

describe('<Login />', function() {
  afterEach(cleanup);

  it('renders', () => {
    const wrapper = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });
})

