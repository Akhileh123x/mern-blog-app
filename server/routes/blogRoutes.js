import express from 'express';
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlogById,
  togglePublish,
  addComment,
  getBlogComments,
  approveCommentById,
  deleteCommentById,
  getAllComments,
  deleteCommentPermanent,
  getDashboard,
  generateContent
} from '../controllers/blogController.js';

import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const blogRouter = express.Router();

// ADD BLOG
blogRouter.post("/add", upload.single('image'), addBlog);

// GET ALL BLOGS
blogRouter.get("/all", getAllBlogs);

// GET ALL COMMENTS
blogRouter.get("/all-comments", getAllComments);

//  DASHBOARD 
blogRouter.get("/dashboard", getDashboard);

// DELETE BLOG
blogRouter.post("/delete", auth, deleteBlogById);

// TOGGLE PUBLISH
blogRouter.post("/toggle-publish", auth, togglePublish);

// ADD COMMENT
blogRouter.post('/add-comments', addComment);

// GET COMMENTS
blogRouter.post('/comments', getBlogComments);

// APPROVE / DELETE COMMENT
blogRouter.post("/approve-comment", approveCommentById);
blogRouter.post("/delete-comment", deleteCommentById);

blogRouter.post("/delete-comment-permanent", deleteCommentPermanent);

//  THIS MUST BE LAST
blogRouter.get("/:blogId", getBlogById);

//GENERATE AI CONTENT

blogRouter.post("/generate", generateContent); 

export default blogRouter;