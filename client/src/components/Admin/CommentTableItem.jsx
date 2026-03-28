import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();

  const { blog, createdAt, _id, isApproved } = comment;
  const date = new Date(createdAt);

  // ✅ APPROVE
  const approveComment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/blog/approve-comment",
        { id: _id }
      );

      if (res.data.success) {
        toast.success("Comment approved");
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ❌ DELETE
 const deleteComment = async () => {
  if (!window.confirm("Are you sure?")) return;

  try {
    let res;

    if (isApproved) {
      //  If approved → move to not approved
      res = await axios.post(
        "http://localhost:3000/api/blog/delete-comment",
        { id: _id }
      );
    } else {
      //  If already not approved → delete permanently
      res = await axios.post(
        "http://localhost:3000/api/blog/delete-comment-permanent",
        { id: _id }
      );
    }

    if (res.data.success) {
      toast.success(res.data.message);
      fetchComments();
    }

  } catch (error) {
    toast.error(error.message);
  }
};
  return (
    <tr className="border-y border-gray-300">

      <td className="px-6 py-4">
        <b className="text-gray-600">Blog</b> : {blog?.title}
        <br /><br />

        <b className="text-gray-600">Name</b> : {comment.name}
        <br />

        <b className="text-gray-600">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-3 max-sm:hidden">
        {date.toLocaleDateString()}
      </td>

      <td className="px-6 py-3">
        <div className="flex items-center gap-4">

          {/* APPROVE */}
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              onClick={approveComment}
              className="w-5 cursor-pointer hover:scale-110"
              alt="approve"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          {/* DELETE */}
          <img
            src={assets.bin_icon}
            onClick={deleteComment}
            className="w-5 cursor-pointer hover:scale-110"
            alt="delete"
          />

        </div>
      </td>

    </tr>
  );
};

export default CommentTableItem;