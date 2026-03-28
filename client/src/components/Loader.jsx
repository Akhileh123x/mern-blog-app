import React from "react";

function Loader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">

      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700"></div>

      <p className="text-gray-600 font-medium">Loading...</p>

    </div>
  );
}

export default Loader;