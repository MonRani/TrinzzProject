import React from "react";

/**
 * SaveButton Component
 *
 * This component renders a button that triggers the `saveDrawing` function
 * when clicked. It is used to save the user's drawing.
 *
 * Props:
 * - `saveDrawing` (function): A callback function passed from the parent component.
 *   This function is executed when the button is clicked to save the drawing.
 *
 * Styling:
 * - The button is wrapped inside a `div` with the class `"save-button-container"`,
 *   which can be used for styling purposes in CSS.
 */
const SaveButton = ({ saveDrawing }) => {
  return (
    <div className="save-button-container">
      <button onClick={saveDrawing}>Save Drawing</button> {/* Calls saveDrawing when clicked */}
    </div>
  );
};

export default SaveButton;
