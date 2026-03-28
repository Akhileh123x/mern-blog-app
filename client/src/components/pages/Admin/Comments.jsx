import React, { useEffect, useState } from "react";
import CommentTableItem from "../../Admin/CommentTableItem";
import { useAppContext } from "../../../context/AppContext";

function Comments() {
  const { axios } = useAppContext();

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blog/all-comments");

      if (res.data.success) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((c) =>
    filter === "Approved" ? c.isApproved : !c.isApproved
  );

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">

      {/* HEADER */}
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-xl font-semibold">Comments</h1>

        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`border rounded-full px-4 py-1 text-xs ${
              filter === "Approved"
                ? "text-primary border-primary"
                : "text-gray-700"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter("Not Approved")}
            className={`border rounded-full px-4 py-1 text-xs ${
              filter === "Not Approved"
                ? "text-primary border-primary"
                : "text-gray-700"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm text-gray-500 mt-6">
        <thead className="text-xs text-gray-700 text-left uppercase">
          <tr>
            <th className="px-6 py-3">Blog Title & Comment</th>
            <th className="px-6 py-3 max-sm:hidden">Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredComments.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-400">
                No comments found
              </td>
            </tr>
          ) : (
            filteredComments.map((comment) => (
              <CommentTableItem
                key={comment._id}
                comment={comment}
                fetchComments={fetchComments}
              />
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

export default Comments;