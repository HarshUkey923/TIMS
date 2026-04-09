import express from "express"
import { protect } from "../middleware/AuthMiddleware.js";
import { AssignTask, GetAssignedPrograms, GetTasks, ReviewSubmission } from "../controllers/MentorController.js";

const router = express.Router();

router.get("/programs", protect(['Mentor']), GetAssignedPrograms);
router.post("/assign-task", protect(['Mentor']), AssignTask);
router.get("/tasks", protect(['Mentor']), GetTasks);
router.put("/review/submissionId", protect(["Mentor"]), ReviewSubmission);

export default router;