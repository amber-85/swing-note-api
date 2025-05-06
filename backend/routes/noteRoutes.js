import express from "express";
import noteController from "../controllers/noteController.js";
import authMiddleware from "../middleware/auth.js";
//

const noteRoutes=express.Router();

//swagger doc for get notes
// swagger documentation for /signup
/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 notes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       text:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       modifiedAt:
 *                         type: string
 *                       userId:
 *                         type: string
 *       500:
 *         description: Server error
 */

noteRoutes.get("/", authMiddleware, noteController.getNotes);

//swagger doc for create note
// swagger documentation for /signup
/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - text
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 50
 *               text:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

noteRoutes.post("/", authMiddleware, noteController.createNote);

//swagger doc for update note
// swagger documentation for /signup
/**
 * @swagger
 * /api/notes:
 *   put:
 *     summary: Update an existing note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - text
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *                 maxLength: 50
 *               text:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */


noteRoutes.put("/", authMiddleware, noteController.updateNote);

//swagger doc for delete note
// swagger documentation for /signup
/**
 * @swagger
 * /api/notes:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the note to delete
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       400:
 *         description: Missing note ID
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

noteRoutes.delete("/", authMiddleware, noteController.deleteNote);


// noteRoutes.get("/:id", authMiddleware, noteController.getNoteById);

export default noteRoutes;

