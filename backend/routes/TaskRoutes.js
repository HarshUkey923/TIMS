import express from "express";
import multer from "multer";
import path from "path";
import { protect, authorize } from "../middleware/AuthMiddleware.js";
import { CreateTask, GetTasksByIntern, GetTasksByMentor, UpdateTaskStatus } from "../controllers/TaskController.js";

const router = express.Router();

// ─── Multer for task file attachments ─────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename:    (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${path.extname(file.originalname)}`);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowed = /pdf|doc|docx|zip|png|jpg|jpeg/;
        allowed.test(path.extname(file.originalname).toLowerCase().replace(".", ""))
            ? cb(null, true)
            : cb(new Error("File type not allowed."));
    },
});

// ─── Mentor routes ────────────────────────────────────────────────────────────
router.post("/mentor", protect(["Mentor"]), authorize("Mentor"), upload.single("file"), CreateTask);
router.get("/mentor",  protect(["Mentor"]), authorize("Mentor"), GetTasksByMentor);

// ─── Intern routes ────────────────────────────────────────────────────────────
router.get("/intern",          protect(["Intern"]), authorize("Intern"), GetTasksByIntern);
router.put("/:taskId/status",  protect(["Intern"]), authorize("Intern"), UpdateTaskStatus);

export default router;
