import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ViewDrawing from "./ViewDrawing";

// Mock a .txt file with sample stroke data
const mockFile = new File(
  ["10,20\n30,40\n\n50,60\n70,80"], // File content (two strokes)
  "drawing.txt", // File name
  { type: "text/plain" } // File type
);

test("should render file input and canvas, and handle file upload", () => {
  // Render the component
  render(
    <MemoryRouter>
      <ViewDrawing />
    </MemoryRouter>
  );

  // Check if the file input element is rendered
  const fileInput = screen.getByTestId("file-upload");
  expect(fileInput).toBeInTheDocument();

  // Check if the canvas is rendered
  const canvas = screen.getByTestId("drawing-canvas");
  expect(canvas).toBeInTheDocument();

  // Simulate file upload
  fireEvent.change(fileInput, { target: { files: [mockFile] } });

  // Check if the canvas still exists after file upload (canvas gets updated after file is read)
  expect(canvas).toBeInTheDocument();
});
