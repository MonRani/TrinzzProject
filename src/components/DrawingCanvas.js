import React, { useRef, useEffect, useState } from "react";
import "../styles/DrawingCanvas.css";

/**
 * DrawingCanvas component
 *
 * This component allows the user to draw on a canvas over an image.
 * Users can start drawing by pressing the mouse down, draw by moving the mouse,
 * and stop drawing when the mouse is released or leaves the canvas.
 * The component also provides an option to save the drawing as a `.txt` file
 * containing the coordinates of the drawing strokes.
 *
 * Props:
 * - `image` (string): The URL of the image to be drawn on. This image is loaded
 *   and scaled onto the canvas.
 *
 * State:
 * - `drawing` (boolean): Tracks if the user is currently drawing on the canvas.
 * - `strokes` (array): An array of drawing strokes, where each stroke contains
 *   an array of points (x, y coordinates).
 *
 * Refs:
 * - `canvasRef`: A reference to the canvas DOM element.
 * - `ctxRef`: A reference to the 2D canvas drawing context.
 * - `imgRef`: A reference to the image element used for drawing the image.
 *
 * Constants:
 * - `scaleFactor` (number): A scaling factor used to scale the image to fit
 *   within the canvas.
 */
function DrawingCanvas({ image }) {
  const canvasRef = useRef(null); // Reference to the canvas element
  const ctxRef = useRef(null); // Reference to the 2D drawing context
  const [drawing, setDrawing] = useState(false); // State to track if the user is drawing
  const [strokes, setStrokes] = useState([]); // State to store the drawing strokes
  const imgRef = useRef(new Image()); // Reference to the image element
  const scaleFactor = 1.5; // Scaling factor for the image to fit on the canvas

  // Effect to load the image onto the canvas and setup the drawing context
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Load image if the src has changed
    if (imgRef.current.src !== image) {
        imgRef.current.src = image;
        imgRef.current.onload = () => {
          // Set canvas dimensions to match the image's natural size, scaled by the factor
          canvas.width = imgRef.current.naturalWidth * scaleFactor;
          canvas.height = imgRef.current.naturalHeight * scaleFactor;

          // Clear the canvas and redraw the image with the new size
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            imgRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );
        };
    }

    // Set up drawing context properties
    ctx.lineWidth = 5;
    ctx.strokeStyle = "red";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Save the drawing context to ctxRef for later use
    ctxRef.current = ctx;
  }, [image]); // Effect depends on the `image` prop

  /**
   * Starts a new drawing stroke when the mouse is pressed down.
   * It records the starting position and updates the drawing state.
   */
  const startDrawing = (e) => {
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(startX, startY);
    setDrawing(true); // Set the drawing state to true

    // Add a new stroke with the starting point
    setStrokes((prevStrokes) => [
      ...prevStrokes,
      { points: [{ x: startX, y: startY }] },
    ]);
  };

  /**
   * Continues drawing on the canvas as the mouse moves.
   * It records the new mouse position and draws a line from the previous point.
   */
  const draw = (e) => {
    if (!drawing) return; // Only draw if the user is currently drawing

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctxRef.current.lineTo(x, y); // Draw a line to the new position
    ctxRef.current.stroke(); // Apply the stroke

    // Update the strokes state with the new point
    setStrokes((prevStrokes) => {
      const updatedStrokes = [...prevStrokes];
      const currentStroke = updatedStrokes[updatedStrokes.length - 1];
      currentStroke.points.push({ x, y });
      return updatedStrokes;
    });
  };

  /**
   * Stops drawing when the mouse is released or leaves the canvas.
   */
  const stopDrawing = () => setDrawing(false);

  /**
   * Saves the drawing data as a .txt file containing the coordinates of all the strokes.
   * Each stroke's points are saved as "x,y" pairs, separated by newlines.
   */
  const saveDrawing = () => {
    const drawingData = strokes
      .map((stroke) =>
        stroke.points.map((point) => `${point.x},${point.y}`).join("\n")
      )
      .join("\n\n");

    const blob = new Blob([drawingData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "drawing.txt"; // Set the filename for the download
    link.click(); // Trigger the download
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef} // Reference to the canvas DOM element
        width={400} // Canvas width
        height={400} // Canvas height
        onMouseDown={startDrawing} // Start drawing on mouse down
        onMouseMove={draw} // Draw while the mouse is moving
        onMouseUp={stopDrawing} // Stop drawing on mouse up
        onMouseLeave={stopDrawing} // Stop drawing when the mouse leaves the canvas
      />
      <button onClick={saveDrawing}>Save Drawing</button> {/* Save button */}
    </div>
  );
}

export default DrawingCanvas;
