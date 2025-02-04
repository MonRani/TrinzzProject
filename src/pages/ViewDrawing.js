import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ViewDrawing Component
 *
 * This component allows users to upload a `.txt` file containing drawing data
 * (saved strokes from `DrawingCanvas`), and it renders the drawing on a `<canvas>`.
 */
const ViewDrawing = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const canvasRef = useRef(null); // Reference to the canvas element

  /**
   * Handles file upload, reads the `.txt` file, and extracts stroke data.
   *
   * @param {Event} event - The file input change event.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;

      // Parse the text data into an array of strokes
      const parsedStrokes = text
        .trim()
        .split("\n\n") // Split by double newlines (separate strokes)
        .map((stroke) =>
          stroke
            .split("\n") // Split each stroke into individual points
            .map((line) => {
              const [x, y] = line.split(",").map(Number); // Convert "x,y" into numbers
              return { x, y };
            })
        );

      // Draw the strokes on the canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

      parsedStrokes.forEach((stroke) => {
        ctx.beginPath();
        ctx.moveTo(stroke[0].x, stroke[0].y);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
      });
    };

    reader.readAsText(file); // Read the file as text
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Upload a TXT file to view the drawing</h2>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        data-testid="file-upload" // Added data-testid for easier querying in tests
      />
      <br />
      {/* Canvas element where the drawing will be displayed */}
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        style={{ border: "1px solid black", marginTop: "20px" }}
        data-testid="drawing-canvas" // Added data-testid for the canvas
      ></canvas>
      <br />
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default ViewDrawing;
