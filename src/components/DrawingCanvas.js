import React, { useRef, useEffect, useState } from "react";
import "../styles/DrawingCanvas.css";

/**
 * DrawingCanvas Component
 *
 * A React component that allows users to draw on an image displayed on a canvas.
 * Users can start drawing by clicking and dragging the mouse, and the drawing can be saved as a text file.
 *
 * @param {Object} props - Component props.
 * @param {string} props.image - The URL of the image to be displayed on the canvas.
 * @returns {JSX.Element} - A canvas element for drawing and a button to save the drawing.
 */
function DrawingCanvas({ image }) {
  const canvasRef = useRef(null); // Reference to the canvas element
  const ctxRef = useRef(null); // Reference to the canvas 2D drawing context
  const [drawing, setDrawing] = useState(false); // State to track whether the user is currently drawing
  const [strokes, setStrokes] = useState([]); // State to store the drawing strokes (points)
  const imgRef = useRef(new Image()); // Reference to the image element
  const scaleFactor = 1.5; // Scaling factor to resize the image to fit the canvas

  /**
   * useEffect Hook
   *
   * Runs whenever the `image` prop changes. It loads the new image, clears the canvas,
   * and sets up the drawing context with the appropriate properties.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the strokes when the image changes
    setStrokes([]);

    // Load the new image
    imgRef.current.src = image;
    imgRef.current.onload = () => {
      // Set canvas dimensions to match the image's scaled size
      canvas.width = imgRef.current.naturalWidth * scaleFactor;
      canvas.height = imgRef.current.naturalHeight * scaleFactor;

      // Clear the canvas and draw the image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

      // Set up drawing properties AFTER the image loads
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "black";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      ctxRef.current = ctx; // Save the updated context for later use
    };
  }, [image]); // Effect runs when the `image` prop changes

  /**
   * startDrawing Function
   *
   * Handles the start of a drawing stroke when the user clicks on the canvas.
   *
   * @param {MouseEvent} e - The mouse event triggered by clicking on the canvas.
   */
  const startDrawing = (e) => {
    if (!ctxRef.current) return; // Prevent errors if the context is not available

    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;

    // Begin a new drawing path and move to the starting point
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(startX, startY);
    setDrawing(true); // Set drawing state to true

    // Add a new stroke to the strokes array
    setStrokes((prevStrokes) => [
      ...prevStrokes,
      { points: [{ x: startX, y: startY }] },
    ]);
  };

  /**
   * draw Function
   *
   * Handles the drawing process as the user moves the mouse while holding down the button.
   *
   * @param {MouseEvent} e - The mouse event triggered by moving the mouse on the canvas.
   */
  const draw = (e) => {
    if (!drawing || !ctxRef.current) return; // Ensure drawing is active and context is available

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    // Draw a line to the new point and apply the stroke
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();

    // Update the strokes array with the new point
    setStrokes((prevStrokes) => {
      const updatedStrokes = [...prevStrokes];
      updatedStrokes[updatedStrokes.length - 1].points.push({ x, y });
      return updatedStrokes;
    });
  };

  /**
   * stopDrawing Function
   *
   * Handles the end of a drawing stroke when the user releases the mouse button.
   */
  const stopDrawing = () => {
    setDrawing(false); // Set drawing state to false
    if (ctxRef.current) {
      ctxRef.current.beginPath(); // Ensure a clean stroke start for the next drawing
    }
  };

  /**
   * saveDrawing Function
   *
   * Saves the drawing strokes as a text file. Each stroke is represented as a series of points.
   */
  const saveDrawing = () => {
    // Convert strokes to a string format
    const drawingData = strokes
      .map((stroke) =>
        stroke.points.map((point) => `${point.x},${point.y}`).join("\n")
      )
      .join("\n\n");

    // Create a Blob with the drawing data and trigger a download
    const blob = new Blob([drawingData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "drawing.txt";
    link.click();
  };

  return (
    <div className="canvas-container">
      {/* Canvas element for drawing */}
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      {/* Button to save the drawing */}
      <button onClick={saveDrawing}>Save Drawing</button>
    </div>
  );
}

export default DrawingCanvas;