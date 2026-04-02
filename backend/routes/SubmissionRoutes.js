import express from "express"
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import upload from "../middleware/UploadMiddleware.js";
import { GetSubmissionForMentor, SubmitTask } from "../controllers/SubmissionController.js";

const router = express.Router();

router.post("/:taskId", protect, authorize('Intern'), upload.single("file"), SubmitTask);
router.get("/mentor", protect, authorize('Mentor'),GetSubmissionForMentor);

export default router;