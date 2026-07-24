import React from 'react';

const UnderDevelopment = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950">
      <div className="max-w-md w-full text-center">
        {/* Simple Icon/Logo */}
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round"  strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
          Under Development
        </h1>

        <p className="text-slate-400 mb-8">
          This module is currently being commissioned.
        </p>

        {/* Back Button */}
        <button
          onClick={goBack}
          className="px-5 py-2.5 bg-amber-500 text-slate-950 text-sm font-bold uppercase tracking-wide rounded-md hover:bg-amber-400 transition-colors"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default UnderDevelopment;