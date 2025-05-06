import express from "express";
import userController from "../controllers/userController.js";

const userRoutes=express.Router();

// swagger documentation for /signup
/**
 * @swagger
 * /api/user/signup:
 *  post:
 *    summary: Register a new user
 *    description: Register a new user with email and password
 *    tags: [User]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *         type: object
 *         required:
 *          - username
 *          - password
 *         properties:
 *          username:
 *           type: string
 *           description: The username of the user
 *          password:
 *           type: string
 *           description: The password of the user
 *           example:
 *            password123
 *    respones:
 *     201:
 *      description: User registered successfully
 *     400:
 *      description: Bad request
 *     500:
 *      description: Server error
 */

// Route to register a new user
userRoutes.post("/signup", userController.signUp)



// swagger documentation for /login
/**
 * @swagger
 * /api/user/login:
 *  post:
 *    summary: Login a user             
 *    description: Login a user with username and password
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *          properties:
 *              username:
 *                type: string
 *                description: The username of the user
 *              password:
 *                type: string
 *                description: The password of the user
 *                example:
 *                  password123
 *    responses:
 *      200:
 *        description: User logged in successfully
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */


//Route to login a user
userRoutes.post("/login", userController.logIn)

userRoutes.get("/ping", (req, res) => {
    res.send("User routes are working");
  });

export default userRoutes;
