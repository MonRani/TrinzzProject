import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ViewDrawing Component
 *
 * This component allows users to upload a `.txt` file containing drawing data
 * (saved strokes from `DrawingCanvas`), and it renders the drawing on a `<canvas>`.
 *
 * State:
 * - `strokes` (array): Stores parsed stroke data from the uploaded `.txt` file.
 *   Each stroke is an array of points (`{ x, y }`).
 *
 * Refs:
 * - `canvasRef`: A reference to the canvas DOM element where the drawing is rendered.
 *
 * Hooks:
 * - `useNavigate()`: Used to navigate back to the home page when the "Back to Home" button is clicked.
 * - `useEffect()`: Re-renders the drawing whenever `strokes` is updated.
 */
const ViewDrawing = () => {
  const [strokes, setStrokes] = useState([]); // State to store parsed strokes
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

      setStrokes(parsedStrokes); // Update state with parsed strokes
    };

    reader.readAsText(file); // Read the file as text
  };

  /**
   * Draws the parsed strokes on the canvas.
   *
   * @param {Array} strokes - The array of strokes to be drawn.
   */
  const drawPath = (strokes) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black"; // Set stroke color
    ctx.lineWidth = 2; // Set stroke width

    // Loop through each stroke and draw it
    strokes.forEach((stroke) => {
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  };

  // Effect hook to redraw strokes when the `strokes` state updates
  useEffect(() => {
    if (strokes.length > 0) {
      drawPath(strokes);
    }
  }, [strokes]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Upload a TXT file to view the drawing</h2>
      <input type="file" accept=".txt" onChange={handleFileUpload} /> {/* File upload input */}
      <br />
      {/* Canvas element where the drawing will be displayed */}
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        style={{ border: "1px solid black", marginTop: "20px" }}
      ></canvas>
      <br />
      {/* Button to navigate back to the home page */}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default ViewDrawing;
