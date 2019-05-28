import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import Login from './Login';

  afterEach(cleanup);

  it('renders', () => {
    const { container, getByTestId } = render(
      <MemoryRouter>
        <Login />
        </MemoryRouter>
    );


  });

