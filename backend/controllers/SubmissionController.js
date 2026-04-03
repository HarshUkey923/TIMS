import Submission from "../models/Submission.js";
import Task from "../models/Task.js";

// ─── Intern: Submit a task ────────────────────────────────────────────────────
export const SubmitTask = async (req, res) => {
  try {
    const { taskId, note } = req.body;
    const internId = req.user._id;

    // Verify the task exists and belongs to this intern
    const task = await Task.findOne({ _id: taskId, internId });
    if (!task) {
      return res.status(404).json({ message: "Task not found or not assigned to you." });
    }

    // Prevent duplicate submissions
    const existing = await Submission.findOne({ taskId, internId });
    if (existing) {
      return res.status(400).json({ message: "You have already submitted this task." });
    }

    const fileUrl = req.file ? req.file.path : null;

    const submission = await Submission.create({
      taskId,
      internId,
      note,
      fileUrl,
    });

    // Sync task status to "Submitted"
    await Task.findByIdAndUpdate(taskId, { status: "Submitted" });

    res.status(201).json({ message: "Task submitted successfully.", submission });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// ─── Intern: Get all my submissions ──────────────────────────────────────────
export const GetMySubmissions = async (req, res) => {
  try {
    const internId = req.user._id;

    const submissions = await Submission.find({ internId })
      .populate("taskId", "title description status")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// ─── Mentor: Get all submissions for tasks they assigned ─────────────────────
export const GetSubmissionsForMentor = async (req, res) => {
  try {
    const mentorId = req.user._id;

    // Find all tasks this mentor created
    const mentorTasks = await Task.find({ mentorId }).select("_id");
    const taskIds = mentorTasks.map((t) => t._id);

    const submissions = await Submission.find({ taskId: { $in: taskIds } })
      .populate("taskId", "title description")
      .populate("internId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// ─── Mentor: Review a submission (add feedback + rating) ─────────────────────
export const ReviewSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { feedback, rating } = req.body;
    const mentorId = req.user._id;

    const submission = await Submission.findById(submissionId).populate("taskId");
    if (!submission) {
      return res.status(404).json({ message: "Submission not found." });
    }

    // Ensure this submission belongs to one of the mentor's tasks
    if (submission.taskId.mentorId.toString() !== mentorId.toString()) {
      return res.status(403).json({ message: "Not authorized to review this submission." });
    }

    submission.feedback = feedback;
    submission.rating = rating;
    submission.status = "Reviewed";
    await submission.save();

    // Sync task status to "Reviewed"
    await Task.findByIdAndUpdate(submission.taskId._id, { status: "Reviewed" });

    res.status(200).json({ message: "Submission reviewed successfully.", submission });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

// ─── HR/Admin: Get all submissions (optional overview) ───────────────────────
export const GetAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("taskId", "title description")
      .populate("internId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
