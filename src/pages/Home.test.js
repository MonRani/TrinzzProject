import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock ImageGrid and DrawingCanvas to focus on Home functionality
jest.mock('../components/ImageGrid', () => ({
  __esModule: true,
  default: ({ onSelectImage }) => (
    <div>
      <button onClick={() => onSelectImage('https://picsum.photos/200')}>Select Image</button>
    </div>
  ),
}));

jest.mock('../components/DrawingCanvas', () => ({
  __esModule: true,
  default: () => <div>Canvas is rendered.</div>,
}));

describe('Home Component', () => {
  it('renders correctly and allows selecting an image', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Ensure the "Select an image to start drawing." text is shown initially
    expect(screen.getByText(/Select an image to start drawing./i)).toBeInTheDocument();

    // Click the "Select Image" button
    fireEvent.click(screen.getByText(/Select Image/i));

    // Check if the canvas is displayed after image selection
    expect(screen.getByText(/Canvas is rendered./i)).toBeInTheDocument();
  });
});
