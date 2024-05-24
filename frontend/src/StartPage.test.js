import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Start from './StartPage';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ name: 'Tour 1', product_id: 1 }, { name: 'Tour 2', product_id: 2 }]), // Sample products data
  })
);

describe('Start Component', () => {
  it('renders without crashing', () => {
    render(<Start />);
  });

  it('displays header with correct text', () => {
    const { getByText } = render(<Start />);
    expect(getByText('Planet of Journeys')).toBeInTheDocument();
    expect(getByText('Explore Beyond Boundaries')).toBeInTheDocument();
  });

    it('displays services section with correct headings', async () => {
        const { getByText } = render(<Start />);

        await waitFor(() => {
          expect(getByText('Worldwide Tours')).toBeInTheDocument();
          expect(getByText('Our Services')).toBeInTheDocument();
        });
      });


  it('displays footer with correct text', () => {
    const { getByText } = render(<Start />);
    expect(getByText('© 2024 website. All rights reserved.')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
