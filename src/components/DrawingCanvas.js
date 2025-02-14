/* import React, { useRef, useEffect, useState } from "react";
import "../styles/DrawingCanvas.css";

function DrawingCanvas({ image }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [strokes, setStrokes] = useState([]);
  const imgRef = useRef(new Image());
  const scaleFactor = 1.5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setStrokes([]);

    imgRef.current.src = image;
    imgRef.current.onload = () => {
      canvas.width = imgRef.current.naturalWidth * scaleFactor;
      canvas.height = imgRef.current.naturalHeight * scaleFactor;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "black";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctxRef.current = ctx;
    };
  }, [image]);

  const startDrawing = (e) => {
    if (!ctxRef.current) return;
    const startX = e.nativeEvent.offsetX;
    const startY = e.nativeEvent.offsetY;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(startX, startY);
    setDrawing(true);
    setStrokes((prev) => [...prev, { points: [{ x: startX, y: startY }] }]);
  };

  const mostlyStraight = (points) => {
    if (points.length < 3) return false;
    const { x: x1, y: y1 } = points[0];
    const { x: x2, y: y2 } = points[points.length - 1];
    const slope = (y2 - y1) / (x2 - x1 || 0.0001);
    return points.every(({ x, y }) => Math.abs(y - (slope * (x - x1) + y1)) < 20);
  };

  const draw = (e) => {
    if (!drawing || !ctxRef.current) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setStrokes((prevStrokes) => {
      const updatedStrokes = [...prevStrokes];
      updatedStrokes[updatedStrokes.length - 1].points.push({ x, y });
      return updatedStrokes;
    });
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();

    setStrokes((prevStrokes) => {
      const updatedStrokes = [...prevStrokes];
      const lastStroke = updatedStrokes[updatedStrokes.length - 1];
      if (lastStroke && mostlyStraight(lastStroke.points)) {
        lastStroke.points = [lastStroke.points[0], lastStroke.points[lastStroke.points.length - 1]];
      }
      redrawCanvas(updatedStrokes);
      return updatedStrokes;
    });
  };

  const redrawCanvas = (strokes) => {
    if (!ctxRef.current) return;
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctxRef.current.drawImage(imgRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    ctxRef.current.lineWidth = 1.5;
    ctxRef.current.strokeStyle = "black";
    ctxRef.current.lineJoin = "round";
    ctxRef.current.lineCap = "round";
    strokes.forEach(({ points }) => {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(points[0].x, points[0].y);
      points.forEach(({ x, y }) => ctxRef.current.lineTo(x, y));
      ctxRef.current.stroke();
    });
  };

  const saveDrawing = () => {
    const drawingData = strokes
      .map((stroke) => stroke.points.map(({ x, y }) => `${x},${y}`).join("\n"))
      .join("\n\n");
    const blob = new Blob([drawingData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "drawing.txt";
    link.click();
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        data-testid="drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button onClick={saveDrawing}>Save Drawing</button>
    </div>
  );
}

export default DrawingCanvas;
 */

