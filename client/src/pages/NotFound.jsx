// ============================================================
// src/pages/NotFound.jsx — 404 Page Not Found
// ============================================================
// WHY THIS FILE EXISTS:
// If a user visits a URL that doesn't exist (like /xyz or /blah),
// React Router shows this page instead of a blank screen.
// It's a simple but important user experience improvement.
// ============================================================

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">

      {/* Big 404 number */}
      <p className="text-8xl font-bold text-gray-200 mb-4">404</p>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>

      {/* Message */}
      <p className="text-gray-500 mb-8">
        The page you're looking for doesn't exist.
      </p>

      {/* Link back to home */}
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
