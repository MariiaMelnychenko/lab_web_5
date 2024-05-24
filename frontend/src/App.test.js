import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders choice of action heading', () => {
    const { getByText } = render(<App />);
    expect(getByText('Choice of action')).toBeInTheDocument();
  });

  it('redirects to register page when "Sign up" link is clicked', () => {
    const { getByText } = render(<App />);
    const signUpLink = getByText('Sign up');
    fireEvent.click(signUpLink);
    expect(window.location.href).toBe('http://localhost/');
  });

  it('redirects to login page when "Sign in" link is clicked', () => {
    const { getByText } = render(<App />);
    const signInLink = getByText('Sign in');
    fireEvent.click(signInLink);
    expect(window.location.href).toBe('http://localhost/');
  });
});
