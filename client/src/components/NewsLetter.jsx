import React from "react";

function NewsLetter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      
      <h1 className="md:text-4xl text-2xl font-semibold">
        Never miss a blog
      </h1>

      <p className="md:text-lg text-gray-500/70 pb-8">
        Subscribe to get the latest blogs, new tech, and exclusive news.
      </p>

      <form className="flex items-center justify-between max-w-2xl w-full h-12 md:h-14">
        
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full h-full px-4 border border-gray-300 rounded-l-md outline-none"
        />

        <button
          type="submit"
          className="h-full px-8 md:px-12 text-white bg-primary/80 hover:bg-primary transition-all rounded-r-md cursor-pointer"
        >
          Subscribe
        </button>

      </form>
    </div>
  );
}

export default NewsLetter;