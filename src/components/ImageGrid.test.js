import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ImageGrid from './ImageGrid';
import fetchImages from '../utils/api';

// Mock the fetchImages function
jest.mock('../utils/api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ImageGrid', () => {
  it('renders 10 images after fetching', async () => {
    // Mock the fetchImages function to return 10 images
    const mockImages = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/300/200?random=${i}`);
    fetchImages.mockResolvedValue(mockImages);

    render(<ImageGrid onSelectImage={() => {}} />);

    // Wait for the images to be rendered
    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(10); // Ensure 10 images are rendered
    });
  });

  it('calls onSelectImage when an image is clicked', async () => {
    const mockOnSelectImage = jest.fn();
    const mockImages = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/300/200?random=${i}`);
    fetchImages.mockResolvedValue(mockImages);

    render(<ImageGrid onSelectImage={mockOnSelectImage} />);

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      // Click the first image
      images[0].click();
      expect(mockOnSelectImage).toHaveBeenCalledWith(mockImages[0]); // Ensure the correct image URL is passed
    });
  });
});