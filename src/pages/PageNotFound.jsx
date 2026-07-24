import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-black text-slate-800">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-bold text-white uppercase tracking-wide mt-4">Page Not Found</h2>
        <p className="text-slate-400 mt-2">Sorry, the page you are looking for doesn't exist.</p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-amber-500 text-slate-950 font-bold uppercase tracking-wide rounded-md hover:bg-amber-400 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;