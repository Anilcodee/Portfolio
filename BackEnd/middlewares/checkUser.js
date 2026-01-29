import jwt from 'jsonwebtoken'
export const checkUser = (req, res, next) => {
    try {
        const token = req.cookies.user_token

        if(!token){
            return res.status(401).json({message: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized: Invalid token"})
    }


}