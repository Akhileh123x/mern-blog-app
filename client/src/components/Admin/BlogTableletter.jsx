import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function BlogTableletter({ blog, fetchBlogs, index }) {
  const { axios } = useAppContext();

  const { title, createdAt, isPublished } = blog;
  const BlogDate = new Date(createdAt);

  // 🔴 DELETE BLOG
  const deleteBlog = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/blog/delete", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🟢 TOGGLE PUBLISH
  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle", {
        id: blog._id,
      });

      if (data.success) {
        toast.success(data.message);
        fetchBlogs(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index + 1}</th>

      <td className="px-2 py-4">{title}</td>

      <td className="px-2 py-4 max-sm:hidden">
        {BlogDate.toDateString()}
      </td>

      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            isPublished ? "text-green-600" : "text-orange-600"
          }`}
        >
          {isPublished ? "Published" : "Unpublished"}
        </p>
      </td>

      <td className="px-2 py-4 flex text-xs gap-3 items-center">
        {/* Toggle Button */}
        <button
          onClick={togglePublish}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>

        {/* Delete Icon */}
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt="delete"
          className="w-8 hover:scale-110 transition-all duration-200 cursor-pointer"
        />
      </td>
    </tr>
  );
}

export default BlogTableletter;