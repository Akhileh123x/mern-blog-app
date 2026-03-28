import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`}>
      <div className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300">

        {/* IMAGE */}
        <img
          src={blog.image}
          alt="blog"
          className="w-full h-40 object-cover"
        />

        <div className="p-4">

          {/* CATEGORY TAG */}
          <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded w-fit mb-2">
            {blog.category || "No Category"}
          </p>

          {/* TITLE */}
          <h3 className="font-semibold text-lg">
            {blog.title}
          </h3>

          {/* SUBTITLE */}
          <p className="text-sm text-gray-500 mt-2">
            {blog.subTitle}
          </p>

        </div>
      </div>
    </Link>
  );
}

export default BlogCard;