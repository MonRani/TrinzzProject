import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DrawingCanvas from "./DrawingCanvas";

// Mock the canvas context
/* const mockContext = {
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
}; */

// Mock the getContext method of HTMLCanvasElement
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => mockContext);

// Mock URL.createObjectURL to prevent errors in JSDOM
global.URL.createObjectURL = jest.fn(() => "mock-url");

describe("DrawingCanvas Component", () => {
  it("should render the canvas", () => {
    render(<DrawingCanvas image="mock-image-url" />);
    expect(screen.getByTestId("drawing-canvas")).toBeInTheDocument();
  });

  /* it("should start drawing on mouse down and call canvas methods", () => {
    render(<DrawingCanvas image="mock-image-url" />);
    const canvas = screen.getByTestId("drawing-canvas");

    // Simulate mouse down on the canvas
    fireEvent.mouseDown(canvas, { nativeEvent: { offsetX: 50, offsetY: 50 } });

    // Check if beginPath is called
    expect(mockContext.beginPath).toHaveBeenCalled();

    // Check if moveTo is called with correct coordinates
    expect(mockContext.moveTo).toHaveBeenCalledWith(50, 50);
  }); */

  it("should call saveDrawing when save button is clicked", () => {
    render(<DrawingCanvas image="mock-image-url" />);
    const saveButton = screen.getByText("Save Drawing");

    fireEvent.click(saveButton);

    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});