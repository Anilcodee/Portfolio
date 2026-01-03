import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).send("Unauthorized: No token provided");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
}