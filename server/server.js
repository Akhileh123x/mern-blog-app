import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;


// Connect database
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => res.send("hello world!"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

export default app;