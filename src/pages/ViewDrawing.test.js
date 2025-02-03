import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ViewDrawing from "./ViewDrawing"; // Adjust the path if necessary
import { MemoryRouter } from "react-router-dom";

// Mock canvas and FileReader
global.HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  clearRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
});
global.FileReader = jest.fn(() => ({
  readAsText: jest.fn(),
  onload: jest.fn(),
}));

describe("ViewDrawing Component", () => {
  it("should render the file input and canvas", () => {
    render(
      <MemoryRouter>
        <ViewDrawing />
      </MemoryRouter>
    );

    // Check if the file input and canvas elements are rendered
    expect(screen.getByText("Upload a TXT file to view the drawing")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /upload/i })).toBeInTheDocument();
    expect(screen.getByRole("canvas")).toBeInTheDocument();
  });

  it("should parse and display drawing on canvas when a file is uploaded", async () => {
    render(
      <MemoryRouter>
        <ViewDrawing />
      </MemoryRouter>
    );

    // Mock file content
    const file = new Blob(
      [
        "100,100\n200,200\n\n300,300\n400,400",
      ],
      { type: "text/plain" }
    );
    const input = screen.getByRole("textbox", { name: /upload/i });

    // Simulate file input change event
    fireEvent.change(input, {
      target: { files: [file] },
    });

    // Wait for the strokes to be parsed and drawn on the canvas
    await waitFor(() => expect(screen.getByRole("canvas")).toBeInTheDocument());

    // Check that the mock canvas methods have been called
    expect(global.HTMLCanvasElement.prototype.getContext).toHaveBeenCalled();
    expect(global.HTMLCanvasElement.prototype.getContext().clearRect).toHaveBeenCalled();
    expect(global.HTMLCanvasElement.prototype.getContext().moveTo).toHaveBeenCalledWith(100, 100);
    expect(global.HTMLCanvasElement.prototype.getContext().lineTo).toHaveBeenCalledWith(200, 200);
    expect(global.HTMLCanvasElement.prototype.getContext().moveTo).toHaveBeenCalledWith(300, 300);
    expect(global.HTMLCanvasElement.prototype.getContext().lineTo).toHaveBeenCalledWith(400, 400);
  });

  it("should navigate back to home when the back button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/view-drawing"]}>
        <ViewDrawing />
      </MemoryRouter>
    );

    // Get and click the 'Back to Home' button
    fireEvent.click(screen.getByText("Back to Home"));

    // Check if the navigation works
    expect(window.location.pathname).toBe("/"); // This checks if we are redirected to the home page
  });
});
