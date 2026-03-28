import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

function BlogList() {
  const [menu, setMenu] = useState("all");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (!blogs) return [];

    return blogs.filter((blog) => {
      const blogCategory = (blog.category || "").toLowerCase().trim();
      const selectedMenu = menu.toLowerCase().trim();

      // ✅ CATEGORY FILTER
      const matchesCategory =
        selectedMenu === "all" || blogCategory === selectedMenu;

      // ✅ SEARCH FILTER
      const searchText = input.toLowerCase();

      const matchesSearch =
        blog.title?.toLowerCase().includes(searchText) ||
        blogCategory.includes(searchText);

      return matchesCategory && (input === "" || matchesSearch);
    });
  };

  return (
    <div>
      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10">
        {blogCategories.map((item) => {
          const itemValue = item.toLowerCase();

          return (
            <button
              key={item}
              onClick={() => setMenu(itemValue)}
              className={`relative cursor-pointer px-4 pt-0.5 ${
                menu === itemValue ? "text-white" : "text-gray-500"
              }`}
            >
              {item}

              {menu === itemValue && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* BLOG LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}

export default BlogList;