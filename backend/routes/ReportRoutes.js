import express from "express";
import { authorize, protect } from "../middleware/AuthMiddleware.js";
import { CertificateEligibilityReport, InternProgressReport, MentorWorkloadReport, ProgramWiseInterns, TaskStatusReport } from "../controllers/ReportController.js";

const router = express.Router();

router.get("/intern-progress", protect, authorize('HR'), InternProgressReport);
router.get("/program-interns", protect, authorize('HR'), ProgramWiseInterns);
router.get("/mentor-workload", protect, authorize('HR'), MentorWorkloadReport);
router.get("/task-status", protect, authorize('HR'), TaskStatusReport);
router.get("/certificate-eligibility", protect, authorize('HR'), CertificateEligibilityReport);


export default router;