import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('updates email state when input changes', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toEqual('test@example.com');
  });

  it('updates password state when input changes', () => {
    const { getByPlaceholderText } = render(<Login />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toEqual('password123');
  });

  it('submits form when Sign In button is clicked', async () => {
    const { getByText } = render(<Login />);
    const signInButton = getByText('Sign In');
    fireEvent.click(signInButton);

    await waitFor(() => expect(window.location.href).toBe('http://localhost/'));
  });
});