// import React, { useRef, useEffect, useState } from "react";
// import "../styles/DrawingCanvas.css";
//
// /**
//  * DrawingCanvas Component
//  *
//  * A React component that allows users to draw on an image displayed on a canvas.
//  * Users can start drawing by clicking and dragging the mouse, and the drawing can be saved as a text file.
//  *
//  * @param {Object} props - Component props.
//  * @param {string} props.image - The URL of the image to be displayed on the canvas.
//  * @returns {JSX.Element} - A canvas element for drawing and a button to save the drawing.
//  */
//
//  /*
//  within stop drawing, call another function called mostlyStraight that checks if the stroke that's being drawn
//  is intended to be straight
//  if it is, then replace that stroke with a lineTo from starting to ending point of that stroke
//  and redraw the last stroke.
//  We implement this in stop drawing because if implemented in draw, it prematurely straightens the line
//  */
//
//
// function DrawingCanvas({ image }) {
//   const canvasRef = useRef(null); // Reference to the canvas element
//   const ctxRef = useRef(null); // Reference to the canvas 2D drawing context
//   const [drawing, setDrawing] = useState(false); // State to track whether the user is currently drawing
//   const [strokes, setStrokes] = useState([]); // State to store the drawing strokes (points)
//   const imgRef = useRef(new Image()); // Reference to the image element
//   const scaleFactor = 1.5; // Scaling factor to resize the image to fit the canvas
//
//   /**
//    * useEffect Hook
//    *
//    * Runs whenever the `image` prop changes. It loads the new image, clears the canvas,
//    * and sets up the drawing context with the appropriate properties.
//    */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//
//     // Clear the strokes when the image changes
//     setStrokes([]);
//
//     // Load the new image
//     imgRef.current.src = image;
//     imgRef.current.onload = () => {
//       // Set canvas dimensions to match the image's scaled size
//       canvas.width = imgRef.current.naturalWidth * scaleFactor;
//       canvas.height = imgRef.current.naturalHeight * scaleFactor;
//
//       // Clear the canvas and draw the image
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
//
//       // Set up drawing properties AFTER the image loads
//       ctx.lineWidth = 1.5;
//       ctx.strokeStyle = "black";
//       ctx.lineJoin = "round";
//       ctx.lineCap = "round";
//
//       ctxRef.current = ctx; // Save the updated context for later use
//     };
//   }, [image]); // Effect runs when the `image` prop changes
//
//   /**
//    * startDrawing Function
//    *
//    * Handles the start of a drawing stroke when the user clicks on the canvas.
//    *
//    * @param {MouseEvent} e - The mouse event triggered by clicking on the canvas.
//    */
//   const startDrawing = (e) => {
//     if (!ctxRef.current) return; // Prevent errors if the context is not available
//
//     const startX = e.nativeEvent.offsetX;
//     const startY = e.nativeEvent.offsetY;
//
//     // Begin a new drawing path and move to the starting point
//     ctxRef.current.beginPath();
//     ctxRef.current.moveTo(startX, startY);
//     setDrawing(true); // Set drawing state to true
//
//     // Add a new stroke to the strokes array
//     setStrokes((prevStrokes) => [
//       ...prevStrokes,
//       { points: [{ x: startX, y: startY }] },
//     ]);
//   };
//
//   /**
//    * draw Function
//    *
//    * Handles the drawing process as the user moves the mouse while holding down the button.
//    *
//    * @param {MouseEvent} e - The mouse event triggered by moving the mouse on the canvas.
//    */
//   const draw = (e) => {
//     if (!drawing || !ctxRef.current) return; // Ensure drawing is active and context is available
//
//     const x = e.nativeEvent.offsetX;
//     const y = e.nativeEvent.offsetY;
//
//     // Draw a line to the new point and apply the stroke
//     ctxRef.current.lineTo(x, y);
//     ctxRef.current.stroke();
//
//     // Update the strokes array with the new point
//     setStrokes((prevStrokes) => {
//       const updatedStrokes = [...prevStrokes];
//       updatedStrokes[updatedStrokes.length - 1].points.push({ x, y });
//       return updatedStrokes;
//     });
//   };
//
//   /** mostlyStraight function
//    * takes as input the points in a stroke
//    * checks if the line looks almost straight
//    * uses the straight line formula to calculate the y value for a given x value if it were a straight line
//    * if the value is within +10 or -10 of the expected value, it return true
//    * Straight line formula: slope = (y2 - y1) / (x2 - x1)
//    * y = slope * (x - x1) + y1
//    */
//
//    const mostlyStraight = (points) => {
//        if (points.length < 3) return false;
//        const {x: x1, y: y1} = points[0];
//        const {x: x2, y: y2} = points[points.length - 1];
//        const slope = (y2 - y1) / (x2 - x1 || 0.00001)
//        return points.every(({ x, y }) => Math.abs(y - (slope * (x - x1) + y1)) < 10);
//    }
//
// /**
// * redrawing canvas because if we redraw only the last stroke, the previous erronous stroke will remain
// */
//
//  const redrawCanvas = (strokes) => {
//    if (!ctxRef.current) return;
//    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//    ctxRef.current.drawImage(imgRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//    ctxRef.current.lineWidth = 1.5;
//    ctxRef.current.strokeStyle = "black";
//    ctxRef.current.lineJoin = "round";
//    ctxRef.current.lineCap = "round";
//    strokes.forEach(({ points }) => {
//      ctxRef.current.beginPath();
//      ctxRef.current.moveTo(points[0].x, points[0].y);
//      points.forEach(({ x, y }) => ctxRef.current.lineTo(x, y));
//      ctxRef.current.stroke();
//    });
//  };
//
//     /**
//      * stopDrawing Function
//      *
//      * Handles the end of a drawing stroke when the user releases the mouse button.
//      * check if the stroke drawn is mostly straight, if it is, change the last stroke points to only 2: first and last points
//      * and redraw the whole thing
//      */
//  const stopDrawing = () => {
//    setDrawing(false);
//    if (!ctxRef.current) return;
//    ctxRef.current.beginPath();
//
//    setStrokes((prevStrokes) => {
//      const updatedStrokes = [...prevStrokes];
//      const lastStroke = updatedStrokes[updatedStrokes.length - 1];
//      if (lastStroke && mostlyStraight(lastStroke.points)) {
//        lastStroke.points = [lastStroke.points[0], lastStroke.points[lastStroke.points.length - 1]];
//        redrawCanvas(updatedStrokes);
//      }
//      return updatedStrokes;
//    });
//  };
//
//  /**
//   * This functionality works well for straight lines that do not have much curvature
//   * However, if it were intended to be a slightly curved line, it will still convert it to a straight line
//   * It it's a shape for ex: a rectangle with straight lines, but the lines af the shape are bumpy, it won't correct that
//
//
//   * Test case 1:
//   * Point drawn on canvas: No change, will be drawn as done by user
//
//   * Test case 2:
//   * small line drawn on canvas: Will change to sraight line
//
//   * Test case 3:
//   * Mouse drags past the drawing canvas while button is still down: drawing stops abruptly, no change done
//   * Highlights the need for un undo button
//
//   * Test case 4:
//   * Vertically straight line: slope will be zero so it's not being considered a mostly straight line
//   * will work as expected
//
//   * update end point tests
//   * Test 1:
//   * straight line is drawn within the view of the canvas and end point is moved
//   * will work as expected
//
//   * Test 2:
//   * straight line is drawn, and we zoom in on one of the end points and try to move it
//   * will work as expected
//
//   * Test 3:
//   * what if the end point is moved out of view of the canvas
//   * it will still update the end point with coordinates as expected
//
//   * Test 4:
//   * what if the end point is moved to the same location as the start point
//
//   * Test 5:
//   * very large image that is zoomed in to draw on
//   * will work as expected
//
//   * Test 6:
//   * small image that's zoomed into
//   * end point will not be very clear for the user
//
//   * Test 7:
//   * If image is not of accepted format
//   * expectation: to throw an error not proceed with teh function
//
//   * Test 8:
//   * If it's an unsupported version of the browser:
//   * throw an error that functionalities cant be performed, update browser
//
//   * Test 9:
//   * if there is no storage space in the system:
//   * message asking user to free up space
//
//   * Test 10:
//   * if a very large files are loaded
//   * throw an error to upload smaller files
//   *
//  */
//
//  /**
//  * Function to draw strictly straighlines with 2 points already exists
//  * Function to update one of the end points
//  * onMouseClick if within region 10% factor or 7 pixels of start point or end point
//    * 10% factor of the visible portion of the line on screen
//    * then the start or end point in that region is to be moved
//    * this click triggers another function to only change the location of that point
//    * where we will identify which stoke that point belongs to
//    * on mouse up, will be the new coordinate for that point
//    * redraw stroke with changed point that was clicked on, retaining the other end point
//  */
//
//   /**
//    * saveDrawing Function
//    *
//    * Saves the drawing strokes as a text file. Each stroke is represented as a series of points.
//    */
//   const saveDrawing = () => {
//     // Convert strokes to a string format
//     const drawingData = strokes
//       .map((stroke) =>
//         stroke.points.map((point) => `${point.x},${point.y}`).join("\n")
//       )
//       .join("\n\n");
//
//     // Create a Blob with the drawing data and trigger a download
//     const blob = new Blob([drawingData], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "drawing.txt";
//     link.click();
//   };
//
//   return (
//     <div className="canvas-container">
//       {/* Canvas element for drawing */}
//       <canvas
//         ref={canvasRef}
//         width={400}
//         height={400}
//         data-testid="drawing-canvas"
//         onMouseDown={startDrawing}
//         onMouseMove={draw}
//         onMouseUp={stopDrawing}
//         onMouseLeave={stopDrawing}
//       />
//       {/* Button to save the drawing */}
//       <button onClick={saveDrawing}>Save Drawing</button>
//     </div>
//   );
// }
//
// export default DrawingCanvas;






