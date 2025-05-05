import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersDb from "../models/userModel.js";


//user signup

const signUp=(req, res)=>{
    console.log("SIGNUP route hit:", req.body);
    const {username, password}=req.body;

    if (!username || !password){
        console.log("missing fields")
        return res.status(400).json({message:"Username and password are required"});
    }

    console.log("checking for existing user")

    // check if user already exists
    usersDb.findOne({username}, (err,existingUser)=>{
        if (err) {
            console.log("DB error:",err)
            return res.status(500).json({message:"Server error"});}

        console.log("findOne callback hits.existingUser:",existingUser)


        if (existingUser) {
            return res.status(400).json({message:"User already exists"});
        }

        console.log("hashing password");
        bcrypt.hash(password,10,(err,hashedPassword)=>{
            if (err) {
                console.log("Bcrypt error:",err);
                return res.status(500).json({message:"Error hashing password"});
            }

            const newUser={
                username,
                password:hashedPassword
            };

            console.log("inserting new user:", newUser)

            //save user to database

            usersDb.insert(newUser, (err,savedUser)=>{
                if (err) {
                    console.log("insert error:",err);
                    return res.status(500).json({message:"Error creating user"});
                }

                console.log("user saved:",savedUser)

            //generate JWT token
            try{
                const token=jwt.sign(
                    {userId:savedUser._id}, 
                    process.env.JWT_SECRET, 
                    {expiresIn:"1h"}
                );
                console.log("token generated")
            //send response with token
            return res.status(201).json({
                message:"User created successfully", 
                userId:savedUser._id, 
                token
            });
        } catch (error){
            console.log("Token error:", error);
            return res.status(500).json({message:"Token error"})
        }
        });
    });
    });
};


const logIn=(req,res)=>{
    const {username,password}=req.body;

    if (!username ||!password) return res.status(400).json({message:"Username and password are required"});

    //check user existence
    usersDb.findOne({username}, (err, existingUser)=>{
        if (err){
                console.error("Database error;",err);
                return res.status(500).json({message:"server error"});
        }

        if (!existingUser){
            return res.status(400).json({message:"Invalid username or password"});
        }
            
        bcrypt.compare(password, existingUser.password,(err,isMatch)=>{
            if(err){
                console.error("Bcrypt error:",err);
                return res.status(500).json({message:"Error comparing passwords"});
            }
            if(!isMatch){
                return res.status(400).json({message:"Invalid username or password"});
            }
            const token=jwt.sign({userId:existingUser._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
            res.status(200).json({message:"login successful", token});
    });
});
};


export default {signUp, logIn}