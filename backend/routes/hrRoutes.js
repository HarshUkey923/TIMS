import express from "express"
import { protect } from "../middleware/AuthMiddleware.js"
import { AddIntern, AddMentor, ApproveCertificate, AssignInternToProgram, AssignMentor, CreateProgram, DeleteProgram, FindProgramById, GetInternByProgram, GetInterns, GetMentorById, GetMentors, GetPrograms} from "../controllers/hrController.js";

const router = express.Router();

router.get("/program", protect(['HR']), GetPrograms);
router.get("/findprogram/:id", protect(['HR']), FindProgramById);
router.post("/program", protect(['HR']), CreateProgram);
router.delete("/delete-program/:id", protect(['HR']), DeleteProgram);
router.get("/intern", protect(['HR']), GetInterns);
router.get("/get-interns/:id", protect(['HR']), GetInternByProgram);
router.post("/intern", protect(["HR"]), AddIntern);
router.put("/assign-program/", protect(['HR']), AssignInternToProgram);
router.post("/add-mentor", protect(['HR']), AddMentor);
router.get("/get-mentor/:id", protect(['HR']), GetMentorById);
router.get("/mentor", protect(['HR']), GetMentors);
router.put("/assign-mentor", protect(["HR"]), AssignMentor);
router.post('/approve-certificate', protect(['HR']), ApproveCertificate);

export default router;