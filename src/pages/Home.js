import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageGrid from "../components/ImageGrid";
import DrawingCanvas from "../components/DrawingCanvas";
import "../styles/App.css";

/**
 * Home Component
 *
 * This component serves as the main page where users can:
 * - Select an image from the `ImageGrid`.
 * - Draw over the selected image using `DrawingCanvas`.
 * - Navigate to a separate page to view a saved drawing as a text file.
 *
 * State:
 * - `selectedImage` (string | null): Stores the URL of the selected image.
 *   Initially, it is `null`, and the `DrawingCanvas` is only displayed when an image is selected.
 *
 * Hooks:
 * - `useNavigate()`: Used to programmatically navigate to the `/view-drawing` page when the button is clicked.
 */
const Home = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Tracks the selected image
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="container">
      {/* Image selection grid */}
      <div className="image-grid-container">
        <ImageGrid onSelectImage={setSelectedImage} />
      </div>

      {/* Drawing canvas container */}
      <div className="drawing-canvas-container">
        {selectedImage ? (
          <DrawingCanvas image={selectedImage} /> // Render the canvas if an image is selected
        ) : (
          <p>Select an image to start drawing.</p> // Display message if no image is selected
        )}
      </div>

      {/* Button to navigate to the View Drawing page */}
      <button className="view-button" onClick={() => navigate("/view-drawing")}>
        View text file as drawing
      </button>
    </div>
  );
};

export default Home;
