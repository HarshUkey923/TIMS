import express from "express";
import { protect, authorize } from "../middleware/AuthMiddleware.js";
import { CreateIntern, GetInterns } from "../controllers/InternController.js";

const router = express.Router();

router.post("/", protect, authorize("HR"), CreateIntern);
router.get("/", protect, authorize("HR"), GetInterns);

export default router;