///////// completed functionality. To do: test cases, code review

import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../styles/DrawingCanvas.css'; //

function DrawingCanvas({ image }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [strokes, setStrokes] = useState([]);
  const [currentStroke, setCurrentStroke] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 400, height: 400 });
  const imgRef = useRef(new Image());
  const scaleFactor = 1.5;

  const redrawCanvas = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || !isImageLoaded) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);

    strokes.forEach((stroke) => {
      stroke.forEach((point) => drawPoint(point.x, point.y));
      connectPoints(stroke);
    });

    currentStroke.forEach((point) => drawPoint(point.x, point.y));
    connectPoints(currentStroke);
  }, [strokes, currentStroke, isImageLoaded]);

  // Initialize canvas context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  // Handle image loading and clear strokes
  useEffect(() => {
    if (!image) return;

    setStrokes([]);
    setCurrentStroke([]);
    setIsImageLoaded(false);

    imgRef.current = new Image();
    imgRef.current.src = image;

    imgRef.current.onload = () => {
      const newWidth = imgRef.current.naturalWidth * scaleFactor;
      const newHeight = imgRef.current.naturalHeight * scaleFactor;

      setCanvasDimensions({ width: newWidth, height: newHeight });
      setIsImageLoaded(true);
    };
  }, [image]);

  // Update canvas dimensions when they change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "black";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctxRef.current = ctx;

    redrawCanvas();
  }, [canvasDimensions, redrawCanvas]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (currentStroke.length > 0) {
          setStrokes((prevStrokes) => [...prevStrokes, currentStroke]);
          setCurrentStroke([]);
        }
      } else if (e.key === 'e' || e.key === 'E') {
        setEditMode((prevMode) => !prevMode);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStroke]);

  const handleCanvasClick = (e) => {
    if (editMode || !isImageLoaded) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStroke = [...currentStroke, { x, y }];
    setCurrentStroke(newStroke);
    redrawCanvas();
  };

  const handleMouseDown = (e) => {
    if (!editMode || !isImageLoaded) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < strokes.length; i++) {
      const pointIndex = strokes[i].findIndex((point) => Math.hypot(point.x - x, point.y - y) < 7);
      if (pointIndex !== -1) {
        setEditingIndex({ strokeIndex: i, pointIndex });
        setIsDragging(true);
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || editingIndex === null) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedStrokes = [...strokes];
    updatedStrokes[editingIndex.strokeIndex][editingIndex.pointIndex] = { x, y };
    setStrokes(updatedStrokes);
    redrawCanvas();
  };

  const handleMouseUp = () => {
    setEditingIndex(null);
    setIsDragging(false);
  };

  const drawPoint = (x, y) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
  };

  const connectPoints = (points) => {
    const ctx = ctxRef.current;
    if (!ctx || points.length <= 1) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  };

  const saveCoordinates = () => {
    // Combine current stroke with completed strokes
    const allStrokes = currentStroke.length > 0
      ? [...strokes, currentStroke]
      : strokes;

    // Create a formatted string of coordinates
    const coordinatesText = allStrokes
      .map((stroke) =>
        stroke.map(point => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join("\n")
      )
      .join("\n\n"); // Ensure double newlines between strokes

    // Create blob and download link
    const blob = new Blob([coordinatesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drawing_coordinates.txt';

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        data-testid="drawing-canvas"
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        tabIndex="0"
      />
      <div className="flex flex-col gap-2 mt-4">
        <div>
          Edit Mode: {editMode ? 'ON' : 'OFF'} (Press 'E' to toggle)
        </div>
        <button
          onClick={saveCoordinates}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Save Drawing as Coordinates
        </button>
      </div>
    </div>
  );
}

export default DrawingCanvas;