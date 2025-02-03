import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  // Home page where users can select and draw on images
import ViewDrawing from "./pages/ViewDrawing";  // Page to view saved drawings from a text file
import "./styles/App.css";

/**
 * App Component
 *
 * This is the main component that sets up the application's routing using React Router.
 * It defines two routes:
 * - `/` (Home): Displays the `Home` component where users can select an image and draw.
 * - `/view-drawing`: Displays the `ViewDrawing` component where users can upload and view saved drawings.
 *
 * Components:
 * - `<Router>`: Provides routing functionality for the app.
 * - `<Routes>`: Contains all route definitions.
 * - `<Route>`: Defines individual routes with their corresponding components.
 *
 * Usage:
 * - Navigating to `/` will render the `Home` component.
 * - Navigating to `/view-drawing` will render the `ViewDrawing` component.
 */
function App() {
  return (
    <Router> {/* Router to enable navigation between pages */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the Home page */}
        <Route path="/view-drawing" element={<ViewDrawing />} /> {/* Route for viewing saved drawings */}
      </Routes>
    </Router>
  );
}

export default App;
