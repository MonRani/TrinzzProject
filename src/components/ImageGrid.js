import React, { useState, useEffect } from "react";
import fetchImages from "../utils/api";
import "../styles/ImageGrid.css";

/**
 * ImageGrid component
 *
 * This component fetches a list of image URLs from the `fetchImages` utility,
 * ensures there are at least 10 images, and displays them in a grid. If there are fewer
 * than 10 images, placeholder images are added to ensure the grid is always populated.
 *
 * Props:
 * - `onSelectImage` (function): A callback function passed from the parent component.
 *   This function is triggered when an image is clicked.
 *
 * State:
 * - `images` (array): Stores the list of image URLs to be displayed in the grid.
 *
 * Side Effects:
 * - The component fetches images using `fetchImages()` and updates the `images` state
 *   when the data is received. If the number of images is less than 10, the component
 *   pads the list with placeholder images.
 */
function ImageGrid({ onSelectImage }) {
  // State to store the list of image URLs
  const [images, setImages] = useState([]);

  // Effect hook to fetch images when the component is mounted
  useEffect(() => {
    // Fetch images and ensure at least 10 are available
    fetchImages().then((data) => {
      // Ensure there are at least 10 images, pad with placeholder URLs if needed
      const paddedImages = [...data];

      // Add placeholder images until there are 10 images
      while (paddedImages.length < 10) {
        paddedImages.push("https://via.placeholder.com/300?text=No+Image"); // Placeholder image
      }

      // Update the state with the padded list of images
      setImages(paddedImages);
    });
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div className="grid-container">
      {/* Render each image in the grid */}
      {images.map((img, index) => (
        <img
          key={index} // Use index as key for simplicity, though it may not be optimal for large lists
          src={img} // Set image URL as the source
          alt={`${index + 1}`} // Alt text as the image index (e.g., "1", "2", etc.)
          onClick={() => onSelectImage(img)} // Trigger the onSelectImage callback when an image is clicked
          className="grid-image" // Apply CSS class for styling
        />
      ))}
    </div>
  );
}

export default ImageGrid;

