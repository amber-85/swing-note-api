import jwt from "jsonwebtoken";
import "dotenv/config";

//check if the token is valid

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"No token provided or bad format"});
    } 
    const token=authHeader.split(' ')[1];

    //verify the token with jwt library
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if (err) {
            return res.status(403).json({message:"Invalid token"});
        }
        req.userId=decoded.userId;
        next();
    });
};

export default authMiddleware;
