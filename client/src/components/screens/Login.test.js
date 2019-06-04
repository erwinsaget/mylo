import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import client from '../../feathers';
import Login from './Login';

const spy = jest.spyOn(client, 'authenticate');

afterEach(cleanup);

it('renders', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = getByTestId('email');
  const passwordInput = getByTestId('password');
  const submitButton = getByTestId('submit');

  expect(emailInput.tagName).toBe('INPUT');
  expect(passwordInput.tagName).toBe('INPUT');
  expect(submitButton.tagName).toBe('BUTTON');

  emailInput.value = 'bob@gmail.com';
  passwordInput.value = 'password';
  fireEvent.click(submitButton);

  expect(spy).toHaveBeenCalledTimes(1);
});
