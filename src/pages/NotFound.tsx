/**
 * Aura Dashboard - Not Found (404) Page
 * 
 * This component is displayed when a user navigates to a non-existent route.
 * It shows a 404 error message with a link to return to the home page.
 * Also logs 404 errors to the console for debugging purposes.
 * 
 * @component
 * @requires react-router-dom - For accessing the current location
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
