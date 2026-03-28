import express from "express";
import { adminLogin, getAllBlogsAdmin } from "../controllers/adminController.js";
import {
  approveCommentById,
  deleteCommentById,
  getAllComments,
  getDashboard
} from "../controllers/blogController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

// login
adminRouter.post("/login", adminLogin);

// blogs & comments
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);

// actions
adminRouter.post("/delete-comment", auth, deleteCommentById);
adminRouter.post("/approve-comment", auth, approveCommentById);

// dashboard
adminRouter.get("/dashboard", auth, getDashboard);

export default adminRouter;   