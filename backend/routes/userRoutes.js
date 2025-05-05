import express from "express";
import userController from "../controllers/userController.js";

const userRoutes=express.Router();

// Route to register a new user
userRoutes.post("/signup", userController.signUp)

//Route to login a user

userRoutes.post("/login", userController.logIn)

userRoutes.get("/ping", (req, res) => {
    res.send("User routes are working");
  });

export default userRoutes;
