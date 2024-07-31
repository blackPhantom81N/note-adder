import { Router } from 'express';
import controllers from '../controllers/note.controller.js';

const router = Router();

router.get("/getAllNotes", controllers.getAllNotes)
router.post("/deleteNote", controllers.deleteNoteById)
router.post("/updateNote", controllers.updateNoteById)
router.post("/createNewNote", controllers.createNewNote)

export default router;


//app.post("/deleteNote"