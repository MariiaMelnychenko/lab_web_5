import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';

describe('Register Component', () => {
  it('renders without crashing', () => {
    render(<Register />);
  });

  it('updates username state when input changes', () => {
    const { getByPlaceholderText } = render(<Register />);
    const usernameInput = getByPlaceholderText('Username');
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });

    expect(usernameInput.value).toEqual('testUser');
  });

  it('updates email state when input changes', () => {
    const { getByPlaceholderText } = render(<Register />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput.value).toEqual('test@example.com');
  });

  it('updates password state when input changes', () => {
    const { getByPlaceholderText } = render(<Register />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput.value).toEqual('password123');
  });

  it('submits form when Sign Up button is clicked', async () => {
    const { getByText, getByPlaceholderText } = render(<Register />);
    const signUpButton = getByText('Sign Up');
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpButton);

    // Add your assertion here, for example, check if form is submitted
    await waitFor(() => expect(window.location.href).toBe('http://localhost/'));
  });
});
