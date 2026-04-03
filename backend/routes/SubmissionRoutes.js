import express from "express";
import multer from "multer";
import path from "path";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import {
  SubmitTask,
  GetMySubmissions,
  GetSubmissionsForMentor,
  ReviewSubmission,
  GetAllSubmissions,
} from "../controllers/SubmissionController.js";

const router = express.Router();

// ─── Multer config (reuses your existing uploads folder) ─────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|doc|docx|zip|png|jpg|jpeg/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    allowed.test(ext) ? cb(null, true) : cb(new Error("File type not allowed."));
  },
});

// ─── Intern routes ────────────────────────────────────────────────────────────
router.post("/", protect, authorize("Intern"), upload.single("file"), SubmitTask);
router.get("/my", protect, authorize("Intern"), GetMySubmissions);

// ─── Mentor routes ────────────────────────────────────────────────────────────
router.get("/mentor", protect, authorize("Mentor"), GetSubmissionsForMentor);
router.put("/:submissionId/review", protect, authorize("Mentor"), ReviewSubmission);

// ─── HR / Admin route ─────────────────────────────────────────────────────────
router.get("/all", protect, authorize("HR", "Admin"), GetAllSubmissions);

export default router;
