import jwt from "jsonwebtoken";

// AUTH MIDDLEWARE
const auth = (req, res, next) => {

    // Get token from request headers
    const token = req.headers.authorization;

    try {
        // Verify token using secret key
        jwt.verify(token, process.env.JWT_SECRET);

        // If valid → proceed to next middleware/controller
        next();

    } catch (error) {
        // If invalid or missing → block request
        res.json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default auth;