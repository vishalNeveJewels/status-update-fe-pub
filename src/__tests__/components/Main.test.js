import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from '../../Main'; // Adjust the path if necessary

describe('Main Component', () => {
  test('renders Main text', () => {
    render(<Main />);
    const mainElement = screen.getByText(/main/i); // case-insensitive match
    expect(mainElement).toBeInTheDocument();
  });
});
