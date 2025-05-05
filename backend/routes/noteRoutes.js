import express from "express";
import noteController from "../controllers/noteController.js";
import authMiddleware from "../middleware/auth.js";
//

const noteRoutes=express.Router();

noteRoutes.get("/", authMiddleware, noteController.getNotes);
noteRoutes.post("/", authMiddleware, noteController.createNote);
noteRoutes.put("/", authMiddleware, noteController.updateNote);
noteRoutes.delete("/", authMiddleware, noteController.deleteNote);
noteRoutes.get("/:id", authMiddleware, noteController.getNoteById);

export default noteRoutes;

