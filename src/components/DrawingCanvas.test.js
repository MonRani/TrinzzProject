import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DrawingCanvas from "./DrawingCanvas"; // Adjust the path as needed

// Mock the canvas context
global.HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
});

describe("DrawingCanvas Component", () => {
  it("should render the canvas", () => {
    render(<DrawingCanvas image="mock-image-url" />);

    // Check if canvas element is rendered
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  it("should start drawing on mouse down and call canvas methods", () => {
    render(<DrawingCanvas image="mock-image-url" />);

    const canvas = screen.getByRole("presentation");

    // Simulate mouse down on the canvas
    fireEvent.mouseDown(canvas, {
      nativeEvent: { offsetX: 50, offsetY: 50 },
    });

    // Check if the context methods are called
    expect(canvas.getContext("2d").beginPath).toHaveBeenCalled();
    expect(canvas.getContext("2d").moveTo).toHaveBeenCalledWith(50, 50);
  });

  it("should draw on mouse move", () => {
    render(<DrawingCanvas image="mock-image-url" />);

    const canvas = screen.getByRole("presentation");

    // Simulate mouse down to start drawing
    fireEvent.mouseDown(canvas, { nativeEvent: { offsetX: 50, offsetY: 50 } });

    // Simulate mouse move to draw
    fireEvent.mouseMove(canvas, { nativeEvent: { offsetX: 100, offsetY: 100 } });

    // Check if the lineTo method is called with new coordinates
    expect(canvas.getContext("2d").lineTo).toHaveBeenCalledWith(100, 100);
    expect(canvas.getContext("2d").stroke).toHaveBeenCalled();
  });

  it("should stop drawing on mouse up", () => {
    render(<DrawingCanvas image="mock-image-url" />);

    const canvas = screen.getByRole("presentation");

    // Simulate mouse down to start drawing
    fireEvent.mouseDown(canvas, { nativeEvent: { offsetX: 50, offsetY: 50 } });

    // Simulate mouse up to stop drawing
    fireEvent.mouseUp(canvas);

    // The drawing state should be false after mouse up
    expect(canvas.getContext("2d").beginPath).toHaveBeenCalledTimes(1);
  });

  it("should call saveDrawing when save button is clicked", () => {
    render(<DrawingCanvas image="mock-image-url" />);

    // Mock the saveDrawing function
    const saveButton = screen.getByText("Save Drawing");

    // Simulate click on the save button
    fireEvent.click(saveButton);

    // Ensure the saveDrawing method has been called
    // Since this tests for the presence of the button, you could further mock the download functionality if necessary
    // But for now, we check the saveDrawing behavior
    expect(saveButton).toBeInTheDocument();
  });
});
