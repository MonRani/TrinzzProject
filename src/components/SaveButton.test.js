import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SaveButton from './SaveButton';

describe('SaveButton', () => {
  it('calls saveDrawing when the button is clicked', () => {
    const mockSaveDrawing = jest.fn();
    render(<SaveButton saveDrawing={mockSaveDrawing} />);

    const button = screen.getByText('Save Drawing');
    fireEvent.click(button);

    expect(mockSaveDrawing).toHaveBeenCalled();
  });
});