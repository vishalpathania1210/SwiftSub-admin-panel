import React from 'react';

const Background = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-50 overflow-hidden">
      {/* Floating circles */}
      <span className="absolute w-72 h-72 bg-indigo-300 rounded-full opacity-30 animate-pulse -top-20 -left-20 z-10"></span>
      <span className="absolute w-96 h-96 bg-indigo-200 rounded-full opacity-20 animate-pulse top-1/2 right-1/2 z-10"></span>
      <span className="absolute w-80 h-80 bg-indigo-400 rounded-full opacity-10 animate-pulse bottom-0 right-0 z-10"></span>

      {/* Render children on top of background */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Background;
